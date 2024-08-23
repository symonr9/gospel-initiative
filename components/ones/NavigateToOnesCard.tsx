import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { AppIcon, Page } from '@/enums/enums';
import SimpleNavigateToCard from '../common/SimpleNavigateToCard';

export type INavigateToOnesCard = ViewProps & {
    ones: One[],
};

function NavigateToOnesCard({ ones }: INavigateToOnesCard) {
    const oneToLoad = ones.length > 0 ? ones[0] : null;
    const icon = oneToLoad ? oneToLoad.icon : AppIcon.Man1;

    return (
        <SimpleNavigateToCard iconSrc={icon} 
                       title={'Ones'} 
                       pageToOpen={Page.OnesList}/>
    );
}

const mapStateToProps = (state: any) => ({
    ones: state.ones.ones,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(NavigateToOnesCard);