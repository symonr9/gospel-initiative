import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText, ThemedTextType } from './ThemedText';

export type ISimpleIcon = {
    iconSrc: string | null;
    title?: string;
    large?: boolean;
}

export function SimpleIcon({ iconSrc = null, title = '', large }: ISimpleIcon) {
    const stylesToUse = large ? largeStyles : styles;

    return (
        <View style={stylesToUse.container}>
            <View style={stylesToUse.content}>
                <View style={stylesToUse.iconContainer}>
                    {iconSrc && (
                        <Image source={iconSrc} style={stylesToUse.icon} contentFit="contain" />
                    )}
                </View>
                <ThemedText type={ThemedTextType.Subtitle} style={stylesToUse.title}>
                    {title}
                </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {

    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8, // Space between the icon and the title
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    icon: {
        width: 42,
        height: 42,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
    },
});

const largeStyles = StyleSheet.create({
    ...styles,
    container: {
        ...styles.container,
        marginBottom: 16,
    },
    iconContainer: {
        ...styles.iconContainer,
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    icon: {
        ...styles.icon,
        width: 100,
        height: 100,
    },
    title: {
        ...styles.title,
        fontSize: 32,
    },
});
