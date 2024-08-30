import React, { useEffect, useState } from 'react';
import { Animated, GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { AnimatedCount } from '../common/AnimatedCount';
import Beacon from '@/models/beacon';

export type IActiveBeaconsInfoCard = ViewProps & {
    activeBeacons: Beacon[];
}

export function ActiveBeaconsInfoCard({ activeBeacons,
    style = {},
}: IActiveBeaconsInfoCard) {
    const [bgColor, setBgColor] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(bgColor, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, []);

    const interpolatedBgColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', 'whitesmoke']
    });

    const count = activeBeacons.length;
    if (count === 0) {
        return <></>;
    }

    const label = count === 1 ? 'Active Beacon' : 'Active Beacons';
    
    return (
        <AnimatedCount count={count} 
                       label={label}
                       style={styles.count}/>
    );
}

const styles = StyleSheet.create({
    count: {
        flex: 1,
        padding: 8,
        marginBottom: 4,
        marginTop: 8,
    },
    icon: {
        width: 38,
        height: 38,
        marginBottom: 12,
    },
});