
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Page, ShareChristPageState } from '@/enums/enums';
import OnesLayout from '../ones/OnesLayout';
import BeaconLayout from '../beacons/BeaconLayout';
import ShareChristHomeLayout from './ShareChristHomeLayout';
import ShareChristBeaconsContainer from './ShareChristBeaconsContainer';

export type IShareChristContainer = ViewProps & {
    page: Page,
    pageState: ShareChristPageState,
};

export function ShareChristContainer({ page, pageState }: IShareChristContainer) {
    if (page == Page.ShareChristOnes) {
        if ([
            ShareChristPageState.Beacon,
            ShareChristPageState.AddBeacon,
            ShareChristPageState.EditBeacon,
            ShareChristPageState.SaveBeacon,
            ShareChristPageState.SendBeacon,
            ShareChristPageState.ConfirmSendBeacon,
        ].includes(pageState)) {
            return (
                <BeaconLayout />
            );
        }

        return (
            <OnesLayout/>
        );
    } else if (page === Page.ShareChristPrayers) {
        return (
            <ShareChristBeaconsContainer/>
        );
    }

    return (
        <ShareChristHomeLayout/>
    );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristContainer);
