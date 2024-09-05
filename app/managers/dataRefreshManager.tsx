import { loadServerData } from '@/redux/actions';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as JsonFunctions from '../../utils/jsonFunctions';

export type IDataRefreshManager = {
    state: any,

    loadServerData: (data: any) => void,
};

function DataRefreshManager({ state, loadServerData }: IDataRefreshManager) {

    console.log("State: ", state);

    useEffect(() => {
        console.log("First time page load");
        
        const usersJson = JsonFunctions.getUsersFromJson();

        loadServerData({
            localEvents: JsonFunctions.getLocalEventsJson(),
            localMinistries: JsonFunctions.getLocalMinistriesJson(),
            localMinistryLeaders: [],
            missionsTrips: JsonFunctions.getMissionsTripsJson(),
            missionsTripLeaders: [],
            ones: JsonFunctions.getOnesFromJson(),
            meetings: [],
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
            ministryActivities: JsonFunctions.getMinistryActivitiesFromJson(),
            beaconActivities: JsonFunctions.getBeaconActivitiesFromJson(),
            beaconLogs: JsonFunctions.getBeaconLogsFromJson()
        });
    }, []);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    state: state
});

const mapDispatchToProps = {
    loadServerData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataRefreshManager);