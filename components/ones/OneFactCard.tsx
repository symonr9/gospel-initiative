import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import One from '@/models/one';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import Meeting from '@/models/meeting';
import OneFact from '@/models/oneFact';
import { AppIcon } from '@/enums/enums';

export type IOneFactCard = ViewProps & {
    oneFact: OneFact;
};

export function OneFactCard({ oneFact }: IOneFactCard) {
    return (
        <View style={styles.container}>
            <Image source={oneFact.icon} style={styles.icon} />
            <ThemedText type={ThemedTextType.DefaultSemiBold}>
                {oneFact.notes}
            </ThemedText>
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