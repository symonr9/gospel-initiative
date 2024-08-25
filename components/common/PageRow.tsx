
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';

export type IPageRow = ViewProps & {
    spaceBetween?: boolean
    flexStart?: boolean
};

export function PageRow({ spaceBetween, flexStart, children }: IPageRow) {
    return (
        <View style={[
            styles.rowContainer,
            spaceBetween && styles.spaceBetween,
            flexStart && styles.flexStart
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexStart: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        gap: 8,
    },
});