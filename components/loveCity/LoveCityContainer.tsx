
import { LoveCityPageState } from '@/enums/enums';
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LoveCityHomeLayout from './LoveCityHomeLayout';

export type ILoveCityContainer = ViewProps & {
    pageState: LoveCityPageState;
}

function LoveCityContainer({ pageState }: ILoveCityContainer) {

    return (
        <LoveCityHomeLayout/>
    );
}

const mapStateToProps = (state: any) => ({
    pageState: state.app.loveCityPageState
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCityContainer);

