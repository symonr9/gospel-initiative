import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import MissionsTrip from '@/models/missionsTrip';
import { ThemedView } from '../common/ThemedView';
import Animated from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import { MissionsTripCard } from './MissionsTripCard';
import { ReachWorldDetails } from './ReachWorldDetails';
import { listStyles } from '@/styles/Styles';
import ScrollLayout from '../common/ScrollLayout';

export type IReachWorldMissionsTripLayout = ViewProps & {
    missionsTrips: MissionsTrip[];
};

function ReachWorldMissionsTripLayout({ missionsTrips }: IReachWorldMissionsTripLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const [selected, setSelected] = useState('');
    console.log("missionsTrips: ", missionsTrips);

    const itemsToRender = missionsTrips ? missionsTrips.map((missionTrip) => {
        return (
            <MissionsTripCard missionsTrip={missionTrip}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId} />
        );
    }) : [];

    return (
        <ScrollLayout>
            <ReachWorldDetails missionsTrips={missionsTrips} 
                               activeItemId={activeItemId} 
                               setActiveItemId={setActiveItemId}/>

            {
                activeItemId === null && (
                    <AppText type={TextType.BodyBold}>
                        Missions Trips
                    </AppText>
                )
            }

            <ScrollLayout style={{ maxHeight: 500 }}>
                <Animated.View
                    style={[listStyles.itemsContainer]}>
                    {itemsToRender.map((item, index) => item)}
                </Animated.View>
            </ScrollLayout>
        </ScrollLayout>
    );
}

const mapStateToProps = (state: any) => {

    return {
        missionsTrips: state.missionsTrips.missionsTrips
    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorldMissionsTripLayout);