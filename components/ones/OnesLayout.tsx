
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import One from '@/models/one';
import OneFactsList from './OneFactsList';
import ActionStepsList from './ActionStepsList';
import OnesLayoutHeader from './OnesLayoutHeader';
import { ShareChristPageState } from '@/enums/enums';
import { ThemedView } from '../common/ThemedView';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { PageContainer } from '../common/PageContainer';
import { ActiveBeaconsInfoCard } from '../beacons/ActiveBeaconsInfoCard';
import { selectActiveBeaconsByOneId } from '@/redux/selectors';

export type IOnesLayout = ViewProps & {
    selectedOne: One,
    shareChristPageState: ShareChristPageState,
    ones: One[],
};

function OnesLayout({ selectedOne, shareChristPageState, ones }: IOnesLayout) {
    
    const prayerBeacons = useSelector(selectActiveBeaconsByOneId(selectedOne.id || ""));
    
    if (!selectedOne) {
        return (
            <AppText type={TextType.Subtitle}>
                No One found, add!
            </AppText>
        );
    }

    return (
        <>
            <OnesLayoutHeader />

            <PageContainer>
                <PageColumn style={styles.container}>
                    <ActionStepsList />
                    <OneFactsList />
                </PageColumn>

                <PageRow spaceBetween>
                    <ThemedView style={{ flex: 1 }}>
                        <AppText type={TextType.Subtitle}>
                            Test
                        </AppText>
                    </ThemedView>
                    <ActiveBeaconsInfoCard activeBeacons={prayerBeacons} />
                </PageRow>
            </PageContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    }
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
    ones: state.ones.ones,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);