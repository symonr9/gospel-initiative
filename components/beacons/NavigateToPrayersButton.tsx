import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import { AppIcon, Page, PrayerType } from '@/enums/enums';
import Prayer from '@/models/prayer';
import { openPage, setActivePrayerType } from '@/redux/actions';
import SimpleIconButton from '../common/SimpleIconButton';

export type INavigateToPrayersButton = ViewProps & {
    typeToOpen: PrayerType,

    // Redux
    prayers: Prayer[],
    openPage: (page: Page) => void;
    setActivePrayerType: (type: PrayerType) => void;
};

function NavigateToPrayersButton({ typeToOpen, prayers,
    openPage, setActivePrayerType }: INavigateToPrayersButton) {

    const onClick = () => {
        setActivePrayerType(typeToOpen);
        openPage(Page.ShareChristPrayers);
    }

    return (
        <SimpleIconButton iconSrc={AppIcon.Prayer}
                          title={'Prayers'}
                          onClick={onClick} />
    );
}

const mapStateToProps = (state: any) => ({
    prayers: state.beacons.prayers,
});

const mapDispatchToProps = {
    openPage,
    setActivePrayerType
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigateToPrayersButton);