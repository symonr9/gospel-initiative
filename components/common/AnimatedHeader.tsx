import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { ThemedText, ThemedTextType } from './ThemedText';

type IAnimatedHeader = {
    title: string;
    duration?: number;
    delay?: number;

    style?: any;
};

export function AnimatedHeader({ title, duration = 400, delay = 0, style = {} }: IAnimatedHeader) {

    return (
        <Animated.Text
            entering={FadeInUp.duration(duration).delay(delay)}
            exiting={FadeOutDown.duration(duration).delay(delay)}
            style={[]} >
            <ThemedText type={ThemedTextType.Title}>
                {title}
            </ThemedText>
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
});
