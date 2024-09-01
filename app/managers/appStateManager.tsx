
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
        const shouldAddBeacon = selectedTemplateId != null 
            && executor != null
            && selectedOne != null                   
            && shareChristPageState == ShareChristPageState.ConfirmSendBeacon;

        if (shouldAddBeacon) {
            const selectedTemplate = beaconTemplates.find((template) => template.id === selectedTemplateId);
            if (!selectedTemplate) {
                console.error("Failed to find matching template: ", selectedTemplateId);
                return;
            } else if (!beaconForm) {
                console.error("Failed to find beacon form...");
                return;
            }

            addBeacon(
                new Beacon(
                    generateRandomId(),
                    selectedTemplate.name,
                    beaconForm.notes || null,
                    selectedOne.id,
                    Priority.Normal,
                    executor.id,
                    null,
                    selectedTemplate.type,
                    getTomorrow(),
                    beaconForm.shareOneName,
                    beaconForm.shareOwnName
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
    beaconTemplates: state.beacons.beaconTemplates,
    beaconForm: state.beacons.beaconForm
});

const mapDispatchToProps = {
    setSelectedTemplateId,
    setSelectedOne,
    addBeacon
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);