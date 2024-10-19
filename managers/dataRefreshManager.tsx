import { loadServerData, refreshData, setAppError } from '@/redux/actions';
import React, { useEffect, useRef } from 'react';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getLocalUserId } from '@/utils/storageUtils';
import { createUser, fetchActiveBeacons, fetchServerData } from '@/requests/Requests';
import Error from '@/models/error';

export type IDataRefreshManager = {
    state: any,

    loadServerData: (data: any) => void,
    refreshData: Function,
    setAppError: Function,
};

function hasConstantsLoaded() {
    return Constants.expoConfig?.extra?.serverUrl;
}

function DataRefreshManager({ state, loadServerData, refreshData, setAppError }: IDataRefreshManager) {

    const isFirstRender = useRef(false);

    console.log("State: ", state);

    useEffect(() => {
        if (!hasConstantsLoaded()) {
            setAppError(new Error('Invalid Server Configuration', 'Please contact your administrator.'));
            return;
        }
        console.log("Expo Config: ", Constants.expoConfig);
        loadSettings();
    }, []);

    useEffect(() => {
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }

        fetchData();
    }, [state.app.shouldRefreshData]);

    const loadSettings = async () => {
        const userId = await getLocalUserId();
        if (!userId) {
            const { error } = await createUser();
            if (error) {
                setAppError(new Error(error, 'Something went wrong'));
                return;
            }
        }
        fetchData();
    }

    const fetchData = async () => {
        const userId = await getLocalUserId();
        if (!userId) {
            setAppError(new Error('Missing User ID...', 'Something went wrong'));
            return;
        }

        const { user, ones, actionSteps, myStoryChapters, error } = await fetchServerData();
        if (error) {
            setAppError(new Error(error, 'Something went wrong'));
            return;
        }

        const beacons = await fetchActiveBeacons();

        loadServerData({
            localEvents: JsonFunctions.getLocalEventsJson(),
            localMinistries: JsonFunctions.getLocalMinistriesJson(),
            localMinistryLeaders: [],
            missionsTrips: JsonFunctions.getMissionsTripsJson(),
            missionsTripLeaders: [],
            ones: ones,
            oneFacts: JsonFunctions.getOneFactsFromJson(),
            actionSteps: actionSteps,
            beacons: beacons,
            beaconTemplates: JsonFunctions.getBeaconTemplatesFromJson(),
            prompts: JsonFunctions.getPromptsFromJson(),
            stories: JsonFunctions.getStoriesFromJson(),
            myStoryChapters: myStoryChapters,
            GodsStoryChapters: JsonFunctions.getStoryChaptersFromJson(),
            storyActivities: JsonFunctions.getStoryActivitiesFromJson(),
            users: [user],
            executor: user,
            beaconLogs: JsonFunctions.getBeaconLogsFromJson()
        });
    };

    return <></>;
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = {
    loadServerData,
    refreshData,
    setAppError,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRefreshManager);