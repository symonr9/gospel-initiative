import React, { useCallback, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { RefreshControl, ScrollView, StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, ItemRowContainerType, RefreshSpec } from '@/enums/enums';
import { BeaconCard } from './BeaconCard';
import { ItemRowContainer } from '../common/ItemRowContainer';
import { EnhancedBeacon } from '@/models/beacon';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors/beaconSelectors';
import BeaconDetails from './BeaconDetails';
import ScrollLayout from '../common/ScrollLayout';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageColumn } from '../common/PageColumn';
import { refreshData, setSelectedPrayerId } from '@/redux/actions';
import { useThemeColors } from '@/constants/Colors';
import User from '@/models/user';

export type IBeaconsPrayLayout = ViewProps & {
    completedBeacons: any;
    incomingBeacons: any;
    selectedPrayerId: string | null;
    setSelectedPrayerId: Function;
    executor: User;
    refreshData: Function;
};

function BeaconsPrayLayout({ completedBeacons, incomingBeacons, selectedPrayerId, setSelectedPrayerId, executor, refreshData }: IBeaconsPrayLayout) {
    const [activeRoadType, setActiveRoadType] = useState(ItemRowContainerType.Incoming);
    const [refreshing, setRefreshing] = useState(false);

    const { secondaryColor } = useThemeColors();

    const incomingCursorIdx = incomingBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === selectedPrayerId);
    const completedCursorIdx = completedBeacons.findIndex((beacon: EnhancedBeacon) => beacon.id === selectedPrayerId);
    const completedCount = completedBeacons.length;
    const incomingCount = incomingBeacons.length;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refreshData(RefreshSpec.All);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

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
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <PageColumn spaceEvenly style={{ gap: 12 }}>
                {
                    showLetsPrayHeader && (
                        <AnimatedHeader title={`Let's Pray!`}
                            subtitle='Select a beacon below to begin.' />
                    )
                }

                <PageColumn>
                    <ItemRowContainer title={`Completed (${completedCount})`}
                        iconSrc={AppIcon.Checkmark}
                        type={ItemRowContainerType.Completed}
                        activeType={activeRoadType}
                        setActiveType={setActiveRoadType}
                        expandedHeight={60}
                        itemsToRender={completedItemsToRender}
                        useTextTintForIcon={false}
                        customStyles={{ container: { backgroundColor: secondaryColor } }} />
                    <ItemRowContainer title={`Incoming (${incomingCount})`}
                        iconSrc={AppIcon.Send}
                        type={ItemRowContainerType.Incoming}
                        activeType={activeRoadType}
                        isTopPosition={false}
                        expandedHeight={60}
                        setActiveType={setActiveRoadType}
                        itemsToRender={incomingItemsToRender}
                        customStyles={{ container: { backgroundColor: secondaryColor } }} />
                </PageColumn>

                <BeaconDetails incomingCursorIdx={incomingCursorIdx}
                    completedCursorIdx={completedCursorIdx}
                    completedBeacons={completedBeacons}
                    incomingBeacons={incomingBeacons} />
            </PageColumn>
        </ScrollView>
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
        executor: state.users.executor,
    };
}

const mapDispatchToProps = {
    setSelectedPrayerId,
    refreshData
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsPrayLayout);