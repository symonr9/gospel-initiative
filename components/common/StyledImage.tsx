import React from 'react';
import { View, StyleSheet, ViewProps, GestureResponderEvent, TouchableOpacity, ImageProps } from 'react-native';
import { Image } from 'expo-image';

import { AppIcon, AvatarIcon } from '@/enums/enums';
import { useThemeColors } from '@/constants/Colors';

export type ISimpleStyle = ImageProps & {
    iconSrc: AppIcon | AvatarIcon | null;
    onClick?: Function;
    useTextTint?: boolean;
}

const styles = StyleSheet.create({
});

export function StyledImage({ iconSrc = null, onClick, style, useTextTint = true }: ISimpleStyle) {
    const themeColors = useThemeColors();
    const { textColor } = themeColors;

    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={iconSrc}
                style={[style, useTextTint && { tintColor: textColor }]}
                contentFit="contain" />
        </TouchableOpacity>
    );
}