
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Dimensions, Animated } from 'react-native';

import PrayerBeacon from '@/models/prayerBeacon';
import { BeaconCard } from './BeaconCard';
import { formStyles, listStyles } from '@/styles/Styles';
import { isEditing } from '@/utils/appUtils';
import { ShareChristPageState } from '@/enums/enums';
import One from '@/models/one';
import { selectActivePrayerBeaconsByOneId, selectPrayerBeaconsByOneId } from '@/redux/selectors';
import { setSelectedBeaconId } from '@/redux/actions';
import { BeaconsListHeader } from './BeaconsListHeader';

export type IBeaconsList = ViewProps & {
    onlyActive?: boolean;

    selectedOne: One;
    shareChristPageState: ShareChristPageState;
    selectedBeaconId: string | null;
    setSelectedBeaconId: Function;
};

function BeaconsList({ selectedOne, shareChristPageState, selectedBeaconId,
    setSelectedBeaconId, onlyActive = false }: IBeaconsList) {
    const selector = onlyActive 
        ? selectActivePrayerBeaconsByOneId(selectedOne.id)
        : selectPrayerBeaconsByOneId(selectedOne.id);
    const prayerBeacons = useSelector(selector);

    const renderItem = ({ item }: { item: PrayerBeacon }) => (
        <BeaconCard prayerBeacon={item}
                          onlyActive={onlyActive}
                          shareChristPageState={shareChristPageState}
                          setSelectedBeaconId={setSelectedBeaconId}
                          selectedBeaconId={selectedBeaconId} />
    );

    return (
        <View style={[listStyles.container, styles.container]}>
            <BeaconsListHeader shareChristPageState={shareChristPageState} 
                                     onlyActive={onlyActive}/>
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
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
    selectedBeaconId: state.beacons.selectedBeaconId
});


const mapDispatchToProps = {
    setSelectedBeaconId
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconsList);