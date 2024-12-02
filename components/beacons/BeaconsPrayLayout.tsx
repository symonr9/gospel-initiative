import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, ItemRowContainerType } from '@/enums/enums';
import { BeaconCard } from './BeaconCard';
import { ItemRowContainer } from '../common/ItemRowContainer';
import { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import BeaconDetails from './BeaconDetails';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageColumn } from '../common/PageColumn';

export type IBeaconsPrayLayout = ViewProps & {

};

function BeaconsPrayLayout({ }: IBeaconsPrayLayout) {
    const [activeBeaconId, setActiveBeaconId] = useState(null);
    const [activeRoadType, setActiveRoadType] = useState(ItemRowContainerType.Incoming);

    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

    const incomingCursorIdx = incomingBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);
    const completedCursorIdx = completedBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === activeBeaconId);
    const completedCount = completedBeacons.length;
    const incomingCount = incomingBeacons.length;

    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon: EnhancedBeacon, idx: number) => (
        <BeaconCard beacon={beacon}
            idx={idx}
            activeBeaconId={activeBeaconId}
            setActiveBeaconId={setActiveBeaconId}
            selectedIdx={completedCursorIdx} />
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon: EnhancedBeacon, idx: number) => (
        <BeaconCard beacon={beacon}
            idx={idx}
            activeBeaconId={activeBeaconId}
            setActiveBeaconId={setActiveBeaconId}
            selectedIdx={incomingCursorIdx} />
    )) : [];


    const showLetsPrayHeader = activeBeaconId === null && incomingItemsToRender.length > 0;

    return (
        <ScrollLayout>
            <PageColumn spaceEvenly style={{ gap: 8 }}>
                {
                    showLetsPrayHeader && (
                        <AnimatedHeader title={`Let's Pray!`}
                            subtitle='Select a beacon below to begin.' />
                    )
                }

                <BeaconDetails incomingCursorIdx={incomingCursorIdx}
                    setActiveBeaconId={setActiveBeaconId}
                    completedCursorIdx={completedCursorIdx}
                    completedBeacons={completedBeacons}
                    incomingBeacons={incomingBeacons} />

                <PageColumn>
                    <ItemRowContainer title={`Completed (${completedCount})`}
                        iconSrc={AppIcon.Checkmark}
                        type={ItemRowContainerType.Completed}
                        activeType={activeRoadType}
                        setActiveType={setActiveRoadType}
                        expandedHeight={60}
                        itemsToRender={completedItemsToRender}
                        customStyles={{ container: { backgroundColor: Colors.light.secondary } }} />
                    <ItemRowContainer title={`Incoming (${incomingCount})`}
                        iconSrc={AppIcon.Send}
                        type={ItemRowContainerType.Incoming}
                        activeType={activeRoadType}
                        isTopPosition={false}
                        expandedHeight={60}
                        setActiveType={setActiveRoadType}
                        itemsToRender={incomingItemsToRender}
                        customStyles={{ container: { backgroundColor: Colors.white } }} />
                </PageColumn>
            </PageColumn>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsPrayLayout);