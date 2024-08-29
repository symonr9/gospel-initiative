import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { View, type ViewProps } from 'react-native';

import { selectAllActivePrayerBeaconsEnhanced } from '@/redux/selectors';
import { AppIcon, ShareChristPageState } from '@/enums/enums';
import { PrayerBeaconWithOneAndUser as PrayerBeaconEnhanced } from '@/models/prayerBeacon';
import { AnimatedItemContainer } from '../common/AnimatedItemContainer';
import { ShareChristBeaconCard } from './ShareChristBeaconCard';

export type IShareChristBeaconsContainer = ViewProps & {
    activePrayerBeaconsEnhanced: PrayerBeaconEnhanced[];
    shareChristPageState: ShareChristPageState;
};

function ShareChristBeaconsContainer({ activePrayerBeaconsEnhanced, shareChristPageState }: IShareChristBeaconsContainer) {
    console.log("Active Beacons: ", activePrayerBeaconsEnhanced);

    const [selectedIdx, setSelectedIdx] = useState(null);

    const itemsToRender = activePrayerBeaconsEnhanced ? activePrayerBeaconsEnhanced.map((beacon, idx) => (
        <ShareChristBeaconCard prayerBeacon={beacon}
                               one={beacon.one}
                               user={beacon.user}
                               idx={idx}
                               selectedIdx={selectedIdx}
                               setSelectedIdx={setSelectedIdx}/>
    )) : [];

    return (
        <AnimatedItemContainer title={'Active Beacons'} 
                               iconSrc={AppIcon.NetworkPeople} 
                               itemsToRender={itemsToRender}/>
    );
}

const mapStateToProps = (state: any) => {
    const activePrayerBeaconsEnhanced = selectAllActivePrayerBeaconsEnhanced(state);
    return {
        activePrayerBeaconsEnhanced,
        shareChristPageState: state.app.shareChristPageState
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconsContainer);