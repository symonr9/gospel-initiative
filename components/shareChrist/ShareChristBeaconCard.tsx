import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    interpolateColor, 
    ZoomIn, 
    ZoomOut 
} from 'react-native-reanimated';

import { AppIcon } from '@/enums/enums';
import BeaconActivity from '@/models/beaconActivity';

export type IShareChristBeaconCard = {
    beacon: any;
    one: any;
    user: any;
    activities: BeaconActivity[];
    idx: number;
    selectedIdx: number | null;
    setSelectedIdx: Function;
};

export function ShareChristBeaconCard({ beacon, one, user, activities,
    idx, selectedIdx, setSelectedIdx }: IShareChristBeaconCard) {
    const progress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['#FFF', 'lightgreen']
        );

        const opacity = selectedIdx === null || selectedIdx === idx
            ? withTiming(1, { duration: 250 })
            : withTiming(0.5, { duration: 250 });

        return {
            backgroundColor,
            opacity,
        };
    });

    useEffect(() => {
        if (selectedIdx !== null && idx === selectedIdx) {
            progress.value = withTiming(1, { duration: 250 });
        } else if (idx !== selectedIdx) {
            progress.value = withTiming(0, { duration: 250 });
        }
    }, [selectedIdx]);

    const onPress = () => {
        setSelectedIdx(selectedIdx === idx ? null : idx);
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.touchable}>
            <Animated.View 
                entering={ZoomIn}
                exiting={ZoomOut.duration(250)}
                style={[styles.iconContainer, animatedStyle]}
            >
                <Image source={user.icon} style={styles.icon} contentFit="contain" />
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        marginVertical: 8,
        flexDirection: 'row',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        zIndex: 0,
    },
    icon: {
        width: 48,
        height: 48,
    },
});
