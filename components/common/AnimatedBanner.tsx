import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { flexStyles, gridStyles } from '@/styles/Styles';
import { ThemedView } from './ThemedView';
import { AppIcon } from '@/enums/enums';
import { PageColumn } from './PageColumn';
import { PageRow } from './PageRow';
import { Colors } from '@/constants/Colors';

export type IAnimatedBanner = {
    iconSrc: AppIcon | null;
    prefixText?: string | null;
    text: string;
    onClick?: Function;
    bannerDuration?: number;
    bannerDelay?: number;
    textDuration?: number;
    textDelay?: number;
}

export function AnimatedBanner({ iconSrc = null, prefixText = null, text, onClick,
    bannerDuration = 200, bannerDelay = 0, textDuration = 200, textDelay = 400
}: IAnimatedBanner) {
    const onPress = (e) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    return (
        <Animated.View entering={FadeInDown.duration(bannerDuration).delay(bannerDelay)}>
            <TouchableOpacity onPress={onPress}>
                <ThemedView style={[styles.container]}>
                    <PageRow>
                        {
                            iconSrc && (
                                <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                            )
                        }
                        <PageColumn>
                            <Animated.Text
                                entering={FadeInUp.duration(textDuration).delay(textDelay)}
                                exiting={FadeOutDown.duration(textDuration)}
                                style={[styles.textContainer]}>
                                <AppText type={TextType.Default}>
                                    {text}
                                </AppText>
                            </Animated.Text>

                            {
                                prefixText && (
                                    <PageRow style={{ flexShrink: 1, width: 350 }}>
                                        <Animated.Text
                                            entering={FadeInUp.duration(textDuration).delay(textDelay - 50)}
                                            exiting={FadeOutDown.duration(textDuration)}
                                            style={[styles.textContainer]} >
                                        <AppText type={TextType.Prefix}>
                                            {prefixText}
                                        </AppText>
                                        </Animated.Text>
                                    </PageRow>
                                )
                            }
                        </PageColumn>
                    </PageRow>
                </ThemedView>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 12,
        padding: 8,
        gap: 8,
        backgroundColor: Colors.white,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 4,
    },
    icon: {
        width: 32,
        height: 32,
        marginEnd: 8,
        alignSelf: 'center',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
});