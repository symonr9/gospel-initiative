import React, { useEffect, useState } from 'react';
import { Animated, GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { formStyles } from '@/styles/Styles';
import { ShareChristPageState } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';

export type IBeaconsListHeader = ViewProps & {
    shareChristPageState: ShareChristPageState;
    onlyActive: boolean;
}

export function BeaconsListHeader({ shareChristPageState, onlyActive,
    style = {},
}: IBeaconsListHeader) {
    const [bgColor, setBgColor] = useState(new Animated.Value(0));

    const shouldConfirm = shareChristPageState == ShareChristPageState.SendBeacon;

    useEffect(() => {
        Animated.timing(bgColor, {
            toValue: shouldConfirm ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [shouldConfirm]);

    const interpolatedBgColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', 'lightgreen']
    });

    const getTitle = () => {
        if (shouldConfirm) {
            return 'Send Beacon Confirmation';
        } else if (onlyActive) {
            return 'Active Beacons';
        }

        return 'Prayer Beacons';
    }

    const getDetails = () => {
        if (shouldConfirm) {
            return 'Are you sure you want to send this beacon?';
        } else if (onlyActive) {
            return '';
        }
        return 'Use beacons to ask for prayer from your church community.';
    }

    return (
        <Animated.View style={[formStyles.header, { backgroundColor: interpolatedBgColor }, style]}>
            <AppText type={TextType.DefaultSemiBold}>
                {getTitle()}
            </AppText>
            <AppText type={TextType.Default}>
                {getDetails()}
            </AppText>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: 'whitesmoke',
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
        flexShrink: 1, // Prevent children from overflowing,
        marginBottom: 4,
    },
    icon: {
        width: 38,
        height: 38,
        marginBottom: 12,
    },
});