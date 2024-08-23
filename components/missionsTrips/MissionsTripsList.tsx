
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import MissionsTrip from '@/models/missionsTrip';
import { MissionsTripCard } from './MissionsTripCard';

export type IMissionsTripsList = ViewProps & {
    missionsTrips: MissionsTrip[];
};

function MissionsTripsList({ style, missionsTrips, ...otherProps }: IMissionsTripsList) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: MissionsTrip }) => (
        <MissionsTripCard missionsTrip={item}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={missionsTrips}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    missionsTrips: state.missionsTrips.missionsTrips
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MissionsTripsList);