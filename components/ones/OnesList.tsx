import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, ViewProps } from 'react-native';

import One from '@/models/one';

import { OneCard } from './OneCard';
import { ThemedView } from '../common/ThemedView';
import { AppText, TextType } from '../common/AppText';

export type IOnesList = ViewProps & {
    ones: One[];
};

function OnesList({ ones }: IOnesList) {
    const renderItem = ({ item }: { item: One }) => (
        <OneCard one={item} />
    );

    return (
        <ThemedView style={styles.container}>
            <AppText type={TextType.Subtitle}>
                Your Ones ({ones.length})
            </AppText>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnesList);
