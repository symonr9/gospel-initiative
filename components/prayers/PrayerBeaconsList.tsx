
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Dimensions } from 'react-native';

import PrayerBeacon from '@/models/prayerBeacon';
import { PrayerBeaconCard } from './PrayerBeaconCard';
import { listStyles } from '@/styles/Styles';
import { isEditing } from '@/utils/appUtils';
import { ShareChristPageState } from '@/enums/enums';
import One from '@/models/one';
import { selectPrayerBeaconsByOneId } from '@/redux/selectors';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { setSelectedBeaconId } from '@/redux/actions';

export type IPrayerRequestsList = ViewProps & {
    selectedOne: One;
    shareChristPageState: ShareChristPageState;
    selectedBeaconId: string | null;

    setSelectedBeaconId: Function;
};

function PrayerBeaconsList({ selectedOne, shareChristPageState, selectedBeaconId, setSelectedBeaconId }: IPrayerRequestsList) {
    const prayerBeacons = useSelector(selectPrayerBeaconsByOneId(selectedOne.id));
    const editing = isEditing(shareChristPageState);

    const renderItem = ({ item }: { item: PrayerBeacon }) => (
        <PrayerBeaconCard prayerBeacon={item} 
                          setSelectedBeaconId={setSelectedBeaconId}
                          selectedBeaconId={selectedBeaconId}/>
    );

    return (
        <View style={[listStyles.container, styles.container]}>
          <ThemedText type={ThemedTextType.Subtitle}>
            Prayer Beacons
          </ThemedText>
          <ThemedText type={ThemedTextType.Default}>
            Select a beacon to view and/or send.
          </ThemedText>

            <FlatList
                data={prayerBeacons}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const { height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: viewportHeight * 0.05,
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
    selectedBeaconId: state.prayers.selectedBeaconId
});


const mapDispatchToProps = {
    setSelectedBeaconId
};

export default connect(mapStateToProps, mapDispatchToProps)(PrayerBeaconsList);