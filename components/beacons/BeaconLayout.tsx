
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import OnesLayoutHeader from '../ones/OnesLayoutHeader';
import { ShareChristPageState } from '@/enums/enums';
import AddEditBeaconForm from './AddEditPrayerBeaconForm';
import PageResponse from '../common/PageResponse';
import BeaconsList from './BeaconsList';

export type IBeaconLayout = ViewProps & {
    shareChristPageState: ShareChristPageState;
};

function BeaconLayout({ shareChristPageState }: IBeaconLayout) {
    const Layout: any[] = [];
    if (shareChristPageState == ShareChristPageState.AddBeacon) {
        Layout.push(<AddEditBeaconForm adding/>);
    } else if (shareChristPageState == ShareChristPageState.EditBeacon) {
        Layout.push(<AddEditBeaconForm adding={false}/>);
    } else if (shareChristPageState == ShareChristPageState.SaveBeacon) {
        Layout.push(
            <View>
                <PageResponse title={'Saving Beacon'} 
                              details={'Please wait...'}/>
            </View>
        );
    } else if (shareChristPageState == ShareChristPageState.ConfirmSendBeacon) {
        Layout.push(
            <View>
                <PageResponse title={'Beacon successful!'} 
                              details={'Your church community is praying for you. Please check in later.'}/>
            </View>
        );
    } else { // View All, View One, Send Prayer Beacon
        Layout.push(<BeaconsList/>);
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

export default connect(mapStateToProps, mapDispatchToProps)(BeaconLayout);