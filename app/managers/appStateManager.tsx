
import { Priority, ShareChristPageState } from '@/enums/enums';
import Beacon from '@/models/beacon';
import BeaconTemplate from '@/models/beaconTemplate';
import One from '@/models/one';
import {  setSelectedTemplateId, setBeaconActiveUntil, addBeacon } from '@/redux/actions';
import { getTomorrow } from '@/utils/appUtils';
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';

export type IAppStateManager = {
    shareChristPageState: ShareChristPageState;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
    setBeaconActiveUntil: Function;
    addBeacon: Function;
};

function AppStateManager({ shareChristPageState, selectedTemplateId, beaconTemplates, 
    setSelectedTemplateId, setBeaconActiveUntil, addBeacon }: IAppStateManager) {

    useEffect(() => {
        console.log("shareChristPageState: ", shareChristPageState);
        if (selectedTemplateId != null && shareChristPageState == ShareChristPageState.ConfirmSendBeacon) {
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
                    null, // oneId,
                    Priority.Normal,
                    "settings1",
                    "user1",
                    null,
                    selectedTemplate.type,
                    getTomorrow()
                )
            );

            // setBeaconActiveUntil(selectedTemplateId, getTomorrow());
            setSelectedTemplateId(null);
        }
    }, [shareChristPageState]);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    shareChristPageState: state.app.shareChristPageState,
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates
});

const mapDispatchToProps = {
    setSelectedTemplateId,
    setBeaconActiveUntil,
    addBeacon
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);