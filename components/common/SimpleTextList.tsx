import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { AppText } from './AppText';

export type ISimpleTextList = ViewProps & {
    items: string[];
};

export function SimpleTextList({ items, style }: ISimpleTextList) {
    return (
        <View style={[styles.listContainer, style]}>
            {items.map((item, index) => (
                <AppText key={index} style={styles.listItem}>• {item}</AppText>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 8,
    },
    listItem: {
        fontSize: 16,
        paddingVertical: 4,
        marginStart: 8
    },
});
