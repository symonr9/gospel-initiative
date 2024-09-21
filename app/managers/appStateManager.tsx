
import BeaconForm from '@/models/beaconForm';
import BeaconTemplate from '@/models/beaconTemplate';
import One from '@/models/one';
import User from '@/models/user';
import {  setSelectedTemplateId, addBeacon, setSelectedOne } from '@/redux/actions';
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';

export type IAppStateManager = {
    executor: User;
    selectedOne: One;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    beaconForm: BeaconForm | null;
    setSelectedTemplateId: Function;
    setSelectedOne: Function;
    addBeacon: Function;
};

function AppStateManager({ executor, selectedOne, selectedTemplateId, beaconTemplates, 
    setSelectedTemplateId, setSelectedOne, addBeacon, beaconForm }: IAppStateManager) {

    useEffect(() => {
        const shouldAddBeacon = selectedTemplateId != null 
            && executor != null
            && selectedOne != null;

        if (shouldAddBeacon) {
            setSelectedTemplateId(null);
        }
    }, []);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    selectedOne: state.ones.selectedOne,
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