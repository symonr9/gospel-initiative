
import {  ReachWorldPageState } from '@/enums/enums';
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ReachWorldHomeLayout from './ReachWorldHomeLayout';

export type IReachWorldContainer = ViewProps & {
    pageState: ReachWorldPageState;
}

function ReachWorldContainer({ pageState }: IReachWorldContainer) {

    return (
        <ReachWorldHomeLayout/>
    );
}

const mapStateToProps = (state: any) => ({
    pageState: state.app.reachWorldPageState
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ReachWorldContainer);
