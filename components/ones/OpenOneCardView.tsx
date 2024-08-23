import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { SimpleCardView } from '../common/SimpleCardView';
import { AppIcon, Page } from '@/enums/enums';
import { openPage } from '@/redux/actions';

export type IOneCardView = ViewProps & {
    ones: One[],
    page: Page,

    openPage: (page: Page) => void;
};

function OpenOneCardView({ ones, page, openPage }: IOneCardView) {
    const oneToLoad = ones.length > 0 ? ones[0] : null;
    const icon = oneToLoad ? oneToLoad.icon : AppIcon.Man1;

    const handleClick = () => {
        openPage(Page.OnesList);
    };
    
    return (
        <SimpleCardView iconSrc={icon}
                        onClick={handleClick}
                        title={'Ones'} />
    );
}

const mapStateToProps = (state: any) => ({
    ones: state.ones.ones,
    page: state.app.page,
});

const mapDispatchToProps = {
    openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenOneCardView);