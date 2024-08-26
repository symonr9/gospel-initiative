
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { Page, ShareChristPageState } from '@/enums/enums';
import { PageContainer } from '../common/PageContainer';
import OnesLayout from '../ones/OnesLayout';
import PrayerBeaconLayout from '../prayers/PrayerBeaconLayout';

export type IShareChristContainer = ViewProps & {
    page: Page,
    pageState: ShareChristPageState,
};

export function ShareChristContainer({ page, pageState }: IShareChristContainer) {
    return (
        <PageContainer>
            {getBody(page, pageState)}
        </PageContainer>
    );
}

const getBody = (page: Page, pageState: ShareChristPageState) => {
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
        <ThemedText type={ThemedTextType.Subtitle}>
            Share Christ
        </ThemedText>
    );
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristContainer);
