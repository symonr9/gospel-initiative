import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    interpolateColor, 
    ZoomIn, 
    ZoomOut 
} from 'react-native-reanimated';

import BeaconActivity from '@/models/beaconActivity';
import { mapGlobalBeaconTypeToIcon } from "@/utils/iconUtils";
import { mapBeaconTypeToIcon } from "@/utils/iconUtils";
import { Colors } from '@/constants/Colors';

export type IBeaconCard = {
    beacon: any;
    idx: number;
    activeBeaconId: string | null;
    selectedIdx: number | null;
    setActiveBeaconId?: Function;
    onPress?: Function;
    useAnimations?: boolean;
};

export function BeaconCard({ beacon, activeBeaconId, idx, selectedIdx, setActiveBeaconId, onPress,
    useAnimations = true }: IBeaconCard) {
    const progress = useSharedValue(0);

    const baseColor = beacon.global ? Colors.info : Colors.white;
    const completedColor = beacon.global ? Colors.success : Colors.success;

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [baseColor, completedColor]
        );

        return {
            backgroundColor,
        };
    });

    useEffect(() => {
        if (selectedIdx !== -1 && idx === selectedIdx) {
            progress.value = withTiming(1, { duration: 250 });
        } else if (idx !== selectedIdx) {
            progress.value = withTiming(0, { duration: 250 });
        }
    }, [selectedIdx]);

    const onCardPress = () => {
        if (setActiveBeaconId) {
            setActiveBeaconId(beacon.id === activeBeaconId ? null : beacon.id);
        }
        if (onPress) {
            onPress();
        }
    };

    const icon = beacon.global ? mapGlobalBeaconTypeToIcon(beacon.type) : mapBeaconTypeToIcon(beacon.type);

    return (
        <TouchableOpacity onPress={onCardPress} style={styles.touchable}>
            <Animated.View 
                entering={ZoomIn}
                exiting={ZoomOut.duration(250)}
                style={[styles.iconContainer, useAnimations && animatedStyle]}>
                <Image source={icon} 
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
        marginEnd: 12
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 40,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
        zIndex: 0,
    },
    icon: {
        width: 28,
        height: 28,
    },
});
