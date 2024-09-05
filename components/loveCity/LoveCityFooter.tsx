
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, ViewProps } from 'react-native';
import { LoveCityPageState } from '@/enums/enums';
import { setLoveCityPageState } from '@/redux/actions';
import { AnimatedPageSection } from '../common/AnimatedPageSection';

export type ILoveCityFooter = ViewProps & {
    pageState: LoveCityPageState;

    setLoveCityPageState: Function;
};

function LoveCityFooter({ pageState, setLoveCityPageState }: ILoveCityFooter) {

    return (
        <AnimatedPageSection itemsToRender={[]} />
    )
}

const mapStateToProps = (state: any) => ({
    pageState: state.app.loveCityPageState,
});

const mapDispatchToProps = {
    setLoveCityPageState,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCityFooter);