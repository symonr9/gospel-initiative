import React from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { PageColumn } from '../common/PageColumn';
import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import BeaconActivity from '@/models/beaconActivity';
import Beacon from '@/models/beacon';
import One from '@/models/one';
import StoryChapter from '@/models/storyChapter';
import User from '@/models/user';
import HomeOneStageChart from './HomeOnesStageChart';

export type IHomeStats = ViewProps & {
    beaconActivities: BeaconActivity[],
    activeBeacons: Beacon[],
    expiredBeacons: Beacon[],
    ones: One[],
    myStoryChapters: StoryChapter[],
    executor: User,
    users: User[],
};

function HomeStats({ beaconActivities, activeBeacons, expiredBeacons, ones,
    myStoryChapters, executor, users }: IHomeStats) {
    const detailsView = (
        <PageColumn>
            <HomeOneStageChart ones={ones}/>

        </PageColumn>
    );

    return (
        <SimpleCard iconSrc={AppIcon.Chart}
            style={[styles.card]}
            title={'Stats'}
            subtitle={'Here are stats'}
            detailsView={detailsView} />
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 20
      },
});

const mapStateToProps = (state: any) => ({
    beaconActivities: state.activities.activeBeacons,
    activeBeacons: state.beacons.beaconActivities,
    expiredBeacons: state.beacons.expiredBeacons,
    ones: state.ones.ones,
    myStoryChapters: state.stories.myStoryChapters,
    executor: state.users.executor,
    users: state.users.users
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeStats);
