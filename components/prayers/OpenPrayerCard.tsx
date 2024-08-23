import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import { SimpleCard } from '../common/SimpleCard';
import { AppIcon, Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';
import Prayer from '@/models/prayer';

export type IOpenPrayerCard = ViewProps & {
    prayers: Prayer[],

    openPage: (page: Page) => void;
};

function OpenPrayerCard({ prayers, openPage }: IOpenPrayerCard) {
    const handleClick = () => {
        openPage(Page.PrayersList);
    };
    
    return (
        <SimpleCard iconSrc={AppIcon.Man1}
                        onClick={handleClick}
                        title={'Prayers'} />
    );
}

const mapStateToProps = (state: any) => ({
    prayers: state.ones.prayers,
});

const mapDispatchToProps = {
    openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenPrayerCard);