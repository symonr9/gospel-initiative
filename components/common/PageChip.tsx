import React from 'react';
import { GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { AppIcon } from '@/enums/enums';

export type IPageTag = ViewProps & {
    iconSrc?: AppIcon | null;
    title: string;
    small?: boolean;
    onClick?: Function;
}

export function PageChip({ iconSrc = null, title,
    small = false, onClick, style
}: IPageTag) {
    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    const textType = small ? TextType.Body : TextType.DefaultSemiBold;

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={[styles.container, small && styles.smallContainer, style]}>
                {
                    iconSrc && (
                        <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                    )
                }
                <AppText type={textType}>{title}</AppText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fbfbfb',
        borderRadius: 4,
        padding: 2,
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        margin: 4,
    },
    smallContainer: {
        backgroundColor: '#fbfbfb',
        shadowRadius: 2,
        elevation: 2,
    },
    icon: {
        width: 24,
        height: 24,
        alignSelf: 'center',
        marginEnd: 4,
    },
});