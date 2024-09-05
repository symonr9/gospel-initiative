
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { View, ViewProps } from 'react-native';
import { ReachWorldPageState } from '@/enums/enums';
import { setReachWorldPageState } from '@/redux/actions';
import { AnimatedPageSection } from '../common/AnimatedPageSection';

export type IReachWorldFooter = ViewProps & {
    pageState: ReachWorldPageState;

    setReachWorldPageState: Function;
};

function ReachWorldFooter({ pageState, setReachWorldPageState }: IReachWorldFooter) {

    return (
        <AnimatedPageSection itemsToRender={[]} />
    )
}

const mapStateToProps = (state: any) => ({
    pageState: state.app.reachWorldPageState,
});

const mapDispatchToProps = {
    setReachWorldPageState,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorldFooter);