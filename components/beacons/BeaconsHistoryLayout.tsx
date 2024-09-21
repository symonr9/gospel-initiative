import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, RoadContainerType } from '@/enums/enums';
import { BeaconCard } from './BeaconCard';
import { RoadContainer } from '../common/RoadContainer';
import { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import BeaconDetails from './BeaconDetails';
import BeaconActivityBezierLineChart from '../common/BeaconActivityBezierLineChart';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';
import DetailsSection from '../common/DetailsSection';

export type IBeaconsHistoryLayout = ViewProps & {

};

function BeaconsHistoryLayout({ }: IBeaconsHistoryLayout) {
    const [activeBeaconId, setActiveBeaconId] = useState(null);
    const [activeRoadType, setActiveRoadType] = useState(RoadContainerType.Incoming);

    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

    const incomingCursorIdx = incomingBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);
    const completedCursorIdx = completedBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);
    const completedCount = completedBeacons.length;
    const incomingCount = incomingBeacons.length;

    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon: EnhancedBeacon, idx: number) => (
        <BeaconCard beacon={beacon}
            one={beacon.one}
            user={beacon.user}
            activities={beacon.completedActivities}
            idx={idx}
            activeBeaconId={activeBeaconId}
            setActiveBeaconId={setActiveBeaconId}
            selectedIdx={completedCursorIdx} />
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon, idx) => (
        <BeaconCard beacon={beacon}
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
                <AnimatedHeader title='My History'
                    subtitle='' />

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
});

const mapStateToProps = (state: any) => {
    const { completedBeacons = [], incomingBeacons = [] } = selectPartitionedActiveEnhancedBeacons(state);
    return {
        completedBeacons,
        incomingBeacons,
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsHistoryLayout);