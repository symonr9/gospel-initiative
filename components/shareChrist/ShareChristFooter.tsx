
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, ViewProps, StyleSheet } from 'react-native';
import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { AppIcon, Page, PrayerType, ShareChristPageState } from '@/enums/enums';
import NavigateToOnesCard from '../ones/NavigateToOnesCard';
import NavigateToPrayersCard from '../prayers/NavigateToPrayersCard';
import SimpleIconButton from '../common/SimpleIconButton';
import { openPage, setSelectedBeaconId, setShareChristPageState } from '@/redux/actions';

export type IShareChristFooter = ViewProps & {
    page: Page;
    pageState: ShareChristPageState;
    selectedBeaconId: string | null;

    openPage: Function;
    setSelectedBeaconId: Function;
    setShareChristPageState: Function;
};


function ShareChristFooter({ page, pageState, selectedBeaconId, setSelectedBeaconId, openPage, setShareChristPageState }: IShareChristFooter) {

    let itemsToRender;
    if (page == Page.OnesList) {
        itemsToRender = getOnesListItems(pageState, setShareChristPageState, openPage, selectedBeaconId !== null, setSelectedBeaconId);
    } else if (page == Page.PrayersList) {
        itemsToRender = getPrayersListItems(selectedBeaconId, openPage, setShareChristPageState);
    } else {
        itemsToRender = getDefaultItems();
    }

    return (
        <AnimatedPageSection itemsToRender={itemsToRender} />
    );
}


const getOnesListItems = (pageState: ShareChristPageState, setPageState: Function,
    openPage: Function, hasSelectedBeacon: boolean, setSelectedBeaconId: Function
) => {
    const onBackDefaultClick = () => {
        if (pageState == ShareChristPageState.Default) {
            openPage(Page.ShareChrist);
            return;
        }
        setPageState(ShareChristPageState.Default);
    };


    if (pageState == ShareChristPageState.Edit) {
        return [
            getBackButton(onBackDefaultClick),
        ];
    } else if (pageState == ShareChristPageState.PrayerBeacon) {
        if (hasSelectedBeacon) { // View Selected Beacon
            return [
                getBackButton(() => {
                    setSelectedBeaconId(null);
                }),
                getEditButton(() => {
                    setPageState(ShareChristPageState.EditPrayerBeacon);
                })
            ];
        } else { // View All Beacons
            return [
                getBackButton(() => {
                    onBackDefaultClick();
                }),
                getAddButton(() => {
                    setPageState(ShareChristPageState.AddPrayerBeacon);
                })
            ];
        }
    } else if ([
        ShareChristPageState.AddPrayerBeacon,
        ShareChristPageState.EditPrayerBeacon
    ].includes(pageState)) { // Add/Edit Beacon
        return [
            getBackButton(() => {
                if (hasSelectedBeacon && setSelectedBeaconId) {
                    setSelectedBeaconId(null);
                }
                setPageState(ShareChristPageState.PrayerBeacon);
            }),
            getSaveButton(() => {
                setPageState(ShareChristPageState.SavePrayerBeacon);
            })
        ];
    } else if ([
        ShareChristPageState.SavePrayerBeacon
    ].includes(pageState)) { // Saving...
        return [];
    }

    return [
        getBackButton(onBackDefaultClick),
        getPrayerBeaconButton(setPageState),
        getEditButton(() => {
            setPageState(ShareChristPageState.Edit);
        })
    ];
};

const getBackButton = (onClick: () => void) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            onClick={onClick}
            title={'Back'} />
    )
}

const getPrayerBeaconButton = (setPageState: Function) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Prayer}
            onClick={() => setPageState(ShareChristPageState.PrayerBeacon)}
            title={'Prayer Beacon'} />
    );
}

const getEditButton = (onClick: () => void) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Edit}
            onClick={onClick}
            title={'Edit'} />
    );
}

const getAddButton = (onClick: () => void) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Plus}
            onClick={onClick}
            title={'Add'} />
    );
}

const getSaveButton = (onClick: () => void) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Save}
            onClick={onClick}
            title={'Save'} />
    );
}

const getPrayersListItems = (selectedBeaconId: string | null, setPage: Function, setPageState: Function) => {

    return [
        <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            pageToOpen={Page.ShareChrist}
            title={'Back'} />,
    ];
}

const getDefaultItems = () => {
    return [
        <NavigateToPrayersCard typeToOpen={PrayerType.ForOne} />,
        <NavigateToOnesCard />
    ];
}

const mapStateToProps = (state: any) => ({
    selectedBeaconId: state.prayers.selectedBeaconId
});

const mapDispatchToProps = {
    setShareChristPageState,
    setSelectedBeaconId,
    openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristFooter);