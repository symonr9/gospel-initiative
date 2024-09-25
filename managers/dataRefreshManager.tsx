import { loadServerData, loadLocalData } from '@/redux/actions';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getFromSecureStorage, getFromStorage, isSecureStorageAvailable, saveToStorage, saveToSecureStorage } from '@/utils/storageUtils';
import { getData } from '@/utils/apiUtils';
import User from '@/models/user';
import { ActionStepType, AvatarIcon, BeaconType, OneCategory, OneStage, Priority, Role } from '@/enums/enums';
import One from '@/models/one';
import Beacon from '@/models/beacon';
import ActionStep from '@/models/actionStep';
import BeaconActivity from '@/models/beaconActivity';

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

    const fetchServerData = async (userId: string) => {
        try {
            const response = await getData(`/users/${userId}`);

            const user = new User(
                response.id,
                response.name,
                response.email,
                response.type as Role,
                AvatarIcon[response.icon as keyof typeof AvatarIcon],
                response.createdAt,
            );

            const ones = [];
            for (let one of response.ones) {
                ones.push(
                    new One(
                        one.id,
                        one.name,
                        AvatarIcon[one.icon as keyof typeof AvatarIcon],
                        one.stage as OneStage,
                        one.category as OneCategory,
                        one.prayingSince,
                        one.gospelChecklist ? one.gospelChecklist.split(',').map((item: any) => parseInt(item)) : [],
                        one.hidden,
                        response.id,
                    )
                );
            }
            
            const beacons = [];
            for (let beacon of response.beacons) {
                beacons.push(
                    new Beacon(
                        beacon.id,
                        beacon.name,
                        beacon.message,
                        beacon.oneId,
                        beacon.priority as Priority,
                        beacon.userId,
                        beacon.type as BeaconType,
                        beacon.activeUntil,
                        beacon.shareOwnName
                    )
                );
            }

            const actionSteps = [];
            for (let step of response.actionSteps) {
                actionSteps.push(
                    new ActionStep(
                        step.id,
                        step.notes,
                        step.oneId,
                        step.isComplete,
                        step.targetDate,
                        step.type as ActionStepType
                    )
                );
            }

            const beaconActivities = [];
            for (let activity of response.beaconActivities) {
                beaconActivities.push(
                    new BeaconActivity(
                        activity.id,
                        activity.note,
                        activity.date,
                        activity.userId,
                        activity.beaconId
                    )
                );
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


            console.log(response);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    useEffect(() => {
        if (!state.app.userId) {
            return;
        }

        console.log("Loading server data...");    
        fetchServerData(state.app.userId);
    }, [state.app.userId]);

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