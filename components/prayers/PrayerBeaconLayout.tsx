
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import OnesLayoutHeader from '../ones/OnesLayoutHeader';
import PrayerBeaconsList from './PrayerBeaconsList';
import { ShareChristPageState } from '@/enums/enums';
import AddEditPrayerBeaconForm from './AddEditPrayerBeaconForm';

export type IOnesLayout = ViewProps & {
    shareChristPageState: ShareChristPageState;
};

function PrayerBeaconLayout({ shareChristPageState }: IOnesLayout) {
    const Layout: any[] = [];
    if (shareChristPageState == ShareChristPageState.AddPrayerBeacon) {
        Layout.push(<AddEditPrayerBeaconForm adding/>);
    } else if (shareChristPageState == ShareChristPageState.EditPrayerBeacon) {
        Layout.push(<AddEditPrayerBeaconForm adding={false}/>);
    } else if (shareChristPageState == ShareChristPageState.SavePrayerBeacon) {
        Layout.push(<View><Text>Saving...</Text></View>);
    } else { // View All, View One
        Layout.push(<PrayerBeaconsList/>);
    }

    return (
        <>
            <OnesLayoutHeader />
            {Layout.map((item) => item)}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    shareChristPageState: state.app.shareChristPageState,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PrayerBeaconLayout);