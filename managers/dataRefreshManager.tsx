import { loadServerData, loadLocalData } from '@/redux/actions';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getFromSecureStorage, getFromStorage, isSecureStorageAvailable, saveToStorage, saveToSecureStorage } from '@/utils/storageUtils';


export type IDataRefreshManager = {
    state: any,

    loadServerData: (data: any) => void,
    loadLocalData: (data: any) => void
};



function DataRefreshManager({ state, loadServerData, loadLocalData }: IDataRefreshManager) {

    console.log("State: ", state);

    const getLocalUserId = async () => {
        try {
            let userId = await getFromStorage('userId');
            if (!userId) {
                userId = 'clzxrugkq0000xz8dixbcj3pl';
                saveToStorage('userId', userId);
            }
            return userId;
        } catch(error) {
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
        } catch(error) {
            console.error('Failed to load auth token:', error);
        }
        return null;
    };

    const loadData = async () => {
        const userId = await getLocalUserId();
        const authToken = await getLocalAuthToken();

        loadLocalData({
            userId,
            authToken
        });

        const usersJson = JsonFunctions.getUsersFromJson();

        loadServerData({
            localEvents: JsonFunctions.getLocalEventsJson(),
            localMinistries: JsonFunctions.getLocalMinistriesJson(),
            localMinistryLeaders: [],
            missionsTrips: JsonFunctions.getMissionsTripsJson(),
            missionsTripLeaders: [],
            ones: JsonFunctions.getOnesFromJson(),
            oneFacts: JsonFunctions.getOneFactsFromJson(),
            actionSteps: JsonFunctions.getActionStepsJson(),
            beacons: JsonFunctions.getBeaconsFromJson(),
            beaconTemplates: JsonFunctions.getBeaconTemplatesFromJson(),
            prompts: JsonFunctions.getPromptsFromJson(),
            stories: JsonFunctions.getStoriesFromJson(),
            storyChapters: JsonFunctions.getStoryChaptersFromJson(),
            storyActivities: JsonFunctions.getStoryActivitiesFromJson(),
            users: usersJson,
            executor: usersJson[0],
            beaconActivities: JsonFunctions.getBeaconActivitiesFromJson(),
            beaconLogs: JsonFunctions.getBeaconLogsFromJson()
        });
    };

    useEffect(() => {
        console.log("First time page load");

        loadData();
    }, []);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = {
    loadServerData,
    loadLocalData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRefreshManager);