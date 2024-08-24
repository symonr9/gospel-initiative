
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, ViewProps, StyleSheet } from 'react-native';
import { AnimatedPageRow } from '../common/AnimatedPageRow';
import { AppIcon, Page, PrayerType, ShareChristPageState } from '@/enums/enums';
import NavigateToOnesCard from '../ones/NavigateToOnesCard';
import NavigateToPrayersCard from '../prayers/NavigateToPrayersCard';
import SimpleIconButton from '../common/SimpleIconButton';
import { setShareChristPageState } from '@/redux/actions';

export type IShareChristFooter = ViewProps & {
    page: Page,
    pageState: ShareChristPageState,

    setShareChristPageState: Function
};


function ShareChristFooter({ page, 
    pageState, 
    setShareChristPageState }: IShareChristFooter) {

    return (
        <AnimatedPageRow itemsToRender={getItemsToRender(page, pageState, setShareChristPageState)} />
    );
}

const getItemsToRender = (page: Page, pageState: ShareChristPageState, setPageState: Function) => {
    if (page == Page.OnesList) {
        return getOnesListItems(pageState, setPageState);
    } else if (page == Page.PrayersList) {
        return getPrayersListItems();
    }

    return getDefaultItems();
}

const getOnesListItems = (pageState: ShareChristPageState, setPageState: Function) => {
    if (pageState == ShareChristPageState.Edit) {
        return [
            getBackButton(pageState, setPageState),
        ];
    } else if (pageState == ShareChristPageState.PrayerBeacon) {
        return [
            getBackButton(pageState, setPageState),
        ];
    }

    return [
        getBackButton(pageState, setPageState),
        getPrayerBeaconButton(setPageState),
        getEditButton(setPageState),
    ];
};

const getBackButton = (pageState: ShareChristPageState, setPageState: Function) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            pageToOpen={pageState === ShareChristPageState.Default ? Page.ShareChrist : undefined}
            onClick={() => {
                if (pageState == ShareChristPageState.Default) {
                    return;
                }
                setPageState(ShareChristPageState.Default);
            }}
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

const getEditButton = (setPageState: Function) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Edit}
            onClick={() => setPageState(ShareChristPageState.Edit)}
            title={'Edit'} />
    );
}

const getPrayersListItems = () => {
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

});

const mapDispatchToProps = {
  setShareChristPageState
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristFooter);