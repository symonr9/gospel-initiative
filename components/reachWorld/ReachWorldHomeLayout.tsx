import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';
import MissionsTrip from '@/models/missionsTrip';
import { ThemedView } from '../common/ThemedView';
import Animated from 'react-native-reanimated';
import { AppText, TextType } from '../common/AppText';
import { AnimatedCard } from '../common/AnimatedCard';
import { MissionsTripCard } from '../missionsTrips/MissionsTripCard';

export type IReachWorldHomeLayout = ViewProps & {
    missionsTrips: MissionsTrip[];
};

function ReachWorldHomeLayout({ missionsTrips }: IReachWorldHomeLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    
    console.log("missionsTrips: ", missionsTrips);

    const itemsToRender = missionsTrips ? missionsTrips.map((missionTrip) => {
        return (
            <MissionsTripCard missionsTrip={missionTrip}
                              activeItemId={activeItemId}
                              setActiveItemId={setActiveItemId}/>
        );
    }) : [];

    return (
        <ThemedView style={[styles.container]}>
            <AnimatedHeader title='Reach World' delay={200}/>

            <Animated.View
                style={[styles.itemsContainer]}>
                {itemsToRender.map((item, index) => item)}
            </Animated.View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginEnd: 4,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        padding: 10,
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflow: 'scroll',
        height: 600,
        width: 200,
    },
    icon: {
        width: 24,
        height: 24,
        marginEnd: 8,
        alignSelf: 'center',
    },
});

const mapStateToProps = (state: any) => {

    return {
        missionsTrips: state.missionsTrips.missionsTrips
    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorldHomeLayout);