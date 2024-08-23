

import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import Leader from '@/models/leader';
import { LeaderCardView } from './LeaderCardView';

export type ILeadersListView = ViewProps & {
    localMinistryLeaders: Leader[];
    missionsTripLeaders: Leader[];
};

function LeadersListView({ style, localMinistryLeaders, missionsTripLeaders,
    ...otherProps }: ILeadersListView) {
    const backgroundColor = useBackgroundThemeColor();

    const leaders = localMinistryLeaders.concat(missionsTripLeaders);

    const renderItem = ({ item }: { item: Leader }) => (
        <LeaderCardView leader={item}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={leaders}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    localMinistryLeaders: state.localMinistries.localMinistryLeaders,
    missionsTripLeaders: state.missionsTrips.missionsTripsLeaders
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LeadersListView);