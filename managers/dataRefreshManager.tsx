import { loadBeaconData, loadServerData, refreshData, setAppError, setDataRefreshLoading, setNewUserStep, setShouldRefreshBeacons } from '@/redux/actions';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import * as JsonFunctions from '../utils/jsonFunctions';
import { getLocalNewUserStep, getLocalUserId } from '@/utils/storageUtils';
import { fetchServerData } from "@/requests/userRequests";
import { createUserAndSaveToLocalStorage } from "@/requests/userRequests";
import AppError from '@/models/error';
import { NewUserStep, RefreshSpec } from '@/enums/enums';
import { REFRESH_BEACONS_INTERVAL_SEC } from '@/constants/Constants';

export type IDataRefreshManager = {
    state: any,

    loadServerData: (data: any) => void,
    loadBeaconData: (data: any) => void,
    refreshData: Function,
    setNewUserStep: Function,
    setAppError: Function,
    setDataRefreshLoading: Function,
};

function getExpoServerUrl() {
    return Constants.expoConfig?.extra?.serverUrl;
}

function DataRefreshManager({ state, loadServerData, loadBeaconData, setNewUserStep, refreshData,
    setAppError, setDataRefreshLoading }: IDataRefreshManager) {
    useEffect(() => {
        if (state.app.newUserStep !== NewUserStep.Loading)
            return;

        const expoServerUrl = getExpoServerUrl();
        if (!expoServerUrl) {
            setAppError(new AppError('Invalid Server Configuration', 'Please contact your administrator.'));
            return;
        }
        console.log(`Expo Server URL: ${expoServerUrl}`);
        loadSettings();
    }, [state.app.newUserStep]);

    useEffect(() => {
        if (!state.app.shouldRefreshBeacons) {
            return;
        }
        const interval = setInterval(() => { refreshData(RefreshSpec.Beacons); }, REFRESH_BEACONS_INTERVAL_SEC * 1000);
        return () => clearInterval(interval); // Cleanup
    }, [state.app.shouldRefreshBeacons]);

    useEffect(() => {
        if (state.app.refreshSpec === RefreshSpec.None) {
            return;
        }
        fetchData(state.app.refreshSpec);
        refreshData(RefreshSpec.None);
    }, [state.app.refreshSpec]);

    const loadSettings = async () => {
        const localNewUserStep = await getLocalNewUserStep();
        const newUserStep = localNewUserStep !== null && (parseInt(localNewUserStep) !== -1) ? parseInt(localNewUserStep) : NewUserStep.Splash;
        setNewUserStep(newUserStep);

        const userId = await getLocalUserId();
        if (!userId) {
            const { error } = await createUserAndSaveToLocalStorage();
            if (error) {
                setAppError(new AppError(error, 'Something went wrong'));
            }
            return;
        }

        if (newUserStep !== NewUserStep.Completed) {
            return; // Not done with onboarding!
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
            setShouldRefreshBeacons(false);
            return;
        }

        setDataRefreshLoading(true);
        const { user, ones, myStoryChapters,
            activeBeacons, expiredBeacons, error } = await fetchServerData(refreshSpec);
        setDataRefreshLoading(false);
        if (error) {
            setAppError(new AppError(error, 'Something went wrong'));
            setShouldRefreshBeacons(false);
            return;
        }

        if (refreshSpec === RefreshSpec.Beacons) {
            loadBeaconData({
                activeBeacons: activeBeacons,
                expiredBeacons: expiredBeacons,
            });
            return;
        }

        setShouldRefreshBeacons(true);
        loadServerData({
            localEvents: JsonFunctions.getLocalEventsJson(),
            localMinistries: JsonFunctions.getLocalMinistriesJson(),
            localMinistryLeaders: [],
            missionsTrips: JsonFunctions.getMissionsTripsJson(),
            missionsTripLeaders: [],
            ones: ones,
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
    state
});

const mapDispatchToProps = {
    loadServerData,
    loadBeaconData,
    refreshData,
    setNewUserStep,
    setAppError,
    setDataRefreshLoading,
    setShouldRefreshBeacons
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRefreshManager);