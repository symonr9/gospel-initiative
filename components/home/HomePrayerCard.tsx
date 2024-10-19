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

export type IHomePrayerCard = ViewProps & {

};

function HomePrayerCard({ }: IHomePrayerCard) {
    const router = useRouter();
    const { completedBeacons = [], incomingBeacons = [] } = useSelector((state: any) => selectPartitionedActiveEnhancedBeacons(state));

    const prayerTitle = incomingBeacons.length > 0 ? `Incoming Beacons (${incomingBeacons.length})` : `All Beacons Completed`;
    const prayerSubtitle = incomingBeacons.length > 0 ? `Tap on this card to pray.` : `Check back again later.`
    const prayerIcon = incomingBeacons.length > 0 ? AppIcon.Prayer : AppIcon.Checkmark;

    const onPrayerClick = () => {
        router.push('/ones?tab=1');
    };

    const incomingItemsToRender = incomingBeacons ? incomingBeacons.map((beacon, idx) => (
        <BeaconCard beacon={beacon}
            one={beacon.one}
            user={beacon.user}
            activities={beacon.incomingActivities}
            idx={idx}
            useAnimations={false}
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
        backgroundColor: Colors.light.secondary
    } : {
        backgroundColor: '#d9ead3'
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
        paddingVertical: 20
      },
});

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePrayerCard);
