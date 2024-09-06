import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import OneFact from '@/models/oneFact';

export type IOneFactCard = ViewProps & {
    oneFact: OneFact;
};

export function OneFactCard({ oneFact }: IOneFactCard) {
    return (
        <View style={styles.container}>
            <Image source={oneFact.icon} style={styles.icon} />
            <AppText type={TextType.Default}>
                {oneFact.notes}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
});