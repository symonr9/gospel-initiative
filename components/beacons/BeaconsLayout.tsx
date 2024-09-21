import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, FadeDirection, RoadContainerType } from '@/enums/enums';
import { BeaconCard } from '../beacons/BeaconCard';
import { RoadContainer } from '../common/RoadContainer';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import BeaconDetails from './BeaconDetails';
import { AnimatedCard } from '../common/AnimatedCard';
import BeaconActivityBezierLineChart from '../common/BeaconActivityBezierLineChart';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';
import DetailsSection from '../common/DetailsSection';

export type IBeaconsLayout = ViewProps & {
    // completedBeacons: EnhancedBeacon[];
    // incomingBeacons: EnhancedBeacon[];
};

function BeaconsLayout({ }: IBeaconsLayout) {
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
                <AnimatedHeader title='Prayer Beacons'
                    subtitle='Select a beacon below to begin.' />
                <PageRow spaceEvenly>
                    <DetailsSection iconSrc={AppIcon.Prayer}
                        prefix={'To Pray For'}
                        title={incomingBeacons.length} />

                    <DetailsSection iconSrc={AppIcon.OpenHands}
                        prefix={'Prayed for Today'}
                        title={completedBeacons.length} />
                </PageRow>

                <BeaconDetails incomingCursorIdx={incomingCursorIdx}
                    completedCursorIdx={completedCursorIdx}
                    completedBeacons={completedBeacons}
                    incomingBeacons={incomingBeacons} />

                <View>
                    <RoadContainer title={`Completed (${completedCount})`}
                        iconSrc={AppIcon.Checkmark}
                        type={RoadContainerType.Completed}
                        activeType={activeRoadType}
                        setActiveType={setActiveRoadType}
                        expandedHeight={100}
                        itemsToRender={completedItemsToRender}
                        customStyles={completedStyle} />
                    <RoadContainer title={`Incoming (${incomingCount})`}
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

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsLayout);