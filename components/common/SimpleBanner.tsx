import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { ThemedText, ThemedTextType } from './ThemedText';
import { flexStyles } from '@/styles/Styles';
import { ThemedView } from './ThemedView';

export type ISimpleBanner = {
    iconSrc: string | null;
    prefixText?: string | null;
    text: string;
    onClick?: Function;
    bannerDuration?: number;
    bannerDelay?: number;
    textDuration?: number;
    textDelay?: number;
}

export function SimpleBanner({ iconSrc = null, prefixText = null, text, onClick,
    bannerDuration = 200, bannerDelay = 0, textDuration = 200, textDelay = 400
 }: ISimpleBanner) {
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
                            <Animated.Text
                                entering={FadeInUp.duration(textDuration).delay(textDelay)}
                                exiting={FadeOutDown.duration(textDuration)}
                                style={[styles.textContainer]} >
                                {
                                    prefixText && (
                                        <ThemedText type={ThemedTextType.Prefix}>
                                            {prefixText}
                                        </ThemedText>
                                    )
                                }
                                <ThemedText type={ThemedTextType.Default}>
                                    {text}
                                </ThemedText>
                            </Animated.Text>
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
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#d9ead3',
        borderRadius: 4,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        marginTop: 12,
        marginBottom: 12
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