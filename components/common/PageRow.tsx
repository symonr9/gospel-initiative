
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';

export type IPageRow = ViewProps & {
    spaceBetween?: boolean
};

export function PageRow({ spaceBetween, children }: IPageRow) {
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
        flexDirection: 'row',
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
});