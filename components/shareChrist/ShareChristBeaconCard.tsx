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

export type IShareChristBeaconCard = {
    prayerBeacon: any;
    one: any;
    user: any;
    idx: number;
    selectedIdx: number | null;
    setSelectedIdx: Function;
};

export function ShareChristBeaconCard({ prayerBeacon, one, user, idx, selectedIdx, setSelectedIdx }: IShareChristBeaconCard) {
    const progress = useSharedValue(0);
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);
    const [showDialog, setShowDialog] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['#FFF', 'lightgreen']
        );

        return {
            backgroundColor,
            transform: [
                { scale: scale.value },
                { translateY: translateY.value },
            ],
        };
    });

    useEffect(() => {
        if (selectedIdx !== null && idx === selectedIdx) {
            // Animate background color first
            progress.value = withTiming(1, { duration: 250 }, () => {
                // Once background color animation is done, animate scale and position
                scale.value = withTiming(1.5, { duration: 250 });
                translateY.value = withTiming(-50, { duration: 250 }, () => {
                    setShowDialog(true); // Show dialog after animation
                });
            });
        } else if (idx !== selectedIdx) {
            // Animate scale and position back to normal
            scale.value = withTiming(1, { duration: 250 });
            translateY.value = withTiming(0, { duration: 250 }, () => {
                setShowDialog(false); // Hide dialog when not selected
                progress.value = withTiming(0, { duration: 250 });
            });
        }
    }, [selectedIdx]);

    const onPress = () => {
        setSelectedIdx(selectedIdx === idx ? null : idx);
    };

    // Determine the position of the dialog based on idx (left or right)
    const dialogPosition = idx % 2 === 0 ? 'right' : 'left';

    return (
        <TouchableOpacity onPress={onPress} style={styles.touchable}>
            <Animated.View 
                entering={ZoomIn}
                exiting={ZoomOut.duration(250)}
                style={[styles.iconContainer, animatedStyle]}
            >
                <Image source={AppIcon.Man1} style={styles.icon} contentFit="contain" />
            </Animated.View>
            {showDialog && (
                <Animated.View 
                    style={[
                        styles.dialog, 
                        dialogPosition === 'right' ? styles.dialogRight : styles.dialogLeft
                    ]}
                    entering={ZoomIn.duration(300)}
                >
                    <Text style={styles.dialogTitle}>Beacon Info</Text>
                    <Text style={styles.dialogText}>Type: {prayerBeacon.type}</Text>
                    <Text style={styles.dialogText}>One: {one?.name}</Text>
                    <Text style={styles.dialogText}>User: {user?.name}</Text>
                </Animated.View>
            )}
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
        width: 72,
        height: 72,
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
        width: 60,
        height: 60,
    },
    dialog: {
        position: 'absolute',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1000,
        width: 300,
    },
    dialogRight: {
        left: 80, // Position to the right of the icon
    },
    dialogLeft: {
        right: 80, // Position to the left of the icon
    },
    dialogTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    dialogText: {
        color: '#555',
    },
});
