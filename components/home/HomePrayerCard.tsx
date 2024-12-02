import React from 'react';
import { type ViewProps, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { connect, useSelector } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { PageColumn } from '../common/PageColumn';
import { AppIcon } from '@/enums/enums';
import { BeaconCard } from '../beacons/BeaconCard';
import { SimpleCard } from '../common/SimpleCard';
import { Colors } from '@/constants/Colors';
import { EnhancedBeacon } from '@/models/beacon';

export type IHomePrayerCard = ViewProps & {

};

function HomePrayerCard({ }: IHomePrayerCard) {
    const router = useRouter();
    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

    const prayerTitle = incomingBeacons.length > 0 ? `Incoming Beacons (${incomingBeacons.length})` : `All Beacons Completed`;
    const prayerSubtitle = incomingBeacons.length > 0 ? `Tap on a beacon to pray.` : `Check back again later.`
    const prayerIcon = incomingBeacons.length > 0 ? AppIcon.Prayer : AppIcon.Checkmark;

    const onPrayerClick = () => {
        router.replace('/ones?tab=1');
    };

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon: EnhancedBeacon, idx: number) => (
        <BeaconCard beacon={beacon}
            idx={idx}
            activeBeaconId={null}
            onPress={onPrayerClick}
            selectedIdx={null} />
    )) : [];

    const beaconsDetailView = (
        <PageColumn>
            <ScrollLayout horizontal style={{ paddingHorizontal: 4, width: 280 }}>
                {incomingItemsToRender.map((item: any, index: number) => (
                    <View key={index}>{item}</View>
                ))}
            </ScrollLayout>
        </PageColumn>
    );

    const colorStyle = incomingBeacons.length > 0 ? {
        backgroundColor: Colors.white
    } : {
        backgroundColor: Colors.info
    };

    return (
        <SimpleCard iconSrc={prayerIcon}
            style={[styles.card, colorStyle]}
            title={prayerTitle}
            subtitle={prayerSubtitle}
            detailsView={beaconsDetailView}
            onClick={onPrayerClick} />
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 16
      },
});

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePrayerCard);
