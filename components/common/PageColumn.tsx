
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';

export type IPageColumn = ViewProps & {
    spaceBetween?: boolean,
};

export function PageColumn({ spaceBetween, style, children }: IPageColumn) {
    return (
        <View style={[
            styles.rowContainer,
            spaceBetween && styles.spaceBetween,
            style
        ]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
});