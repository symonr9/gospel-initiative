

import React, {  } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Leader from '@/models/leader';
import { LeaderCard } from './LeaderCard';
import { useThemeColors } from '@/constants/Colors';

export type ILeadersList = ViewProps & {
    localMinistryLeaders: Leader[];
    missionsTripLeaders: Leader[];
};

function LeadersList({ style, localMinistryLeaders, missionsTripLeaders,
    ...otherProps }: ILeadersList) {
    const { backgroundColor } = useThemeColors();

    const leaders = localMinistryLeaders.concat(missionsTripLeaders);

    const renderItem = ({ item }: { item: Leader }) => (
        <LeaderCard leader={item}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadersList);