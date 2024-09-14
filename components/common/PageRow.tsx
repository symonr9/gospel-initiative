
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';

export type IPageRow = ViewProps & {
    spaceBetween?: boolean;
    spaceEvenly?: boolean;
    flexStart?: boolean;
    fillSpace?: boolean;
    center?: boolean;
};

export function PageRow({ spaceBetween, spaceEvenly, flexStart, fillSpace, center, style, children }: IPageRow) {
    return (
        <View style={[
            styles.rowContainer,
            spaceBetween && styles.spaceBetween,
            spaceEvenly && styles.spaceEvenly,
            flexStart && styles.flexStart,
            fillSpace && styles.fillSpace,
            center && styles.center,
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
    spaceEvenly: {
        justifyContent: 'space-evenly',
        flex: 1,
    },
    flexStart: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        gap: 8,
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    fillSpace: {
        
    }
});