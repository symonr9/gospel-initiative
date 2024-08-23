import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import { SimpleCardView } from '../common/SimpleCardView';
import { AppIcon, Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';
import Prayer from '@/models/prayer';

export type IPrayerCardView = ViewProps & {
    prayers: Prayer[],

    openPage: (page: Page) => void;
};

function OpenPrayerCardView({ prayers, openPage }: IPrayerCardView) {
    const handleClick = () => {
        openPage(Page.PrayersList);
    };
    
    return (
        <SimpleCardView iconSrc={AppIcon.Man1}
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenPrayerCardView);