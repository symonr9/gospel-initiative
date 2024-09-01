import React, { useEffect, useState } from 'react';
import { Animated, GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { formStyles } from '@/styles/Styles';
import { ShareChristPageState } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';

export type IBeaconsListHeader = ViewProps & {
    selectedTemplateId: string | null;
    shareChristPageState: ShareChristPageState;
}

export function BeaconsListHeader({ shareChristPageState, selectedTemplateId, style = {} }: IBeaconsListHeader) {

    const shouldConfirm = shareChristPageState == ShareChristPageState.SendBeacon;

    const getTitle = () => {
        if (shouldConfirm) {
            return 'Send Beacon Confirmation';
        } else if (selectedTemplateId !== null) {
            return 'Edit Beacon Settings';
        }
        return 'Prayer Beacons';
    }

    const getDetails = () => {
        if (shouldConfirm) {
            return 'Are you sure you want to send this beacon?';
        } else if (selectedTemplateId !== null) {
            return 'Make changes to your beacon before continuing.';
        }
        return 'Use beacons to ask for prayer from your church community.';
    }

    return (
        <Animated.View style={[styles.container, style]}>
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
        flexDirection: 'column',
        padding: 8,
        flexShrink: 1, // Prevent children from overflowing,
        marginBottom: 64,
    },
    icon: {
        width: 38,
        height: 38,
        marginBottom: 12,
    },
});