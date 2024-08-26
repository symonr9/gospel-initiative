
import { ActionStepType, AvatarIcon, OneStage, PrayerBeaconType, PrayerType, ShareChristPageState } from '@/enums/enums';
import One from '@/models/one';
import { updateBeacon, setSelectedBeaconId, setBeaconType } from '@/redux/actions';
import { selectPrayerBeaconById } from '@/redux/selectors';
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';

export type IAppStateManager = {
    shareChristPageState: ShareChristPageState;
    selectedBeaconId: string | null;
    setSelectedBeaconId: Function;
    setBeaconType: Function;
};

function AppStateManager({ shareChristPageState, selectedBeaconId, setSelectedBeaconId, setBeaconType }: IAppStateManager) {

    useEffect(() => {
        console.log("shareChristPageState: ", shareChristPageState);
        if (selectedBeaconId != null && shareChristPageState == ShareChristPageState.ConfirmSendPrayerBeacon) {
            setBeaconType(selectedBeaconId, PrayerBeaconType.Active);
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
    setSelectedBeaconId,
    setBeaconType
};

export default connect(mapStateToProps, mapDispatchToProps)(AppStateManager);