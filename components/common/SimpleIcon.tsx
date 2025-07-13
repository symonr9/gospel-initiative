import React from 'react';
import { View, StyleSheet, ViewProps, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from './AppText';
import { AppIcon, AvatarIcon } from '@/enums/enums';
import { StyledImage } from './StyledImage';

export type ISimpleIcon = ViewProps & {
    iconSrc: AppIcon | AvatarIcon | null;
    title?: string;
    small?: boolean;
    large?: boolean;
    removeBackground?: boolean;
    onClick?: Function;
}

export function SimpleIcon({ iconSrc = null, title = '', small, large, removeBackground = false, onClick, style }: ISimpleIcon) {
    const stylesToUse = large ? largeStyles : (small ? smallStyles : styles);

    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[stylesToUse.container, style]}>
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
        </TouchableOpacity>
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
        width: 64,
        height: 64,
        borderRadius: 60,
    },
    icon: {
        ...styles.icon,
        width: 54,
        height: 54,
    },
    title: {
        ...styles.title,
        fontSize: 32,
    },
});

const smallStyles = StyleSheet.create({
    ...styles,
    container: {
        ...styles.container,
    },
    iconContainer: {
        ...styles.iconContainer,
        width: 30,
        height: 30,
        borderRadius: 8,
    },
    icon: {
        ...styles.icon,
        width: 24,
        height: 24,
    },
    title: {
        ...styles.title,
        fontSize: 12,
    },
});