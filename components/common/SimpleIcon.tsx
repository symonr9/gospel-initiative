import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from './AppText';
import { AppIcon, AvatarIcon } from '@/enums/enums';

export type ISimpleIcon = {
    iconSrc: AppIcon | AvatarIcon | null;
    title?: string;
    large?: boolean;
    removeBackground?: boolean;
}

export function SimpleIcon({ iconSrc = null, title = '', large, removeBackground = false }: ISimpleIcon) {
    const stylesToUse = large ? largeStyles : styles;

    return (
        <View style={stylesToUse.container}>
            <View style={stylesToUse.content}>
                <View style={[stylesToUse.iconContainer,
                removeBackground && styles.iconContainerMinimal]}>
                    {iconSrc && (
                        <Image source={iconSrc} style={stylesToUse.icon} contentFit="contain" />
                    )}
                </View>
                <AppText type={TextType.Subtitle} style={stylesToUse.title}>
                    {title}
                </AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    iconContainerMinimal: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        shadowOpacity: 0,
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
    },
    iconContainer: {
        ...styles.iconContainer,
        width: 72,
        height: 72,
        borderRadius: 60,
    },
    icon: {
        ...styles.icon,
        width: 64,
        height: 64,
    },
    title: {
        ...styles.title,
        fontSize: 32,
    },
});
