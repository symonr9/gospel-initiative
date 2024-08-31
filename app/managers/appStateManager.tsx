
import { Priority, ShareChristPageState } from '@/enums/enums';
import Beacon from '@/models/beacon';
import BeaconTemplate from '@/models/beaconTemplate';
import One from '@/models/one';
import User from '@/models/user';
import {  setSelectedTemplateId, addBeacon, setSelectedOne } from '@/redux/actions';
import { getTomorrow } from '@/utils/appUtils';
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';

export type IAppStateManager = {
    executor: User;
    selectedOne: One;
    shareChristPageState: ShareChristPageState;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
    setSelectedOne: Function;
    addBeacon: Function;
};

function AppStateManager({ executor, selectedOne, shareChristPageState, selectedTemplateId, beaconTemplates, 
    setSelectedTemplateId, setSelectedOne, addBeacon }: IAppStateManager) {

    useEffect(() => {
        const shouldAddBeacon = selectedTemplateId != null 
            && executor != null
            && selectedOne != null                   
            && shareChristPageState == ShareChristPageState.ConfirmSendBeacon;

        if (shouldAddBeacon) {
            const selectedTemplate = beaconTemplates.find((template) => template.id === selectedTemplateId);
            if (!selectedTemplate) {
                console.error("Failed to find matching template: ", selectedTemplateId);
                return;
            }

            console.log("Adding new beacon");

            addBeacon(
                new Beacon(
                    "beacon3",
                    selectedTemplate.name,
                    selectedTemplate.message,
                    selectedOne.id,
                    Priority.Normal,
                    "beaconSettings1",
                    executor.id,
                    null,
                    selectedTemplate.type,
                    getTomorrow()
                )
            );

            setSelectedTemplateId(null);
        }
    }, [shareChristPageState]);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates
});

const mapDispatchToProps = {
    setSelectedTemplateId,
    setSelectedOne,
    addBeacon
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);