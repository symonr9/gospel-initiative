
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Dimensions, Animated } from 'react-native';

import PrayerBeacon from '@/models/prayerBeacon';
import { PrayerBeaconCard } from './PrayerBeaconCard';
import { formStyles, listStyles } from '@/styles/Styles';
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

    const [bgColor, setBgColor] = useState(new Animated.Value(0));

    const shouldConfirm = shareChristPageState == ShareChristPageState.SendPrayerBeacon;

    useEffect(() => {
        Animated.timing(bgColor, {
            toValue: shouldConfirm ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [shouldConfirm]);

    const interpolatedBgColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', 'lightgreen']
    });

    const renderItem = ({ item }: { item: PrayerBeacon }) => (
        <PrayerBeaconCard prayerBeacon={item}
            setSelectedBeaconId={setSelectedBeaconId}
            selectedBeaconId={selectedBeaconId} />
    );

    const headerText = {
        title: shouldConfirm ? 'Send Beacon Confirmation?' : 'Prayer Beacons',
        details: shouldConfirm ? 'Are you sure you want to send this beacon?' : 'Select a beacon to view and/or send.'
    }

    return (
        <View style={[listStyles.container, styles.container]}>
            <Animated.View style={[formStyles.header, { backgroundColor: interpolatedBgColor }]}>
                <ThemedText type={ThemedTextType.Subtitle}>
                    {headerText.title}
                </ThemedText>
                <ThemedText type={ThemedTextType.Default}>
                    {headerText.details}
                </ThemedText>

            </Animated.View>

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