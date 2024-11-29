import React from 'react';
import { type ViewProps, StyleSheet, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';

import { PageColumn } from '../common/PageColumn';
import { AppIcon } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import BeaconActivity from '@/models/beaconActivity';
import Beacon from '@/models/beacon';
import One from '@/models/one';
import StoryChapter from '@/models/storyChapter';
import User from '@/models/user';
import { AppText } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { countRecentActionSteps, countRecentGospelSteps, getRecentStoryChapters, isWithinPast24Hours } from '@/utils/appUtils';
import HomeChecklistItem from './HomeChecklistItem';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { useRouter } from 'expo-router';

export type IHomeDailyTasksCard = ViewProps & {
    beaconActivities: BeaconActivity[],
    activeBeacons: Beacon[],
    expiredBeacons: Beacon[],
    ones: One[],
    myStoryChapters: StoryChapter[],
    executor: User,
    users: User[],
};

function HomeDailyTasksCard({ beaconActivities, activeBeacons, expiredBeacons, ones,
    myStoryChapters, executor, users }: IHomeDailyTasksCard) {
    const router = useRouter();
    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));
    const hasPrayedForBeaconToday = completedBeacons.length > 0;
    const hasSentBeaconToday = activeBeacons.length > 0;

    if (!executor) {
        return <></>;
    }

    const numOfRecentActionSteps = countRecentActionSteps(ones);
    const hasUpdatedActionStepToday = numOfRecentActionSteps > 0;

    const numOfRecentGospelSteps = countRecentGospelSteps(ones);
    const hasUpdatedGospelStepToday = numOfRecentGospelSteps > 0;

    const hasPracticedTestimonyToday = isWithinPast24Hours(executor.lastPartitionDate);

    const percentDone = ((hasPrayedForBeaconToday ? 1 : 0)
        + (hasSentBeaconToday ? 1 : 0)
        + (hasUpdatedActionStepToday ? 1 : 0)
        + (hasUpdatedGospelStepToday ? 1 : 0)
        + (hasPracticedTestimonyToday ? 1 : 0)
    ) / 3;

    const detailsView = (
        <PageColumn>
            <PageRow style={{ gap: 8, marginVertical: 8 }}>
                <View style={{ alignSelf: 'center' }}>
                    <Progress.Bar progress={percentDone}
                        width={200}
                        borderRadius={8} />
                </View>
                <AppText>{percentDone >= 1 ? '100' : Math.ceil(percentDone * 100)}%</AppText>
            </PageRow>

            <HomeChecklistItem title={`Practice your testimony`}
                subtitle={`You have ${hasPracticedTestimonyToday ? '' : 'not yet'} practiced your testimony today.`}
                onClick={() => router.replace('/stories?tab=1')}
                iconSrc={AppIcon.StageApathetic}
                checked={hasPracticedTestimonyToday} />

            <HomeChecklistItem title={`Pray for a Beacon`}
                subtitle={`You have prayed for ${completedBeacons.length} beacon${completedBeacons.length !== 1 ? 's' : ''} today.`}
                onClick={() => router.replace('/ones?tab=1')}
                iconSrc={AppIcon.Prayer}
                checked={hasPrayedForBeaconToday} />

            <HomeChecklistItem title={`Send a Beacon`}
                subtitle={`You have sent ${activeBeacons.length} beacon${activeBeacons.length !== 1 ? 's' : ''} today.`}
                onClick={() => router.replace('/ones?tab=0')}
                iconSrc={AppIcon.OpenHands}
                checked={hasSentBeaconToday} />

            <HomeChecklistItem title={`Update an Action Step`}
                subtitle={`You have updated ${numOfRecentActionSteps} action step${numOfRecentActionSteps !== 1 ? 's' : ''} today.`}
                onClick={() => router.replace('/ones?tab=0')}
                iconSrc={AppIcon.Coffee}
                checked={hasUpdatedActionStepToday} />

            <HomeChecklistItem title={`Update a Gospel Step`}
                subtitle={`You have updated ${numOfRecentGospelSteps} Gospel step${numOfRecentGospelSteps !== 1 ? 's' : ''} today.`}
                onClick={() => router.replace('/ones?tab=0')}
                iconSrc={AppIcon.PlantGrow}
                checked={hasUpdatedGospelStepToday} />

        </PageColumn>
    );

    return (
        <SimpleCard iconSrc={AppIcon.Chart}
            style={[styles.card]}
            title={'Daily Tasks'}
            subtitle={'Complete 3 tasks below to unlock an additional testimony practice.'}
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
    beaconActivities: state.activities.beaconActivities,
    activeBeacons: state.beacons.activeBeacons,
    expiredBeacons: state.beacons.expiredBeacons,
    ones: state.ones.ones,
    myStoryChapters: state.stories.myStoryChapters,
    executor: state.users.executor,
    users: state.users.users
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDailyTasksCard);
