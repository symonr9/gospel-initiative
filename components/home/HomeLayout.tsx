import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import User from '@/models/user';
import { PageSubHeader } from '../common/PageSubHeader';
import { SimpleCard } from '../common/SimpleCard';
import { AppIcon } from '@/enums/enums';
import HomeChecklistItem from './HomeChecklistItem';
import HomePrayerCard from './HomePrayerCard';
import { PageRow } from '../common/PageRow';
import { Image } from 'expo-image';
import { SimpleIcon } from '../common/SimpleIcon';
import { Colors } from '@/constants/Colors';
import HomeStats from './HomeStats';

export type IHomeLayout = ViewProps & {
  executor: User;
};


function HomeLayout({ executor }: IHomeLayout) {
  const title = executor ? `Hello, ${executor.name}` : `Hello`;
  const subtitle = executor ? `Welcome to the Gospel Initiative App. Please take a look at tasks below.` : ``;

  return (
    <ScrollLayout style={styles.container}>
      <PageColumn style={{ gap: 8 }}>
        <PageRow style={{ gap: 12, padding: 8 }}>
          <SimpleIcon iconSrc={executor?.icon || AppIcon.User} large />
          <AnimatedHeader title={title} subtitle={subtitle} style={{ width: 300 }} />
        </PageRow>

        <PageColumn style={{ marginHorizontal: 12, gap: 12 }}>
          <HomePrayerCard />
          <HomeStats/>

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
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
