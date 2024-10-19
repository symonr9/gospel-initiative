import React, { useState } from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { connect, useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';

import PromptBanner from '../prompts/PromptBanner';
import ScrollLayout from '../common/ScrollLayout';
import { PageRow } from '../common/PageRow';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { PageColumn } from '../common/PageColumn';
import ActionStep from '@/models/actionStep';
import One from '@/models/one';
import { AnimatedHeader } from '../common/AnimatedHeader';
import User from '@/models/user';
import PageHeader from '../common/PageHeader';
import { PageSubHeader } from '../common/PageSubHeader';
import { AppText, TextType } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import { AppIcon } from '@/enums/enums';
import { formStyles } from '@/styles/Styles';
import SimpleIconButton from '../common/SimpleIconButton';

export type IHomeLayout = ViewProps & {
  executor: User;
  ones: One[];
};


function HomeLayout({ executor, ones }: IHomeLayout) {
  const [isActionStepChecked, setIsActionStepChecked] = useState(false);

  const firstOne = ones.length > 0 ? ones[0] : null;

  const title = executor ? `Hello, ${executor.name}` : `Hello`;
  const subtitle = executor ? `Welcome to the Gospel Initiative App. Please take a look at tasks below.` : ``;

  const onActionStepPress = () => {
    setIsActionStepChecked((val) => !val);
  };

  const detailsView = (
    <PageColumn>
      <TouchableOpacity onPress={onActionStepPress}>
        <PageRow style={styles.checklistItem}>
          <Checkbox
            value={isActionStepChecked}
            onValueChange={onActionStepPress}
            color={isActionStepChecked ? '#4630EB' : undefined}
            style={[formStyles.checkbox, { alignSelf: 'center', marginStart: 4, marginEnd: 12 }]}
          />
          <PageColumn>
            <AppText type={TextType.DefaultSemiBold}>
              Action Steps
            </AppText>
            <PageRow style={{ flexShrink: 1, width: '90%' }}>
              <AppText type={TextType.Body}>
                Have you checked your action step today?
              </AppText>
            </PageRow>
          </PageColumn>
        </PageRow>
      </TouchableOpacity>

    </PageColumn>
  );

  return (
    <ScrollLayout style={styles.container}>
      <PageColumn style={{ gap: 8 }}>
        <AnimatedHeader title={title} subtitle={subtitle} />

        <PageColumn style={{ marginHorizontal: 12 }}>
          <PageSubHeader title={'Tasks'} />

          <SimpleCard iconSrc={AppIcon.UserGroup}
            style={styles.card}
            title={'Your One'}
            detailsView={detailsView} />
        </PageColumn>
      </PageColumn>
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8
  },
  card: {
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 20
  },
  checklistItem: {
    padding: 6,
  },
});

const mapStateToProps = (state: any) => ({
  ones: state.ones.ones,
  executor: state.users.executor
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
