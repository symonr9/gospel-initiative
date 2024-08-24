
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { AnimatedPageRow } from '../common/AnimatedPageRow';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { AnimatedPageColumn } from '../common/AnimatedPageColumn';

export type IShareChristContainer = ViewProps & {

};

export function ShareChristContainer({ }: IShareChristContainer) {

    return (
        <AnimatedPageColumn itemsToRender={getItemsToRender()}></AnimatedPageColumn>
    );
}

const getItemsToRender = () => {
    return [
        <ThemedText type={ThemedTextType.Subtitle}>
            Share Christ
        </ThemedText>,
        <AnimatedPageRow itemsToRender={[
            <ThemedText type={ThemedTextType.Default}>
                Text Goes here
            </ThemedText>,
            <ThemedText type={ThemedTextType.Default}>
                Text Goes here
            </ThemedText>
        ]} />
    ];
}