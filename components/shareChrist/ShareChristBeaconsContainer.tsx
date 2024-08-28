import React from 'react';
import { connect, useSelector } from 'react-redux';
import { View, type ViewProps } from 'react-native';

import { selectAllActivePrayerBeacons } from '@/redux/selectors';
import { AppIcon } from '@/enums/enums';
import PrayerBeacon from '@/models/prayerBeacon';
import { AnimatedItemContainer } from '../common/AniamtedItemContainer';
import { SimpleIcon } from '../common/SimpleIcon';

export type IShareChristBeaconsContainer = ViewProps & {
    activeBeacons: PrayerBeacon[];
};

function ShareChristBeaconsContainer({ activeBeacons }: IShareChristBeaconsContainer) {
    const itemsToRender = activeBeacons ? activeBeacons.map((beacon) => (
        <SimpleIcon title={beacon.name} iconSrc={AppIcon.NetworkPeople}/>
    )) : [];

    return (
        <AnimatedItemContainer title={'Active Beacons'} 
                               iconSrc={AppIcon.NetworkPeople} 
                               itemsToRender={itemsToRender}/>
    );
}

const mapStateToProps = (state: any) => {
    const activePrayerBeacons = selectAllActivePrayerBeacons(state);
    console.log(activePrayerBeacons);
    return {
        activePrayerBeacons
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconsContainer);