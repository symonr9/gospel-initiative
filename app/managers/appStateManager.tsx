
import { ActionStepType, AvatarIcon, OneStage, PrayerType, ShareChristPageState } from '@/enums/enums';
import One from '@/models/one';
import { loadServerData, setSelectedBeaconId } from '@/redux/actions';
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

export type IAppStateManager = {
    shareChristPageState: ShareChristPageState;
    selectedBeaconId: string | null;
    setSelectedBeaconId: Function;
};

function AppStateManager({ shareChristPageState, selectedBeaconId, setSelectedBeaconId }: IAppStateManager) {

    useEffect(() => {
        console.log("shareChristPageState: ", shareChristPageState);
        if (selectedBeaconId != null && shareChristPageState == ShareChristPageState.PrayerBeacon) {
            setSelectedBeaconId(null);
        }
    }, [shareChristPageState]);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    shareChristPageState: state.app.shareChristPageState,
    selectedBeaconId: state.prayers.selectedBeaconId,
});

const mapDispatchToProps = {
    setSelectedBeaconId
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);