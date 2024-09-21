import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, RoadContainerType } from '@/enums/enums';
import { BeaconCard } from './BeaconCard';
import { RoadContainer } from '../common/RoadContainer';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import BeaconDetails from './BeaconDetails';
import BeaconActivityBezierLineChart from '../common/BeaconActivityBezierLineChart';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';
import DetailsSection from '../common/DetailsSection';

export type IBeaconsPrayLayout = ViewProps & {

};

function BeaconsPrayLayout({ }: IBeaconsPrayLayout) {
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
                {
                    activeBeaconId === null && (
                        <AnimatedHeader title={`Let's Pray!`}
                            subtitle='Select a beacon below to begin.' />
                    )
                }

                <View>
                    <RoadContainer title={`Completed (${completedCount})`}
                        iconSrc={AppIcon.Checkmark}
                        type={RoadContainerType.Completed}
                        activeType={activeRoadType}
                        setActiveType={setActiveRoadType}
                        expandedHeight={75}
                        itemsToRender={completedItemsToRender}
                        customStyles={completedStyle} />
                    <RoadContainer title={`Incoming (${incomingCount})`}
                        iconSrc={AppIcon.Send}
                        type={RoadContainerType.Incoming}
                        activeType={activeRoadType}
                        isTopPosition={false}
                        expandedHeight={75}
                        setActiveType={setActiveRoadType}
                        itemsToRender={incomingItemsToRender}
                        customStyles={incomingStyle} />
                </View>

                <BeaconDetails incomingCursorIdx={incomingCursorIdx}
                    completedCursorIdx={completedCursorIdx}
                    completedBeacons={completedBeacons}
                    incomingBeacons={incomingBeacons} />
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsPrayLayout);