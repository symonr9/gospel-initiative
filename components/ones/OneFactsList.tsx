
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { ThemedText, ThemedTextType } from '../common/ThemedText';

export type IOneFactsList = ViewProps & {
    one: One;

    // Redux
    oneFacts: OneFact[];
};

function OneFactsList({ oneFacts, one }: IOneFactsList) {

    console.log(oneFacts);
    console.log(one);

    const renderItem = ({ item }: { item: OneFact }) => (
        <View style={styles.factView}>
            <ThemedText type={ThemedTextType.Default}>
                {item.notes}
            </ThemedText>
        </View>
    );

    return (
        <View style={styles.container}>
            <ThemedText type={ThemedTextType.Subtitle}>
                Fun Facts
            </ThemedText>,
            <FlatList
                data={oneFacts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#B1E68C',
        padding: 12,
        minHeight: 200,
        overflow: 'scroll',
    },
    factView: {

    },
});

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.oneFacts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OneFactsList);