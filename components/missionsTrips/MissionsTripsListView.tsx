
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import MissionsTrip from '@/models/missionsTrip';

export type IActionStepListView = ViewProps & {
    missionsTrips: MissionsTrip[];
};

function MissionsTripsListView({ style, missionsTrips, ...otherProps }: IActionStepListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: MissionsTrip }) => (
        <div>{item.title}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MissionsTripsListView);