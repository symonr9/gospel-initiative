
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Page, ShareChristPageState } from '@/enums/enums';
import OnesLayout from '../ones/OnesLayout';
import BeaconLayout from '../beacons/BeaconLayout';
import ShareChristHomeLayout from './ShareChristHomeLayout';
import ShareChristBeaconsLayout from './ShareChristBeaconsLayout';
import ShareChristStoriesLayout from './ShareChristStoriesLayout';

export type IShareChristContainer = ViewProps & {
    page: Page,
    pageState: ShareChristPageState,
};

function ShareChristContainer({ page, pageState }: IShareChristContainer) {
    if (page == Page.ShareChristOnes) {
        if ([
            ShareChristPageState.AllBeaconTemplates,
            ShareChristPageState.SavingBeaconForm,
            ShareChristPageState.ConfirmBeacon,
            ShareChristPageState.SentBeaconResponse,
        ].includes(pageState)) {
            return (
                <BeaconLayout />
            );
        }

        return (
            <OnesLayout/>
        );
    } else if (page === Page.ShareChristBeacons) {
        return (
            <ShareChristBeaconsLayout/>
        );
    } else if (page === Page.ShareChristStories) {
        return (
            <ShareChristStoriesLayout/>
        );
    }

    return (
        <ShareChristHomeLayout/>
    );
}

const mapStateToProps = (state: any) => ({
    page: state.app.page,
    pageState: state.app.shareChristPageState,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristContainer);
