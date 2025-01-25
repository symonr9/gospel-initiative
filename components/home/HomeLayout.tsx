import React, { useState, useEffect } from 'react';
import { type ViewProps, Modal, StyleSheet, TextInput, View, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import User from '@/models/user';
import { AppIcon, AvatarIcon, RefreshSpec } from '@/enums/enums';
import HomePrayerCard from './HomePrayerCard';
import { PageRow } from '../common/PageRow';
import { SimpleIcon } from '../common/SimpleIcon';
import HomeDailyTasksCard from './HomeDailyTasksCard';
import LoadingLayout from '../common/LoadingLayout';
import HomeAddOneCard from './HomeAddOneCard';
import HomePracticeTestimonyCard from './HomePracticeTestimonyCard';
import PromptBanner from '../prompts/PromptBanner';
import HomePromptCard from './HomePromptCard';
import { halfScreenHeight, screenHeight, standardModalHeight, standardPaddedWidth } from '@/constants/Dimensions';
import { formStyles, modalStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { updateUser } from '@/requests/userRequests';
import AppError from '@/models/error';
import { refreshData, setAppError } from '@/redux/actions';
import { MAX_SHORT_TEXT_LENGTH } from '@/constants/Constants';
import AvatarIconPicker from '../common/AvatarIconPicker';
import { SimpleButton, ButtonType } from '../common/SimpleButton';
import HomeAutoBeaconCard from './HomeAutoBeaconCard';

export type IHomeLayout = ViewProps & {
  executor: User;
  refreshData: Function;
  setAppError: Function;
};

const MAX_NAME_LENGTH = 16;

const isValidForm = (name: string, icon: AvatarIcon) => {
  if (!name || name.length === 0 || name.length > MAX_NAME_LENGTH) {
    return false;
  }
  return true;
}

function HomeLayout({ executor, refreshData, setAppError }: IHomeLayout) {
  const title = executor ? `Hello, ${executor.name}` : `Loading...`;
  const subtitle = executor ? `Welcome to the Gospel Initiative App.` : ``;

  const [refreshing, setRefreshing] = React.useState(false);
  const [name, setName] = useState<string>(executor?.name || '');
  const [icon, setIcon] = useState<AvatarIcon>(executor?.icon || AvatarIcon.Man1);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setName(executor?.name || '');
    setIcon(executor?.icon || AvatarIcon.Man1);
  }, [executor]);

  const isValid = isValidForm(name, icon);
  const shouldShowNameError = name.length > MAX_NAME_LENGTH;

  const onUserIconClick = () => {
    if (executor) {
      setModalVisible(true);
    }
  }

  const onSaveUserClick = async () => {
    if (!executor || !isValid) {
      return;
    }

    const updatedUser = {
      ...executor,
      name,
      icon
    };

    setLoading(true);
    const response = await updateUser(updatedUser);
    setLoading(false);
    if (response.error) {
      setAppError(new AppError('Error Updating User', response.error));
      return;
    }

    refreshData(RefreshSpec.User);
    setModalVisible(false);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshData(RefreshSpec.All);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <PageColumn style={styles.container}>
      <View>
        <Modal
          transparent={true}
          animationType='slide'
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(!isModalVisible)}>
          <View style={modalStyles.modalContainer}>
            <View style={[modalStyles.modalContent, { height: standardModalHeight * 1.3, gap: 8 }]}>
              <AppText type={TextType.Subtitle} style={modalStyles.modalTitle}>Update Your Name and Icon</AppText>

              <PageColumn style={{ height: 200 }}>
                <AvatarIconPicker selectedIcon={icon} setSelectedIcon={setIcon} />
              </PageColumn>

              <PageColumn>
                <AppText type={TextType.DefaultSemiBold}>Your Nickname (Max: {MAX_SHORT_TEXT_LENGTH})</AppText>
                <TextInput
                  style={[formStyles.textInput, { width: 250 }]}
                  placeholder={`Enter nickname here...`}
                  placeholderTextColor={'gray'}
                  value={name}
                  numberOfLines={1}
                  maxLength={MAX_SHORT_TEXT_LENGTH}
                  onChangeText={(text) => setName(text)}
                />
                {
                  shouldShowNameError && (
                    <AppText style={{ color: 'red' }}>Name should be less than {MAX_NAME_LENGTH} characters.</AppText>
                  )
                }
              </PageColumn>

              {
                loading && <LoadingLayout />
              }

              <PageRow style={{ alignSelf: 'center', gap: 32 }}>
                <SimpleButton type={ButtonType.Edit}
                  text={'Cancel'}
                  disabled={loading}
                  onPress={() => setModalVisible(false)} />

                <SimpleButton type={ButtonType.Save}
                  text={'Save'}
                  disabled={!isValid || loading}
                  onPress={onSaveUserClick} />
              </PageRow>
            </View>
          </View>
        </Modal>
      </View>

      <ScrollView style={[{ height: screenHeight }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <PageRow style={{ gap: 10, padding: 8 }}>
          <SimpleIcon iconSrc={executor?.icon || AppIcon.User} large onClick={onUserIconClick} />
          <AnimatedHeader title={title} subtitle={subtitle} style={{ width: standardPaddedWidth }} />
        </PageRow>

        <PageColumn style={{ marginHorizontal: 12, gap: 8 }}>
          {
            !executor && (
              <LoadingLayout />
            )
          }

          <HomePromptCard />

          <HomeAddOneCard />
          <HomePrayerCard />
          <HomePracticeTestimonyCard />
          <HomeAutoBeaconCard/>
          {/* TODO: Removing for now */}
          {/* <HomeDailyTasksCard /> */}

          <View style={{ height: 300}}/>
        </PageColumn>
      </ScrollView>
    </PageColumn>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8
  },
  card: {
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 20
  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor
});

const mapDispatchToProps = {
  refreshData,
  setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
