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
import { setSelectedPrayerId } from '@/redux/actions';

export type IBeaconsPrayLayout = ViewProps & {
    completedBeacons: any;
    incomingBeacons: any;
    selectedPrayerId: string | null;
    setSelectedPrayerId: Function;
};

function BeaconsPrayLayout({ completedBeacons, incomingBeacons, selectedPrayerId, setSelectedPrayerId }: IBeaconsPrayLayout) {
    const [activeRoadType, setActiveRoadType] = useState(ItemRowContainerType.Incoming);

    const incomingCursorIdx = incomingBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === selectedPrayerId);
    const completedCursorIdx = completedBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === selectedPrayerId);
    const completedCount = completedBeacons.length;
    const incomingCount = incomingBeacons.length;

    const completedItemsToRender = completedBeacons ? completedBeacons.map((beacon: EnhancedBeacon, idx: number) => (
        <BeaconCard beacon={beacon}
            idx={idx}
            selectedPrayerId={selectedPrayerId}
            setSelectedPrayerId={setSelectedPrayerId}
            selectedIdx={completedCursorIdx} />
    )) : [];

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon: EnhancedBeacon, idx: number) => (
        <BeaconCard beacon={beacon}
            idx={idx}
            selectedPrayerId={selectedPrayerId}
            setSelectedPrayerId={setSelectedPrayerId}
            selectedIdx={incomingCursorIdx} />
    )) : [];

    const showLetsPrayHeader = selectedPrayerId === null && incomingItemsToRender.length > 0;

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
        selectedPrayerId: state.beacons.selectedPrayerId,
    };
}

const mapDispatchToProps = {
    setSelectedPrayerId
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsPrayLayout);