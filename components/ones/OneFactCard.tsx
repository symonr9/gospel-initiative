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
            {oneFact.icon && (
                <Image source={oneFact.icon} style={styles.icon} />
            )}
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
        padding: 4,
        borderColor: 'gray',
        marginBottom: 4,
        borderWidth: 2,
        borderRadius: 4,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});