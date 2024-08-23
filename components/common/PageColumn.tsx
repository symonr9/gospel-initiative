
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';

export type IPageColumn = ViewProps & {
    spaceBetween?: boolean
};

export function PageColumn({ spaceBetween, children }: IPageColumn) {
    return (
        <View style={[
            styles.rowContainer,
            spaceBetween && styles.spaceBetween,
        ]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
});