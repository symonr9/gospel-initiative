
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { ShareChristPageState } from '@/enums/enums';
import PageResponse from '../common/PageResponse';
import BeaconTemplatesList from './BeaconTemplatesList';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';
import { SimpleIcon } from '../common/SimpleIcon';
import One from '@/models/one';

export type IBeaconLayout = ViewProps & {
    selectedOne: One;
    shareChristPageState: ShareChristPageState;
};

function BeaconLayout({ selectedOne, shareChristPageState }: IBeaconLayout) {
    const Layout: any[] = [];
    if (shareChristPageState == ShareChristPageState.SavingBeaconForm) {
        Layout.push(
            <View>
                <PageResponse title={'Saving Beacon'} 
                              details={'Please wait...'}/>
            </View>
        );
    } else if (shareChristPageState == ShareChristPageState.SentBeaconResponse) {
        Layout.push(
            <View>
                <PageResponse title={'Beacon successful!'} 
                              details={'Your church community is praying for you. Please check in later.'}/>
            </View>
        );
    } else { // View All, View One, Send Beacon
        Layout.push(<BeaconTemplatesList/>);
    }

    return (
        <>
            <PageRow flexStart>
                <SimpleIcon iconSrc={selectedOne.icon} large />
                <AnimatedHeader title={selectedOne.name}
                                style={{ alignItems: 'flex-start', marginStart: 8 }}
                                subtitle='Your One'/>
            </PageRow>
            {Layout.map((item) => item)}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconLayout);