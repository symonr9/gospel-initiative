
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Prayer from '@/models/prayer';
import PrayerRequest from '@/models/prayerRequest';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IPrayerRequestsListView = ViewProps & {
    prayerRequests: PrayerRequest[];
    prayer: Prayer;
};

function PrayerRequestsListView({ style, prayerRequests, prayer, ...otherProps }: IPrayerRequestsListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: PrayerRequest }) => (
        <div>{item.name}</div>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={prayerRequests}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: IPrayerRequestsListView) => ({
    prayerRequests: state.prayerRequests,
    prayer: state.prayer
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PrayerRequestsListView);