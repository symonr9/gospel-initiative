import React from 'react';
import { GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';

export type IPageSubHeader = ViewProps & {
    iconSrc?: string | null;
    title: string;
    onClick?: Function;
    style?: any;
}

export function PageSubHeader({ iconSrc = null, title,
    onClick, style = {},
}: IPageSubHeader) {
    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={[styles.container, style]}>
                {
                    iconSrc && (
                        <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                    )
                }
                <AppText type={TextType.Subtitle}>{title}</AppText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: 'whitesmoke',
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
        flexShrink: 1, // Prevent children from overflowing,
        marginBottom: 4,
    },
    icon: {
        width: 38,
        height: 38,
        marginBottom: 12,
    },
});