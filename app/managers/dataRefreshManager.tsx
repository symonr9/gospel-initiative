
import { ActionStepType, AvatarIcon, OneStage, PrayerType } from '@/enums/enums';
import One from '@/models/one';
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
        
        loadServerData({
            ones: JsonFunctions.getOnesFromJson(),
            actionSteps: JsonFunctions.getActionStepsJson(),
            prayers: JsonFunctions.getPrayersFromJson()
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