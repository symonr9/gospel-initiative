
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, ViewProps, StyleSheet } from 'react-native';
import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { AppIcon, Page, PrayerType, ShareChristPageState } from '@/enums/enums';
import NavigateToOnesButton from '../ones/NavigateToOnesButton';
import SimpleIconButton from '../common/SimpleIconButton';
import { openPage, setSelectedBeaconId, setShareChristPageState } from '@/redux/actions';
import NavigateToPrayersButton from '../beacons/NavigateToPrayersButton';

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
    if (page == Page.ShareChristOnes) {
        itemsToRender = getOnesListItems(pageState, setShareChristPageState, openPage, selectedBeaconId !== null, setSelectedBeaconId);
    } else if (page == Page.ShareChristPrayers) {
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
                }),
                getSendButton(() => {
                    setPageState(ShareChristPageState.SendPrayerBeacon);
                }),
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
    } else if (pageState == ShareChristPageState.SendPrayerBeacon) {
        return [
            getCancelButton(() => {
                setPageState(ShareChristPageState.PrayerBeacon);
            }),
            getConfirmButton(() => {
                setPageState(ShareChristPageState.ConfirmSendPrayerBeacon);
            })
        ];
    } else if (pageState == ShareChristPageState.ConfirmSendPrayerBeacon) {
        return [
            getBackButton(() => {
                setSelectedBeaconId(null);
                setPageState(ShareChristPageState.Default);
            }),
        ];
    } else if ([
        ShareChristPageState.AddPrayerBeacon,
        ShareChristPageState.EditPrayerBeacon
    ].includes(pageState)) { // Add/Edit Beacon
        return [
            getBackButton(() => {
                if (hasSelectedBeacon && setSelectedBeaconId && pageState == ShareChristPageState.AddPrayerBeacon) {
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

const getPrayersListItems = (selectedBeaconId: string | null, setPage: Function, setPageState: Function) => {

    return [
        // <SimpleIconButton iconSrc={AppIcon.ArrowBack}
        //     pageToOpen={Page.ShareChrist}
        //     title={'Back'} />,
    ];
}

const getDefaultItems = () => {
    return [
        <NavigateToPrayersButton typeToOpen={PrayerType.ForOne} />,
        <NavigateToOnesButton />
    ];
}

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

const getSendButton = (onClick: () => void) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Send}
            onClick={onClick}
            title={'Send'} />
    );
};

const getConfirmButton = (onClick: () => void) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Checkmark}
            onClick={onClick}
            title={'Confirm'} />
    );
};

const getCancelButton = (onClick: () => void) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Cancel}
            onClick={onClick}
            title={'Cancel'} />
    );
};


const mapStateToProps = (state: any) => ({
    selectedBeaconId: state.beacons.selectedBeaconId
});

const mapDispatchToProps = {
    setShareChristPageState,
    setSelectedBeaconId,
    openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristFooter);