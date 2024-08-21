import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, View, StyleSheet, ViewProps } from 'react-native';

import One from '@/models/one';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

import { OneCardView } from './OneCardView';

const onesData = require('../../data/ones.json');

export type IOnesListView = ViewProps & {

};

function OnesListView({ style, ...otherProps }: IOnesListView) {
    const backgroundColor = useBackgroundThemeColor();

    const [ones, setOnes] = useState<One[]>([]);

    const renderItem = ({ item }: { item: One }) => (
        <OneCardView one={item} />
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={ones}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    ones: state.ones.ones
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesListView);
