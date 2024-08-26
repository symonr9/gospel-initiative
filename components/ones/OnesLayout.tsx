
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import One from '@/models/one';
import OneFactsList from './OneFactsList';
import ActionStepsList from './ActionStepsList';
import OnesLayoutHeader from './OnesLayoutHeader';
import { ShareChristPageState } from '@/enums/enums';
import { ThemedView } from '../common/ThemedView';

export type IOnesLayout = ViewProps & {
    selectedOne: One,
    shareChristPageState: ShareChristPageState,
    ones: One[],
};

function OnesLayout({ selectedOne, shareChristPageState, ones }: IOnesLayout) {
    if (!selectedOne) {
        return (
            <ThemedText type={ThemedTextType.Subtitle}>
                No One found, add!
            </ThemedText>
        );
    }

    return (
        <>
            <OnesLayoutHeader />

            <ThemedView style={styles.container}>
                <ActionStepsList />
                <OneFactsList />
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    }
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
    ones: state.ones.ones,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);