
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Page, ShareChristPageState } from '@/enums/enums';
import OnesLayout from '../ones/OnesLayout';
import PrayerBeaconLayout from '../prayers/PrayerBeaconLayout';
import ShareChristHomeLayout from './ShareChristHomeLayout';

export type IShareChristContainer = ViewProps & {
    page: Page,
    pageState: ShareChristPageState,
};

export function ShareChristContainer({ page, pageState }: IShareChristContainer) {
    if (page == Page.OnesList) {
        if (pageState == ShareChristPageState.Edit) {
            return (
                <OnesLayout/>
            );
        } else if ([
            ShareChristPageState.PrayerBeacon,
            ShareChristPageState.AddPrayerBeacon,
            ShareChristPageState.EditPrayerBeacon,
            ShareChristPageState.SavePrayerBeacon,
            ShareChristPageState.SendPrayerBeacon,
            ShareChristPageState.ConfirmSendPrayerBeacon,
        ].includes(pageState)) {
            return (
                <PrayerBeaconLayout />
            );
        }

        return (
            <OnesLayout/>
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
