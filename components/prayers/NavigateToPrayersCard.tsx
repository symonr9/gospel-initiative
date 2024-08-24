import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import { AppIcon, Page, PrayerType } from '@/enums/enums';
import Prayer from '@/models/prayer';
import { SimpleCard } from '../common/SimpleCard';
import { openPage, setActivePrayerType } from '@/redux/actions';

export type INavigateToPrayersCard = ViewProps & {
    typeToOpen: PrayerType,

    // Redux
    prayers: Prayer[],
    openPage: (page: Page) => void;
    setActivePrayerType: (type: PrayerType) => void;
};

function NavigateToPrayersCard({ typeToOpen, prayers,
    openPage, setActivePrayerType }: INavigateToPrayersCard) {

    const onClick = () => {
        setActivePrayerType(typeToOpen);
        openPage(Page.PrayersList);
    }

    return (
        <SimpleCard iconSrc={AppIcon.Man1}
            title={'Prayers'}
            onClick={onClick} />
    );
}

const mapStateToProps = (state: any) => ({
    prayers: state.prayers.prayers,
});

const mapDispatchToProps = {
    openPage,
    setActivePrayerType
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigateToPrayersCard);