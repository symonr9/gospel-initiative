import React from 'react';
import { type ViewProps, StyleSheet, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';

import { PageColumn } from '../common/PageColumn';
import { AppIcon, RefreshSpec } from '@/enums/enums';
import { SimpleCard } from '../common/SimpleCard';
import BeaconActivity from '@/models/beaconActivity';
import Beacon from '@/models/beacon';
import One from '@/models/one';
import StoryChapter from '@/models/storyChapter';
import User from '@/models/user';
import { AppText } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { formatDateTime, getHomeDailyTasksData, getTheNextDay, isWithinPast24Hours } from '@/utils/appUtils';
import HomeChecklistItem from './HomeChecklistItem';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { useRouter } from 'expo-router';
import { MAX_DAILY_TASKS_NEEDED_TO_COMPLETE } from '@/constants/Constants';
import { ButtonType } from '../common/SimpleButton';
import PulsingButton from '../common/PulsingButton';
import AppError from '@/models/error';
import { setAppError, refreshData } from '@/redux/actions';
import { unlockAdditionalTestimonyPractice } from '@/requests/storyRequests';
import { SimpleConfetti } from '../common/SimpleConfetti';

export type IHomeDailyTasksCard = ViewProps & {
    beaconActivities: BeaconActivity[],
    activeBeacons: Beacon[],
    expiredBeacons: Beacon[],
    ones: One[],
    myStoryChapters: StoryChapter[],
    executor: User,
    users: User[],
    setAppError: Function,
    refreshData: Function
};

function HomeDailyTasksCard({ beaconActivities, activeBeacons, expiredBeacons, ones,
    myStoryChapters, executor, users, setAppError, refreshData }: IHomeDailyTasksCard) {
    const router = useRouter();
    const { completedBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

    if (!executor) {
        return <></>;
    }

    const {
        hasPrayedForBeaconToday,
        hasSentBeaconToday,
        numOfRecentActionSteps,
        hasUpdatedActionStepToday,
        numOfRecentGospelSteps,
        hasUpdatedGospelStepToday,
        numOfRecentOneNotes,
        hasUpdatedOneNoteToday,
        hasPracticedTestimonyToday,
        percentDone
    } = getHomeDailyTasksData(ones, executor, completedBeacons, activeBeacons);

    const onUnlockPress = async () => {
        try {
            const data = await unlockAdditionalTestimonyPractice();
            if (!data || data.error) {
                setAppError(new AppError(data.error.toString() || 'Something went wrong'));
                return;
            }

            refreshData(RefreshSpec.User);
            router.replace('/stories?tab=1');
        } catch (err: any) {
            setAppError(new AppError('Error partioning data: ', err));
        }
    };

    const showUnlockBtn = percentDone >= 1 && (
        !executor.lastExtraPartitionGranted ||
        !isWithinPast24Hours(executor.lastExtraPartitionGranted)
    );

    const detailsView = (
        <PageColumn>
            <PageRow style={{ gap: 8, marginTop: 8 }}>
                <View style={{ alignSelf: 'center' }}>
                    <Progress.Bar progress={percentDone}
                        width={200}
                        borderRadius={8} />
                </View>
                <AppText>{percentDone >= 1 ? '100' : Math.ceil(percentDone * 100)}%</AppText>
            </PageRow>

            {
                showUnlockBtn && (
                    <PageRow style={{ marginBottom: 12, marginHorizontal: 10 }}>
                        <PulsingButton type={ButtonType.Save}
                            onPress={onUnlockPress}
                            text={'Unlock Additional Practice'} />
                    </PageRow>
                )
            }

            <HomeChecklistItem title={`Testimony Practice`}
                subtitle={`You have${hasPracticedTestimonyToday ? '' : ' not yet'} practiced your testimony today.`}
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

            <HomeChecklistItem title={`Update a One's Notes`}
                subtitle={`You have updated your One's notes ${numOfRecentOneNotes} time${numOfRecentOneNotes !== 1 ? 's' : ''} today.`}
                onClick={() => router.replace('/ones?tab=0')}
                iconSrc={AppIcon.Book2}
                checked={hasUpdatedOneNoteToday} />

            {
                showUnlockBtn && <SimpleConfetti />
            }
        </PageColumn>
    );

    const hasUnlockedSecondPractice = percentDone >= 1 && executor.lastExtraPartitionGranted && isWithinPast24Hours(executor.lastExtraPartitionGranted);
    let cardSubtitle = hasUnlockedSecondPractice 
        ? `You have unlocked your second practice for today. You can unlock a new practice on ${formatDateTime(getTheNextDay(executor.lastExtraPartitionGranted))}.`
        : `Complete ${MAX_DAILY_TASKS_NEEDED_TO_COMPLETE} tasks below to unlock an additional testimony practice.`;
    
    return (
        <SimpleCard iconSrc={AppIcon.Chart}
            style={[styles.card]}
            title={'Daily Tasks'}
            subtitle={cardSubtitle}
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
    setAppError,
    refreshData
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDailyTasksCard);
