
import React from 'react';

import { connect } from 'react-redux';
import { FlatList, Text, View, StyleSheet, ViewProps } from 'react-native';

import PageView from '@/components/common/PageView';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';
import OnesListView from '@/components/ones/OnesListView';
import PrayersListView from '@/components/prayers/PrayersListView';

export type IShareChrist = ViewProps & {

};

function ShareChrist({ }: IShareChrist) {

    return (
        <PageView>
            <ThemedView style={tabStyles.titleContainer}>
                <ThemedText type={ThemedTextType.Title}>Share Christ</ThemedText>
            </ThemedView>

            <OnesListView />

            <PrayersListView/>
        </PageView>
    );
}

const mapStateToProps = (state: IShareChrist) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChrist);