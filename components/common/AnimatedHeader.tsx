import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';

type IAnimatedHeader = {
    title: string;
    subtitle?: string | null;
    duration?: number;
    delay?: number;

    style?: any;
};

export function AnimatedHeader({ title, subtitle = null, duration = 400, delay = 0, style = {} }: IAnimatedHeader) {

    return (
        <View style={[styles.container, style]}>
            <Animated.Text
                entering={FadeInUp.duration(duration).delay(delay)}
                exiting={FadeOutDown.duration(duration)}
                style={[]} >
                <AppText type={TextType.Title}>
                    {title}
                </AppText>
            </Animated.Text>
            {
                subtitle && (
                    <Animated.Text
                        entering={FadeInUp.duration(duration).delay(delay + 500)}
                        exiting={FadeOutDown.duration(duration)}
                        style={[]} >
                        <AppText type={TextType.Subtitle2}>
                            {subtitle}
                        </AppText>
                    </Animated.Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
});
