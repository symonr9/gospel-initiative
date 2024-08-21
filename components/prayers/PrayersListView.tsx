
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import { addPrayer } from '../../redux/actions';

import PageView from '@/components/common/PageView';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';
import Prayer, { generateRandomPrayer } from '@/models/prayer';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IPrayersListView = ViewProps & {
    prayers: Prayer[];
    addPrayer: (prayer: Prayer) => void;
};

function PrayersListView({ prayers, addPrayer }: IPrayersListView) {
    const backgroundColor = useBackgroundThemeColor();

    const handleAdd = () => {
        const newItem = generateRandomPrayer("user1", "one1");
        addPrayer(newItem);
    };

    const renderItem = ({ item }: { item: Prayer }) => (
        <div>{item.name}</div>
    );

    return (
        <ThemedView style={styles.container}>
            <ThemedText type={ThemedTextType.Subtitle}>
                Your Prayers ({prayers.length})
            </ThemedText>
            <button onClick={handleAdd}>Add Item</button>
            <FlatList
                data={prayers}
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
        backgroundColor: '#B1A60E',
        padding: 16,
        height: 250,
        overflow: 'scroll',        
    },
});

const mapStateToProps = (state: any) => ({
    prayers: state.prayers.prayers
});

const mapDispatchToProps = {
    addPrayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrayersListView);