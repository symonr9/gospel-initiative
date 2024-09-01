
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, ViewProps } from 'react-native';
import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import NavigateToOnesButton from '../ones/NavigateToOnesButton';
import SimpleIconButton from '../common/SimpleIconButton';
import { openPage, setSelectedTemplateId, setShareChristPageState } from '@/redux/actions';

export type IShareChristFooter = ViewProps & {
    page: Page;
    pageState: ShareChristPageState;
    selectedTemplateId: string | null;

    openPage: Function;
    setSelectedTemplateId: Function;
    setShareChristPageState: Function;
};


function ShareChristFooter({ page, pageState, selectedTemplateId, setSelectedTemplateId, openPage, setShareChristPageState }: IShareChristFooter) {

    let itemsToRender;
    if (page == Page.ShareChristOnes) {
        itemsToRender = getOnesListItems(pageState, setShareChristPageState, openPage, selectedTemplateId !== null, setSelectedTemplateId);
    } else if (page == Page.ShareChristPrayers) {
        itemsToRender = getPrayersListItems(selectedTemplateId, openPage, setShareChristPageState);
    } else {
        itemsToRender = getDefaultItems(openPage);
    }

    return (
        <AnimatedPageSection itemsToRender={itemsToRender} />
    );
}


const getOnesListItems = (pageState: ShareChristPageState, setPageState: Function,
    openPage: Function, hasSelectedBeacon: boolean, setSelectedTemplateId: Function
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
                    setSelectedTemplateId(null);
                }),
                getSendButton(() => {
                    setPageState(ShareChristPageState.SendBeacon);
                }),
            ];
        } else { // View All Beacons
            return [
                getBackButton(() => {
                    onBackDefaultClick();
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
                setSelectedTemplateId(null);
                setPageState(ShareChristPageState.Default);
                openPage(Page.ShareChrist);
            }),
        ];
    } else if ([
        ShareChristPageState.AddBeacon,
        ShareChristPageState.EditBeacon
    ].includes(pageState)) { // Add/Edit Beacon
        return [
            getBackButton(() => {
                if (hasSelectedBeacon && setSelectedTemplateId && pageState == ShareChristPageState.AddBeacon) {
                    setSelectedTemplateId(null);
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
        getEditButton(() => {
            setPageState(ShareChristPageState.Edit);
        }),
        getBeaconButton(setPageState),
    ];
};

const getPrayersListItems = (selectedTemplateId: string | null, setPage: Function, setPageState: Function) => {
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
            title={'Send New Beacon'} />
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
    selectedTemplateId: state.beacons.selectedTemplateId
});

const mapDispatchToProps = {
    setShareChristPageState,
    setSelectedTemplateId,
    openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristFooter);