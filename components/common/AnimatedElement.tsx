import React, { useEffect, useRef } from 'react';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

type IAnimatedElement = {
    element: any;
    duration?: number;
    delay?: number;

    style?: any;
};

export function AnimatedElement({ element, duration = 400, delay = 0, style = {} }: IAnimatedElement) {
    return (
        <Animated.Text
            entering={FadeInUp.duration(duration).delay(delay)}
            exiting={FadeOutDown.duration(duration)}
            style={[style]} >
            {element}
        </Animated.Text>
    );
}
