
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

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

function PrayersListView({ style, prayers, addPrayer, ...otherProps }: IPrayersListView) {
    const backgroundColor = useBackgroundThemeColor();

    const handleAdd = () => {
        const newItem = generateRandomPrayer("user1", "one1");
        addPrayer(newItem);
    };

    const renderItem = ({ item }: { item: Prayer }) => (
        <div>{item.name}</div>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>

            <button onClick={handleAdd}>Add Item</button>

            <FlatList
                data={prayers}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: IPrayersListView) => ({
    prayers: state.prayers
});


const mapDispatchToProps = {
    addPrayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrayersListView);