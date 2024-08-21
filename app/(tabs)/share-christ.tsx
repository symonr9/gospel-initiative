
import React from 'react';

import { connect } from 'react-redux';
import { FlatList, Text, View, StyleSheet, ViewProps } from 'react-native';

import PageView from '@/components/common/PageView';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';
import OnesListView from '@/components/ones/OnesListView';
import PrayersListView from '@/components/prayers/PrayersListView';
import PageHeader from '@/components/common/PageHeader';

export type IShareChrist = ViewProps & {
    error: string
};

function ShareChrist({ error }: IShareChrist) {
    return (
        <PageView>
            <PageHeader title={"Share Christ"}/>
            <OnesListView />
            <PrayersListView/>
        </PageView>
    );
}

const mapStateToProps = (state: any) => ({
    error: state.errors.error,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);