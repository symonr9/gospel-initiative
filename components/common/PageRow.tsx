
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';

export type IPageRow = ViewProps & {
    spaceBetween?: boolean;
    flexStart?: boolean;
    fillSpace?: boolean;
};

export function PageRow({ spaceBetween, flexStart, fillSpace, style, children }: IPageRow) {
    return (
        <View style={[
            styles.rowContainer,
            spaceBetween && styles.spaceBetween,
            flexStart && styles.flexStart,
            fillSpace && styles.fillSpace,
            style
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
    fillSpace: {
        
    }
});