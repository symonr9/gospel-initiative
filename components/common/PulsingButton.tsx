import React from 'react';
import { ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SimpleButton, ButtonType } from './SimpleButton';

export type IPulsingButton = ViewProps & {
    type?: ButtonType;
    text: String;
    disabled?: boolean;
    onPress: Function;
};


const PulsingButton = ({ onPress, text, type = ButtonType.Edit, disabled }: IPulsingButton) => {
    const scale = useSharedValue(1);

    React.useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 800 }), // Expand
                withTiming(1, { duration: 800 }) // Shrink
            ),
            -1, // Infinite repetitions
            true // Reverse direction after each cycle
        );
    }, [scale]);

    // Apply animated style
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <SimpleButton type={type}
                text={text}
                onPress={onPress} />
        </Animated.View>
    );
};

export default PulsingButton;
