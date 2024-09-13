
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';

export type IPageColumn = ViewProps & {
    spaceBetween?: boolean,
    spaceEvenly?: boolean,
    center?: boolean,
};

export function PageColumn({ spaceBetween, spaceEvenly, center, style, children }: IPageColumn) {
    return (
        <View style={[
            styles.rowContainer,
            spaceBetween && styles.spaceBetween,
            spaceEvenly && styles.spaceEvenly,
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
        flexDirection: 'column'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    spaceEvenly: {
        justifyContent: 'space-evenly',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});