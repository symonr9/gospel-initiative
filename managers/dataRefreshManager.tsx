import { loadServerData, loadLocalData, setAppError } from '@/redux/actions';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getFromSecureStorage, getFromStorage, isSecureStorageAvailable, saveToStorage, saveToSecureStorage, getLocalAuthToken, getLocalUserId } from '@/utils/storageUtils';
import { createUser, fetchActiveBeacons, fetchServerData } from '@/requests/Requests';
import Error from '@/models/error';
import { generateRandomId, getRandomString } from '@/utils/appUtils';

export type IDataRefreshManager = {
    state: any,

    loadServerData: (data: any) => void,
    loadLocalData: (data: any) => void,
    setAppError: Function,
};

function hasConstantsLoaded() {
    return Constants.expoConfig?.extra?.serverUrl;
}

function DataRefreshManager({ state, loadServerData, loadLocalData, setAppError }: IDataRefreshManager) {

    console.log("State: ", state);

    useEffect(() => {
        if (!hasConstantsLoaded()) {
            setAppError(new Error('Invalid Server Configuration', 'Please contact your administrator.'));
            return;
        }

        console.log("Expo Config: ", Constants.expoConfig);
        console.log("Loading settings...");
        loadSettings();
    }, []);

    useEffect(() => {
        if (!state.app.userId) {
            return;
        }
        console.log("Loading server data...");
        fetchData(state.app.userId);
    }, [state.app.userId, state.app.shouldRefreshData]);

    const loadSettings = async () => {
        const userId = await getLocalUserId();
        const authToken = await getLocalAuthToken();

        if (!userId) {
            const data = await createUser();
            if (data.error || !data.user.id || !data.token) {
                setAppError(new Error(data.error, 'Something went wrong'));
                return;
            }
            saveToStorage("userId", data.user.id);

            const isSecureAvailable = await isSecureStorageAvailable();
            if (isSecureAvailable) {
                saveToSecureStorage("authToken", data.token);
            } else {
                saveToStorage("authToken", data.token);
            }

            loadLocalData({
                userId: data.user.id,
                authToken: data.token
            });
            return;
        }

        loadLocalData({
            userId,
            authToken
        });
    }

    const fetchData = async (userId: string) => {
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
    loadLocalData,
    setAppError,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRefreshManager);