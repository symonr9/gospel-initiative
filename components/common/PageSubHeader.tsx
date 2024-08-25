import React from 'react';
import { GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText, ThemedTextType } from './ThemedText';
import { ThemedView } from './ThemedView';

export type IPageSubHeader = ViewProps & {
    iconSrc?: string | null;
    title: string;
    onClick?: Function;
}

export function PageSubHeader({ iconSrc = null, title,
    onClick,
}: IPageSubHeader) {
    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={styles.container}>
                {
                    iconSrc && (
                        <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                    )
                }
                <ThemedText type={ThemedTextType.Subtitle}>{title}</ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'khaki',
        borderRadius: 4,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
        flexShrink: 1, // Prevent children from overflowing
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 12,
    },
});