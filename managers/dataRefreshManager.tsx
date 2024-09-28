import { loadServerData, loadLocalData, setAppError } from '@/redux/actions';
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getFromSecureStorage, getFromStorage, isSecureStorageAvailable, saveToStorage, saveToSecureStorage } from '@/utils/storageUtils';
import { fetchServerData } from '@/requests/Requests';
import Error from '@/models/error';

export type IDataRefreshManager = {
    state: any,

    loadServerData: (data: any) => void,
    loadLocalData: (data: any) => void,
    setAppError: Function
};

function DataRefreshManager({ state, loadServerData, loadLocalData, setAppError }: IDataRefreshManager) {

    console.log("State: ", state);

    const getLocalUserId = async () => {
        try {
            let userId = await getFromStorage('userId');
            if (!userId) {
                userId = 'clzxrugkq0000xz8dixbcj3pl';
                saveToStorage('userId', userId);
            }
            return userId;
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

            let authToken = await getFromSecureStorage('authToken');
            if (!authToken) {
                authToken = 'test';
                await saveToSecureStorage('authToken', authToken);
            }

            return authToken;
        } catch (error) {
            console.error('Failed to load auth token:', error);
        }
        return null;
    };

    const fetchLocalData = async () => {
        const userId = await getLocalUserId();
        const authToken = await getLocalAuthToken();

        loadLocalData({
            userId,
            authToken
        });
    };

    useEffect(() => {
        console.log("Loading local data...");
        fetchLocalData();
    }, []);

    const fetchData = async (userId: string) => {
        const { user, ones, beacons, actionSteps, beaconActivities, error } = await fetchServerData(userId);
        if (error) {
            setAppError(new Error(error, 'Something went wrong'));
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
            actionSteps: actionSteps,
            beacons: beacons,
            beaconTemplates: JsonFunctions.getBeaconTemplatesFromJson(),
            prompts: JsonFunctions.getPromptsFromJson(),
            stories: JsonFunctions.getStoriesFromJson(),
            storyChapters: JsonFunctions.getStoryChaptersFromJson(),
            storyActivities: JsonFunctions.getStoryActivitiesFromJson(),
            users: [user],
            executor: user,
            beaconActivities: beaconActivities,
            beaconLogs: JsonFunctions.getBeaconLogsFromJson()
        });
    };

    useEffect(() => {
        if (!state.app.userId) {
            return;
        }

        console.log("Loading server data...");
        fetchData(state.app.userId);
    }, [state.app.userId]);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = {
    loadServerData,
    loadLocalData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRefreshManager);