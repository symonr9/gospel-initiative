
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import PrayerBeacon from '@/models/prayerBeacon';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { PrayerBeaconCard } from './PrayerBeaconCard';

export type IPrayerRequestsList = ViewProps & {
    prayerBeacons: PrayerBeacon[];
};

function PrayerBeaconsList({ style, prayerBeacons, ...otherProps }: IPrayerRequestsList) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: PrayerBeacon }) => (
        <PrayerBeaconCard prayerBeacon={item}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={prayerBeacons}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    prayerBeacons: state.prayers.prayerBeacons,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PrayerBeaconsList);