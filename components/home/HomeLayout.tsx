import React, { useState, useEffect } from 'react';
import { type ViewProps, Modal, StyleSheet, TextInput, Switch, View, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import User from '@/models/user';
import { AppIcon, AvatarIcon, RefreshSpec } from '@/enums/enums';
import HomePrayerCard from './HomePrayerCard';
import { PageRow } from '../common/PageRow';
import { SimpleIcon } from '../common/SimpleIcon';
import LoadingLayout from '../common/LoadingLayout';
import HomeAddOneCard from './HomeAddOneCard';
import HomeAddStoryCard from './HomeAddStoryCard';
import { screenHeight, standardModalHeight, standardPaddedWidth } from '@/constants/Dimensions';
import { formStyles, useModalStyles } from '@/styles/Styles';
import { AppText, TextType } from '../common/AppText';
import { updateUser } from '@/requests/userRequests';
import AppError from '@/models/error';
import { refreshData, setAppError } from '@/redux/actions';
import { MAX_SHORT_TEXT_LENGTH } from '@/constants/Constants';
import AvatarIconPicker from '../common/AvatarIconPicker';
import { SimpleButton, ButtonType } from '../common/SimpleButton';
import HomeAutoBeaconCard from './HomeAutoBeaconCard';
import HomeQuickBeaconCard from './HomeQuickBeaconCard';
import { Colors, useThemeColors } from '@/constants/Colors';
import HomePromptCard from './HomePromptCard';
import HomeActiveBeaconCard from './HomeActiveBeaconCard';
import { UserPreferencesSection } from '../common/UserPreferencesSection';

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
  const [notifyOnEveryBeacon, setNotifyOnEveryBeacon] = useState<boolean>(executor?.notifyOnEveryBeacon || false);
  const [notifyMorning, setNotifyMorning] = useState<boolean>(executor?.notifyMorning || false);
  const [notifyEvening, setNotifyEvening] = useState<boolean>(executor?.notifyEvening || false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const themeColors = useThemeColors();
  const modalStyles = useModalStyles(themeColors);

  useEffect(() => {
    setName(executor?.name || '');
    setIcon(executor?.icon || AvatarIcon.Man1);
    setNotifyOnEveryBeacon(executor?.notifyOnEveryBeacon || false);
    setNotifyMorning(executor?.notifyMorning || false);
    setNotifyEvening(executor?.notifyEvening || false);
  }, [executor]);

  const isValid = isValidForm(name, icon);
  const shouldShowNameError = name.length > MAX_NAME_LENGTH;

  const onUserIconClick = () => {
    if (executor) {
      setModalVisible(true);
    }
  }

  const onSaveUserClick = async () => {
    if (loading || !executor || !isValid) {
      return;
    }

    setLoading(true);

    try {
      const updatedUser = {
        ...executor,
        name,
        icon,
        notifyOnEveryBeacon,
        notifyMorning,
        notifyEvening
      };

      const response = await updateUser(updatedUser);
      if (response.error) {
        setAppError(new AppError('Error Updating User', response.error));
        return;
      }

      refreshData(RefreshSpec.User);
      setModalVisible(false);
    } finally {
      setLoading(false);
    }
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
            <View style={[modalStyles.modalContent]}>
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

              <UserPreferencesSection
                notifyMorning={notifyMorning}
                notifyEvening={notifyEvening}
                notifyOnEveryBeacon={notifyOnEveryBeacon}
                setNotifyMorning={setNotifyMorning}
                setNotifyEvening={setNotifyEvening}
                setNotifyOnEveryBeacon={setNotifyOnEveryBeacon} />

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
          <PageColumn>
            {
              executor && (
                <PageRow center style={{ marginBottom: 4 }}>
                  <AppText type={TextType.Smol}>Tap to edit</AppText>
                </PageRow>
              )
            }
            <SimpleIcon iconSrc={executor?.icon || AppIcon.User}
              large
              onClick={onUserIconClick} />
          </PageColumn>

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
          <HomeActiveBeaconCard />
          <HomePrayerCard />
          <HomeQuickBeaconCard />
          <HomeAddStoryCard />
          {/* These features are omitted but may be added in the future */}
          {/* <HomeAutoBeaconCard /> */}

          <View style={{ height: 300 }} />
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
