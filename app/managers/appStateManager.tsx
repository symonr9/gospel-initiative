
import { ShareChristPageState } from '@/enums/enums';
import One from '@/models/one';
import {  setSelectedBeaconId, setBeaconActiveUntil } from '@/redux/actions';
import { getTomorrow } from '@/utils/appUtils';
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';

export type IAppStateManager = {
    shareChristPageState: ShareChristPageState;
    selectedBeaconId: string | null;
    setSelectedBeaconId: Function;
    setBeaconActiveUntil: Function;
};

function AppStateManager({ shareChristPageState, selectedBeaconId, setSelectedBeaconId, setBeaconActiveUntil }: IAppStateManager) {

    useEffect(() => {
        console.log("shareChristPageState: ", shareChristPageState);
        if (selectedBeaconId != null && shareChristPageState == ShareChristPageState.ConfirmSendBeacon) {
            setBeaconActiveUntil(selectedBeaconId, getTomorrow());
            setSelectedBeaconId(null);
        }
    }, [shareChristPageState]);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    shareChristPageState: state.app.shareChristPageState,
    selectedBeaconId: state.beacons.selectedBeaconId,
});

const mapDispatchToProps = {
    setSelectedBeaconId,
    setBeaconActiveUntil
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);