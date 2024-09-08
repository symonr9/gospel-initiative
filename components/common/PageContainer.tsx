
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet, Dimensions } from 'react-native';

export type IPageContainer = ViewProps & {

};

export function PageContainer({ children }: IPageContainer) {
    return (
        <View style={[
            styles.container,
        ]}>
            {children}
        </View>
    );
}

const { height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
});