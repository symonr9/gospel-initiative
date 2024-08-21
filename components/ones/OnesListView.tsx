import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, ViewProps } from 'react-native';

import One from '@/models/one';

import { OneCardView } from './OneCardView';
import { ThemedView } from '../common/ThemedView';
import { ThemedText, ThemedTextType } from '../common/ThemedText';

export type IOnesListView = ViewProps & {
    ones: One[];
};

function OnesListView({ ones }: IOnesListView) {
    const renderItem = ({ item }: { item: One }) => (
        <OneCardView one={item} />
    );

    return (
        <ThemedView style={styles.container}>
            <ThemedText type={ThemedTextType.Subtitle}>
                Your Ones ({ones.length})
            </ThemedText>
            <FlatList
                data={ones}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#B1E68C',
        padding: 16,
        height: 250,
        overflow: 'scroll',        
    },
});

const mapStateToProps = (state: any) => ({
    ones: state.ones.ones
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesListView);
