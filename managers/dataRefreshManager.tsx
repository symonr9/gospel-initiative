import { loadServerData, loadLocalData, setAppError } from '@/redux/actions';
import React, { useEffect } from 'react';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getFromSecureStorage, getFromStorage, isSecureStorageAvailable, saveToStorage, saveToSecureStorage } from '@/utils/storageUtils';
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
            if (data.error) {
                setAppError(new Error(data.error, 'Something went wrong'));
                return;
            }
            saveToStorage("userId", data.id);
            loadSettings();
            return;
        }

        loadLocalData({
            userId,
            authToken
        });
    }

    const getLocalUserId = async () => {
        try {
            return await getFromStorage('userId');
        } catch (error) {
            console.error('Failed to load user id:', error);
            return null;
        }
    };

    const getLocalAuthToken = async () => {
        try {
            const isAvailable = await isSecureStorageAvailable();
            if (!isAvailable) {
                console.error('Secure share is not available on this device');
                return null;
            }
            return await getFromSecureStorage('authToken');
        } catch (error) {
            console.error('Failed to load auth token:', error);
        }
        return null;
    };

    const fetchData = async (userId: string) => {
        const { user, ones, actionSteps, myStoryChapters, error } = await fetchServerData(userId);
        if (error) {
            setAppError(new Error(error, 'Something went wrong'));
            return;
        }

        const beacons = await fetchActiveBeacons(userId);

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