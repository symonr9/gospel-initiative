
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import One from '@/models/one';
import OneFactsList from './OneFactsList';
import ActionStepsList from './ActionStepsList';
import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { PageContainer } from '../common/PageContainer';
import { ActiveBeaconsInfoCard } from '../beacons/ActiveBeaconsInfoCard';
import { selectActiveBeaconsByOneId, selectActiveBeaconsWithActivities } from '@/redux/selectors/beaconSelectors';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import SimpleIconButton from '../common/SimpleIconButton';
import { BeaconWithActivities } from '@/models/beacon';
import { ActiveBeaconsActivityCard } from '../beacons/ActiveBeaconsActivityCard';

export type IOnesLayout = ViewProps & {
    selectedOne: One,
    shareChristPageState: ShareChristPageState,
    ones: One[],
    activeBeaconsWithActivities: BeaconWithActivities[]
};

function OnesLayout({ selectedOne, shareChristPageState, ones, activeBeaconsWithActivities }: IOnesLayout) {        
    if (!selectedOne) {
        return (
            <AppText type={TextType.Subtitle}>
                No One found, add!
            </AppText>
        );
    }

    return (
        <>
        <PageRow>
            <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                        pageToOpen={Page.ShareChrist}
                        customStyles={{
                            container: {
                                alignSelf: 'flex-start',
                                marginBottom: 16
                            }
                        }}/>
        </PageRow>
            <PageRow flexStart>
                <SimpleIcon iconSrc={selectedOne.icon} large />
                <AnimatedHeader title={selectedOne.name}
                                style={{ alignItems: 'flex-start', marginStart: 8 }}
                                subtitle='Your One'/>
            </PageRow>

            <PageContainer>
                <PageColumn style={styles.container}>
                    <ActionStepsList />
                    <OneFactsList />
                </PageColumn>

                <PageRow spaceBetween style={{ marginTop: 16}}>
                    <ActiveBeaconsInfoCard activeBeacons={activeBeaconsWithActivities} />
                    <ActiveBeaconsActivityCard activeBeaconsWithActivities={activeBeaconsWithActivities}/>
                </PageRow>
            </PageContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
    }
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    const activeBeaconsWithActivities = selectedOne ? useSelector(selectActiveBeaconsWithActivities(selectedOne.id)) : [];
    return {
        selectedOne,
        shareChristPageState: state.app.shareChristPageState,
        ones: state.ones.ones,
        activeBeaconsWithActivities: activeBeaconsWithActivities,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);