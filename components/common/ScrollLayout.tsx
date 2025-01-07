import React from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, {
    useAnimatedRef,
} from 'react-native-reanimated';

type Props = ViewProps & PropsWithChildren<{
    horizontal?: boolean
}>;

export default function ScrollLayout({
    children,
    horizontal = false,
    style
}: Props) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    return (
        <Animated.ScrollView ref={scrollRef}
                             style={style}
                             horizontal={horizontal}
                             scrollEventThrottle={16}>
            {children}
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
});
