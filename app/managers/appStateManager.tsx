
import { Priority, ShareChristPageState } from '@/enums/enums';
import Beacon from '@/models/beacon';
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import One from '@/models/one';
import User from '@/models/user';
import {  setSelectedTemplateId, addBeacon, setSelectedOne } from '@/redux/actions';
import { generateRandomId, getTomorrow } from '@/utils/appUtils';
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';

export type IAppStateManager = {
    executor: User;
    selectedOne: One;
    shareChristPageState: ShareChristPageState;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    beaconForm: BeaconForm | null;
    setSelectedTemplateId: Function;
    setSelectedOne: Function;
    addBeacon: Function;
};

function AppStateManager({ executor, selectedOne, shareChristPageState, selectedTemplateId, beaconTemplates, 
    setSelectedTemplateId, setSelectedOne, addBeacon, beaconForm }: IAppStateManager) {

    useEffect(() => {

    }, []);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates,
    beaconForm: state.beacons.beaconForm
});

const mapDispatchToProps = {
    setSelectedTemplateId,
    setSelectedOne,
    addBeacon
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);