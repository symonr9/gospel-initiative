import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';

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
                style={[{ marginStart: 4, marginTop: 8 }]} >
                <PageRow style={{ flexShrink : 1, maxWidth: 250 }}>
                    <AppText type={TextType.Subtitle}>
                        {title}
                    </AppText>
                </PageRow>
            </Animated.Text>
            {
                subtitle && (
                    <Animated.Text
                        entering={FadeInUp.duration(duration).delay(delay + 200)}
                        exiting={FadeOutDown.duration(duration)}
                        style={[{ marginStart: 4 }]} >
                        <AppText type={TextType.Body}>
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
        marginBottom: 4,
    },
});
