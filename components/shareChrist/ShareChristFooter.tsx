
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, ViewProps } from 'react-native';
import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import NavigateToOnesButton from '../ones/NavigateToOnesButton';
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
    if (page == Page.ShareChristOnes) {
        itemsToRender = getOnesListItems(pageState, setShareChristPageState, openPage, selectedBeaconId !== null, setSelectedBeaconId);
    } else if (page == Page.ShareChristPrayers) {
        itemsToRender = getPrayersListItems(selectedBeaconId, openPage, setShareChristPageState);
    } else {
        itemsToRender = getDefaultItems(openPage);
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
    } else if (pageState == ShareChristPageState.Beacon) {
        if (hasSelectedBeacon) { // View Selected Beacon
            return [
                getBackButton(() => {
                    setSelectedBeaconId(null);
                }),
                getEditButton(() => {
                    setPageState(ShareChristPageState.EditBeacon);
                }),
                getSendButton(() => {
                    setPageState(ShareChristPageState.SendBeacon);
                }),
            ];
        } else { // View All Beacons
            return [
                getBackButton(() => {
                    onBackDefaultClick();
                }),
                getAddButton(() => {
                    setPageState(ShareChristPageState.AddBeacon);
                })
            ];
        }
    } else if (pageState == ShareChristPageState.SendBeacon) {
        return [
            getCancelButton(() => {
                setPageState(ShareChristPageState.Beacon);
            }),
            getConfirmButton(() => {
                setPageState(ShareChristPageState.ConfirmSendBeacon);
            })
        ];
    } else if (pageState == ShareChristPageState.ConfirmSendBeacon) {
        return [
            getBackButton(() => {
                setSelectedBeaconId(null);
                setPageState(ShareChristPageState.Default);
            }),
        ];
    } else if ([
        ShareChristPageState.AddBeacon,
        ShareChristPageState.EditBeacon
    ].includes(pageState)) { // Add/Edit Beacon
        return [
            getBackButton(() => {
                if (hasSelectedBeacon && setSelectedBeaconId && pageState == ShareChristPageState.AddBeacon) {
                    setSelectedBeaconId(null);
                }
                setPageState(ShareChristPageState.Beacon);
            }),
            getSaveButton(() => {
                setPageState(ShareChristPageState.SaveBeacon);
            })
        ];
    } else if ([
        ShareChristPageState.SaveBeacon
    ].includes(pageState)) { // Saving...
        return [];
    }

    return [
        getBackButton(onBackDefaultClick),
        getEditButton(() => {
            setPageState(ShareChristPageState.Edit);
        }),
        getBeaconButton(setPageState),
    ];
};

const getPrayersListItems = (selectedBeaconId: string | null, setPage: Function, setPageState: Function) => {
    return [];
}

const getDefaultItems = (openPage: Function) => {
    return [
        <SimpleIconButton iconSrc={AppIcon.Prayer}
            onClick={() => openPage(Page.ShareChristPrayers)}
            title={'Pray'} />,
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

const getBeaconButton = (setPageState: Function) => {
    return (
        <SimpleIconButton iconSrc={AppIcon.Prayer}
            onClick={() => setPageState(ShareChristPageState.Beacon)}
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