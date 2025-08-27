
import React, { useState, useEffect, useCallback } from 'react';

import { View, ViewProps, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import One from '@/models/one';
import { AppIcon, RefreshSpec } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import { setOneForm, setSelectedOneId, setAppError, refreshData, setActiveOnesLayoutType, setActiveOnesLayoutNormalBodyType } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import User from '@/models/user';
import { getSelectedOne } from '@/utils/appUtils';
import OneForm from '@/models/oneForm';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ScrollLayout from '../common/ScrollLayout';
import Beacon from '@/models/beacon';
import { OnesLayoutFirstTime } from './layout/OnesLayoutFirstTime';
import { OnesLayoutAddingOne } from './layout/OnesLayoutAddingOne';
import { OnesLayoutEditingOne } from './layout/OnesLayoutEditingOne';
import { OnesLayoutAllOnes } from './layout/OnesLayoutAllOnes';
import { OnesLayoutNormal, OnesLayoutNormalBodyType } from './layout/OnesLayoutNormal';
import LoadingLayout from '../common/LoadingLayout';

export type IOnesLayout = ViewProps & {
    selectedOneId: string | null,
    ones: One[],
    oneBeacons: Beacon[],
    executor: User,
    oneForm: OneForm,
    setAppError: Function,
    refreshData: Function,
    setSelectedOneId: Function,
    dataRefreshLoading: boolean,
    activeOnesLayoutType: OneLayoutType,
    setActiveOnesLayoutType: Function
    activeOnesLayoutNormalBodyType: OnesLayoutNormalBodyType,
    setActiveOnesLayoutNormalBodyType: Function
};


export enum OneLayoutType {
    Normal,
    FirstTime,
    AddingOne,
    EditingOne,
    AllOnes,
    ConfirmBeacon,
    SentBeaconResponse,
    Loading,
}

function OnesLayout({ selectedOneId, ones, oneForm, executor, activeOnesLayoutType, setActiveOnesLayoutType,
    setAppError, oneBeacons, refreshData, setSelectedOneId, dataRefreshLoading, activeOnesLayoutNormalBodyType,
    setActiveOnesLayoutNormalBodyType }: IOnesLayout) {

    const selectedOne = getSelectedOne(selectedOneId, ones);

    const [message, setMessage] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const BodyLayout: any[] = [];

    useEffect(() => {
        if (!executor) {
            return;
        }
        revertToInitialLayoutType();
    }, [executor]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refreshData(RefreshSpec.All);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const revertToInitialLayoutType = () => {
        setRefreshing(false);
        setActiveOnesLayoutType(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    };

    if (dataRefreshLoading) {
        BodyLayout.push(
            <LoadingLayout />
        );
    } else if (activeOnesLayoutType === OneLayoutType.FirstTime) {
        BodyLayout.push(
            <OnesLayoutFirstTime setMessage={setMessage} setActiveLayoutType={setActiveOnesLayoutType} />
        );
    } else if (activeOnesLayoutType === OneLayoutType.AddingOne) {
        BodyLayout.push(
            <OnesLayoutAddingOne oneForm={oneForm}
                setAppError={setAppError}
                executor={executor}
                refreshData={refreshData}
                setMessage={setMessage}
                setOneForm={setOneForm}
                setSelectedOneId={setSelectedOneId}
                revertToInitialLayoutType={revertToInitialLayoutType} />
        );
    } else if (activeOnesLayoutType === OneLayoutType.EditingOne) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'}
                    title={'Something went wrong'} />
            );
        }

        BodyLayout.push(
            <OnesLayoutEditingOne oneForm={oneForm}
                setAppError={setAppError}
                executor={executor}
                ones={ones}
                refreshData={refreshData}
                setMessage={setMessage}
                setOneForm={setOneForm}
                setSelectedOneId={setSelectedOneId}
                revertToInitialLayoutType={revertToInitialLayoutType}
                selectedOne={selectedOne} />
        );
    } else if (activeOnesLayoutType === OneLayoutType.AllOnes) {
        BodyLayout.push(
            <OnesLayoutAllOnes setMessage={setMessage}
                setActiveLayoutType={setActiveOnesLayoutType}
                revertToInitialLayoutType={revertToInitialLayoutType} />
        );
    } else if (activeOnesLayoutType === OneLayoutType.Loading) {
        BodyLayout.push(
            <LoadingLayout />
        );
    } else { // Normal
        BodyLayout.push(
            <OnesLayoutNormal selectedOneId={selectedOneId}
                selectedOne={selectedOne}
                ones={ones}
                setAppError={setAppError}
                executor={executor}
                oneBeacons={oneBeacons}
                refreshData={refreshData}
                setMessage={setMessage}
                setOneForm={setOneForm}
                setSelectedOneId={setSelectedOneId}
                setActiveLayoutType={setActiveOnesLayoutType}
                activeOnesLayoutNormalBodyType={activeOnesLayoutNormalBodyType}
                setActiveOnesLayoutNormalBodyType={setActiveOnesLayoutNormalBodyType}
                styles={styles}
                revertToInitialLayoutType={revertToInitialLayoutType} />
        );
    }

    const showYourSelectedOne = ![OneLayoutType.AddingOne, OneLayoutType.EditingOne, OneLayoutType.AllOnes].includes(activeOnesLayoutType) && selectedOne;

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.container}>
                {
                    message && (
                        <AnimatedBanner iconSrc={AppIcon.Info} text={message} onClick={() => setMessage(null)} />
                    )
                }

                <PageColumn>
                    {
                        showYourSelectedOne && (
                            <PageRow spaceBetween>
                                <PageColumn style={{ gap: 12 }}>
                                    <PageRow>
                                        <SimpleIcon iconSrc={selectedOne.icon} large removeBackground={false} />
                                        <AnimatedHeader title={selectedOne.name}
                                            style={{ alignItems: 'flex-start', marginStart: 8 }}
                                            subtitle='Your One' />
                                    </PageRow>
                                </PageColumn>
                            </PageRow>
                        )
                    }
                </PageColumn>

                <PageColumn>
                    {BodyLayout.map((item) => item)}
                </PageColumn>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
});

const mapStateToProps = (state: any) => {
    const executor = state.users.executor;
    const selectedOneId = state.ones.selectedOneId;
    const oneBeacons = selectedOneId ? state.beacons.activeBeacons.filter((beacon: any) => {
        return beacon.oneId === selectedOneId
    }) : [];
    return {
        selectedOneId,
        oneBeacons,
        ones: state.ones.ones,
        executor,
        oneForm: state.ones.oneForm,
        dataRefreshLoading: state.app.dataRefreshLoading,
        activeOnesLayoutType: state.app.activeOnesLayoutType,
        activeOnesLayoutNormalBodyType: state.app.activeOnesLayoutNormalBodyType,
    };
};

const mapDispatchToProps = {
    setSelectedOneId,
    refreshData,
    setAppError,
    setActiveOnesLayoutType,
    setActiveOnesLayoutNormalBodyType
};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);