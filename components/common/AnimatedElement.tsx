import { FadeDirection } from '@/enums/enums';
import React, { useEffect, useRef } from 'react';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp, FadeOutDown } from 'react-native-reanimated';

type IAnimatedElement = {
    element: any;
    duration?: number;
    delay?: number;
    direction?: FadeDirection;

    style?: any;
};

export function AnimatedElement({ element, duration = 400, delay = 0, direction = FadeDirection.Down, style = {} }: IAnimatedElement) {
    const animation = (() => {
        if (direction === FadeDirection.Up) return FadeInUp;
        else if (direction === FadeDirection.Left) return FadeInLeft;
        else if (direction === FadeDirection.Right) return FadeInRight;
        return FadeInDown;
      })();
    
    return (
        <Animated.Text
            entering={animation.duration(duration).delay(delay)}
            exiting={FadeOutDown.duration(duration)}
            style={[style]} >
            {element}
        </Animated.Text>
    );
}
