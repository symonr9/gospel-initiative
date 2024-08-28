import React from 'react';

import { connect } from 'react-redux';

import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { AppIcon, Page } from '@/enums/enums';
import { openPage, setSelectedOne } from '@/redux/actions';
import SimpleIconButton from '../common/SimpleIconButton';

export type INavigateToOnesCard = ViewProps & {
    ones: One[],

    openPage: Function,
    setSelectedOne: Function
};

function NavigateToOnesButton({ ones, openPage, setSelectedOne }: INavigateToOnesCard) {
    const oneToLoad = ones.length > 0 ? ones[0] : null;
    const icon = oneToLoad ? oneToLoad.icon : AppIcon.Man1;
    
    const onClick = () => {
        setSelectedOne(oneToLoad);
        openPage(Page.OnesList);
    };

    return (
        <SimpleIconButton iconSrc={icon} 
                          title={'Ones'} 
                          onClick={onClick}/>
    );
}

const mapStateToProps = (state: any) => ({
    ones: state.ones.ones,
});

const mapDispatchToProps = {
    openPage,
    setSelectedOne,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigateToOnesButton);