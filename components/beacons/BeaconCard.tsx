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
import { mapBeaconTypeToAppIcon } from '@/utils/appUtils';

export type IBeaconCard = {
    beacon: any;
    one: any;
    user: any;
    activities: BeaconActivity[];
    idx: number;
    activeBeaconId: string | null;
    selectedIdx: number | null;
    setActiveBeaconId: Function;
};

export function BeaconCard({ beacon, one, user, activities,
    activeBeaconId, idx, selectedIdx, setActiveBeaconId }: IBeaconCard) {
    const progress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['#FFF', 'lightgreen']
        );

        const opacity = selectedIdx === -1 || selectedIdx === idx
            ? withTiming(1, { duration: 250 })
            : withTiming(0.5, { duration: 250 });

        return {
            backgroundColor,
            opacity,
        };
    });

    useEffect(() => {
        if (selectedIdx !== -1 && idx === selectedIdx) {
            progress.value = withTiming(1, { duration: 250 });
        } else if (idx !== selectedIdx) {
            progress.value = withTiming(0, { duration: 250 });
        }
    }, [selectedIdx]);

    const onPress = () => {
        setActiveBeaconId(beacon.id === activeBeaconId ? null : beacon.id);
    };

    return (
        <TouchableOpacity onPress={onPress} style={styles.touchable}>
            <Animated.View 
                entering={ZoomIn}
                exiting={ZoomOut.duration(250)}
                style={[styles.iconContainer, animatedStyle]}
            >
                <Image source={mapBeaconTypeToAppIcon(beacon.type)} 
                       style={styles.icon} 
                       contentFit="contain" />
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        marginVertical: 8,
        flexDirection: 'row',
        marginEnd: 8
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
        width: 36,
        height: 36,
    },
});
