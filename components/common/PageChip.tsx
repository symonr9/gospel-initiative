import React from 'react';
import { GestureResponderEvent, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { AppIcon } from '@/enums/enums';
import { PageColumn } from './PageColumn';

export type IPageTag = ViewProps & {
    iconSrc?: AppIcon | null;
    title: string;
    subtitle?: string;
    small?: boolean;
    onClick?: Function;
}

export function PageChip({ iconSrc = null, title,
    subtitle, small = false, onClick, style }: IPageTag) {
    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    const textType = small ? TextType.Smol : TextType.Subtitle2;

    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedView style={[styles.container, small && styles.smallContainer, style]}>
                {
                    iconSrc && (
                        <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                    )
                }

                <PageColumn>
                    <AppText type={textType} style={{}}>{title}</AppText>
                    {
                        subtitle && (
                            <AppText type={TextType.Smol} style={{}}>{subtitle}</AppText>
                        )
                    }
                </PageColumn>
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
        paddingHorizontal: 4,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        margin: 4,
        minHeight: 20,
    },
    smallContainer: {
        backgroundColor: '#fbfbfb',
        elevation: 4,
    },
    icon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginEnd: 8,
    },
});