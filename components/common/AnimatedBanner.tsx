import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { flexStyles } from '@/styles/Styles';
import { ThemedView } from './ThemedView';
import { AppIcon } from '@/enums/enums';
import { PageColumn } from './PageColumn';

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
                <ThemedView style={styles.container}>
                    <View style={flexStyles.row}>
                        {
                            iconSrc && (
                                <Image source={iconSrc} style={styles.icon} contentFit="contain" />
                            )
                        }
                        <View style={flexStyles.column}>
                            <PageColumn>
                                <Animated.Text
                                    entering={FadeInUp.duration(textDuration).delay(textDelay - 50)}
                                    exiting={FadeOutDown.duration(textDuration)}
                                    style={[styles.textContainer]} >
                                    {
                                        prefixText && (
                                            <AppText type={TextType.Prefix}>
                                                {prefixText}
                                            </AppText>
                                        )
                                    }
                                </Animated.Text>

                                <Animated.Text
                                    entering={FadeInUp.duration(textDuration).delay(textDelay)}
                                    exiting={FadeOutDown.duration(textDuration)}
                                    style={[styles.textContainer]} >
                                    <AppText type={TextType.Default}>
                                        {text}
                                    </AppText>
                                </Animated.Text>
                            </PageColumn>
                        </View>
                    </View>
                </ThemedView>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#d9ead3',
        borderRadius: 4,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        marginVertical: 6
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