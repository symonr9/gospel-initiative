
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, Text } from 'react-native';

import PrayerBeacon from '@/models/prayerBeacon';
import { formStyles } from '@/styles/Styles';
import { setSelectedBeaconId } from '@/redux/actions';
import { PageSubHeader } from '../common/PageSubHeader';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { ThemedView } from '../common/ThemedView';
import { PrayerBeaconCard } from './PrayerBeaconCard';
import { AppIcon } from '@/enums/enums';

export type IAddEditPrayerBeaconForm = ViewProps & {
    adding: boolean;
    selectedBeaconId: string | null;
    beacons: PrayerBeacon[];

    setSelectedBeaconId: Function;
};

function AddEditPrayerBeaconForm({ adding, selectedBeaconId, beacons, setSelectedBeaconId }: IAddEditPrayerBeaconForm) {
    const [formBeacon, setFormBeacon] = useState<PrayerBeacon>(
        (beacons.filter((beacon) => beacon.id === selectedBeaconId))[0] || PrayerBeacon.createNew()
    );

    const headerText = adding ? `Adding new Prayer Beacon` : `Editing Prayer Beacon: ${formBeacon.name}`;

    return (
        <View style={formStyles.container}>
            <PageSubHeader title={headerText} 
                           iconSrc={AppIcon.NetworkPeople}
                           style={{ backgroundColor: 'lightgreen' }} />
            <ThemedView>
                <ThemedText type={ThemedTextType.Default}>
                    {formBeacon.message}
                </ThemedText>
            </ThemedView>
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    selectedBeaconId: state.prayers.selectedBeaconId,
    beacons: state.prayers.prayerBeacons
});

const mapDispatchToProps = {
    setSelectedBeaconId
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPrayerBeaconForm);