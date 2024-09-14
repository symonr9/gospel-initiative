import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, FadeDirection, RoadContainerType } from '@/enums/enums';
import { ShareChristBeaconCard } from './ShareChristBeaconCard';
import { ShareChristRoadContainer } from './ShareChristRoadContainer';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import ShareChristBeaconDetails from './ShareChristBeaconDetails';
import { AnimatedCard } from '../common/AnimatedCard';
import BeaconActivityBezierLineChart from '../common/BeaconActivityBezierLineChart';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';

export type IShareChristBeaconsLayout = ViewProps & {
    // completedBeacons: EnhancedBeacon[];
    // incomingBeacons: EnhancedBeacon[];
};

function ShareChristBeaconsLayout({ }: IShareChristBeaconsLayout) {
    const [activeBeaconId, setActiveBeaconId] = useState(null);
    const [activeRoadType, setActiveRoadType] = useState(RoadContainerType.Incoming);

    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

    const incomingCursorIdx = incomingBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);
    const completedCursorIdx = completedBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);
    const completedCount = completedBeacons.length;
    const incomingCount = incomingBeacons.length;

    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon: EnhancedBeacon, idx: number) => (
        <ShareChristBeaconCard beacon={beacon}
            one={beacon.one}
            user={beacon.user}
            activities={beacon.completedActivities}
            idx={idx}
            activeBeaconId={activeBeaconId}
            setActiveBeaconId={setActiveBeaconId}
            selectedIdx={completedCursorIdx} />
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon, idx) => (
        <ShareChristBeaconCard beacon={beacon}
            one={beacon.one}
            user={beacon.user}
            activities={beacon.incomingActivities}
            idx={idx}
            activeBeaconId={activeBeaconId}
            setActiveBeaconId={setActiveBeaconId}
            selectedIdx={incomingCursorIdx} />
    )) : [];

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <ShareChristBeaconDetails incomingCursorIdx={incomingCursorIdx}
                        completedCursorIdx={completedCursorIdx}
                        completedBeacons={completedBeacons}
                        incomingBeacons={incomingBeacons} />
                </View>

                <View>
                    <ShareChristRoadContainer title={`Completed (${completedCount})`}
                        iconSrc={AppIcon.Checkmark}
                        type={RoadContainerType.Completed}
                        activeType={activeRoadType}
                        setActiveType={setActiveRoadType}
                        expandedHeight={100}
                        itemsToRender={completedItemsToRender}
                        customStyles={completedStyle} />
                    <ShareChristRoadContainer title={`Incoming (${incomingCount})`}
                        iconSrc={AppIcon.Send}
                        type={RoadContainerType.Incoming}
                        activeType={activeRoadType}
                        isTopPosition={false}
                        expandedHeight={100}
                        setActiveType={setActiveRoadType}
                        itemsToRender={incomingItemsToRender}
                        customStyles={incomingStyle} />
                </View>

                <BeaconActivityBezierLineChart />
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 16
    },
});

const completedStyle = {
    container: {
        backgroundColor: '#d9ead3'
    },
    header: {

    },
    title: {
        color: '#333'
    },
    itemsContainer: {

    }
};

const incomingStyle = {
    container: {
        backgroundColor: Colors.light.secondary
    },
    header: {

    },
    title: {
        color: '#333'
    },
    itemsContainer: {

    }
};

const mapStateToProps = (state: any) => {
    const { completedBeacons = [], incomingBeacons = [] } = selectPartitionedActiveEnhancedBeacons(state);
    return {
        completedBeacons,
        incomingBeacons,
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconsLayout);