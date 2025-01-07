import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import User from '@/models/user';
import { AppIcon } from '@/enums/enums';
import HomePrayerCard from './HomePrayerCard';
import { PageRow } from '../common/PageRow';
import { SimpleIcon } from '../common/SimpleIcon';
import HomeDailyTasksCard from './HomeDailyTasksCard';
import LoadingLayout from '../common/LoadingLayout';
import HomeAddOneCard from './HomeAddOneCard';
import HomePracticeTestimonyCard from './HomePracticeTestimonyCard';
import PromptBanner from '../prompts/PromptBanner';
import HomePromptCard from './HomePromptCard';
import { standardPaddedWidth } from '@/constants/Dimensions';

export type IHomeLayout = ViewProps & {
  executor: User;
};

function HomeLayout({ executor }: IHomeLayout) {
  const title = executor ? `Hello, ${executor.name}` : `Loading...`;
  const subtitle = executor ? `Welcome to the Gospel Initiative App.` : ``;

  return (
    <ScrollLayout style={styles.container}>
      <PageColumn>
        <PageRow style={{ gap: 10, padding: 8 }}>
          <SimpleIcon iconSrc={executor?.icon || AppIcon.User} large />
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
          {/* TODO: Removing for now */}
          {/* <HomeDailyTasksCard /> */}
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
    paddingHorizontal: 12,
    paddingVertical: 20
  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
