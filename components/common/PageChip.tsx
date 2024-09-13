import React from 'react';
import { GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { AppIcon } from '@/enums/enums';

export type IPageTag = ViewProps & {
    iconSrc: AppIcon | null;
    title: string;
    onClick?: Function;
}

export function PageChip({ iconSrc = null, title,
    onClick, style
}: IPageTag) {
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
                <AppText type={TextType.DefaultSemiBold}>{title}</AppText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'lightgray',
        borderRadius: 4,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
        marginTop: 4,
        marginBottom: 4,
    },
    icon: {
        width: 24,
        height: 24,
        alignSelf: 'center',
        marginEnd: 4,
    },
});