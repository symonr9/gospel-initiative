import { loadServerData, refreshData, setAppError } from '@/redux/actions';
import React, { useEffect, useRef } from 'react';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getLocalUserId } from '@/utils/storageUtils';
import { fetchServerData } from "@/requests/userRequests";
import { createUser } from "@/requests/userRequests";
import AppError from '@/models/error';
import { RefreshSpec } from '@/enums/enums';

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
    console.log("State: ", state);

    useEffect(() => {
        if (!hasConstantsLoaded()) {
            setAppError(new AppError('Invalid Server Configuration', 'Please contact your administrator.'));
            return;
        }
        console.log("Expo Config: ", Constants.expoConfig);
        loadSettings();
    }, []);

    useEffect(() => {
        if (state.app.refreshSpec === RefreshSpec.None) {
            return;
        }
        fetchData(state.app.refreshSpec);
    }, [state.app.refreshSpec]);

    const loadSettings = async () => {
        const userId = await getLocalUserId();
        if (!userId) {
            const { error } = await createUser();
            if (error) {
                setAppError(new AppError(error, 'Something went wrong'));
                return;
            }
        }
        fetchData(RefreshSpec.All);
    }

    const fetchData = async (refreshSpec: RefreshSpec) => {
        if (refreshSpec === RefreshSpec.None) {
            return;
        }

        const userId = await getLocalUserId();
        if (!userId) {
            setAppError(new AppError('Missing User ID...', 'Something went wrong'));
            return;
        }

        const { user, ones, myStoryChapters, 
            activeBeacons, expiredBeacons, error } = await fetchServerData(refreshSpec);
        if (error) {
            setAppError(new AppError(error, 'Something went wrong'));
            return;
        }

        loadServerData({
            localEvents: JsonFunctions.getLocalEventsJson(),
            localMinistries: JsonFunctions.getLocalMinistriesJson(),
            localMinistryLeaders: [],
            missionsTrips: JsonFunctions.getMissionsTripsJson(),
            missionsTripLeaders: [],
            ones: ones,
            oneFacts: JsonFunctions.getOneFactsFromJson(),
            activeBeacons: activeBeacons,
            expiredBeacons: expiredBeacons,
            beaconTemplates: JsonFunctions.getBeaconTemplatesFromJson(),
            prompts: JsonFunctions.getPromptsFromJson(),
            stories: JsonFunctions.getStoriesFromJson(),
            myStoryChapters: myStoryChapters,
            GodsStoryChapters: JsonFunctions.getGodsStoryChaptersFromJson(),
            storyActivities: JsonFunctions.getStoryActivitiesFromJson(),
            users: user ? [user] : null,
            executor: user,
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