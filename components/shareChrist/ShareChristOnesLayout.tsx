
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import One from '@/models/one';
import OneFactsList from '../ones/OneFactsList';
import ActionStepsList from '../ones/ActionStepsList';
import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { PageContainer } from '../common/PageContainer';
import { ActiveBeaconsInfoCard } from '../beacons/ActiveBeaconsInfoCard';
import { selectActiveBeaconsWithActivities } from '@/redux/selectors/beaconSelectors';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import SimpleIconButton from '../common/SimpleIconButton';
import { BeaconWithActivities } from '@/models/beacon';
import { ActiveBeaconsActivityCard } from '../beacons/ActiveBeaconsActivityCard';
import { setSelectedTemplateId, setShareChristPageState } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import BeaconTemplatesList from '../beacons/BeaconTemplatesList';

export type IShareChristOnesLayout = ViewProps & {
    selectedOne: One,
    ones: One[],
    activeBeaconsWithActivities: BeaconWithActivities[],
    setSelectedTemplateId: Function,
};

export enum OneLayoutType {
    Normal,
    AllBeaconTemplates,
    ConfirmBeacon,
    SavingBeaconForm,
    SentBeaconResponse,
}

function ShareChristOnesLayout({ selectedOne, ones, activeBeaconsWithActivities, setSelectedTemplateId }: IShareChristOnesLayout) {
    const [activeLayoutType, setActiveLayoutType] = useState(OneLayoutType.Normal);

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];
    if (!selectedOne) {
        return <></>;
    } else if (activeLayoutType === OneLayoutType.AllBeaconTemplates) {
        HeaderLayout.push(
            <PageRow spaceBetween>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
            </PageRow>
        );

        BodyLayout.push(
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                                 setActiveLayoutType={setActiveLayoutType}/>
        );
    } else if (activeLayoutType === OneLayoutType.ConfirmBeacon) {
        HeaderLayout.push(
            <PageRow spaceBetween>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.AllBeaconTemplates);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Checkmark}
                    onClick={() => setActiveLayoutType(OneLayoutType.SentBeaconResponse)}
                    title={'Confirm'} />
            </PageRow>
        );

        BodyLayout.push(
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                                 setActiveLayoutType={setActiveLayoutType}/>
        );
    } else if (activeLayoutType === OneLayoutType.SavingBeaconForm) {
        BodyLayout.push(
            <View>
                <PageResponse title={'Saving Beacon'}
                    details={'Please wait...'} />
            </View>
        );
    } else if (activeLayoutType === OneLayoutType.SentBeaconResponse) {
        HeaderLayout.push(
            <PageRow spaceBetween>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
            </PageRow>
        );

        BodyLayout.push(
            <View>
                <PageResponse title={'Beacon successful!'}
                    details={'Your church community is praying for you. Please check in later.'} />
            </View>
        );
    } else { // Normal
        HeaderLayout.push(
            <PageRow spaceBetween>
                <View></View>
                <SimpleIconButton iconSrc={AppIcon.Prayer}
                    onClick={() => setActiveLayoutType(OneLayoutType.AllBeaconTemplates)}
                    title={'New Beacon'} />
            </PageRow>
        );

        BodyLayout.push(
            <PageContainer>
                <PageColumn style={styles.container}>
                    <ActionStepsList />
                    <OneFactsList />
                </PageColumn>

                <PageRow spaceBetween style={{ marginTop: 16 }}>
                    <ActiveBeaconsInfoCard activeBeacons={activeBeaconsWithActivities} />
                    <ActiveBeaconsActivityCard activeBeaconsWithActivities={activeBeaconsWithActivities} />
                </PageRow>
            </PageContainer>
        );
    }

    return (
        <View style={styles.container}>
            {HeaderLayout.map((item) => item)}

            <PageRow flexStart>
                <SimpleIcon iconSrc={selectedOne.icon} large />
                <AnimatedHeader title={selectedOne.name}
                    style={{ alignItems: 'flex-start', marginStart: 8 }}
                    subtitle='Your One' />
            </PageRow>

            {BodyLayout.map((item) => item)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 16
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
    setSelectedTemplateId,
    setShareChristPageState
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristOnesLayout);