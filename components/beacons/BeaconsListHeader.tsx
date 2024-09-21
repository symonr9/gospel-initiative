import React, { useEffect, useState } from 'react';
import { Animated, GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { AppText, TextType } from '../common/AppText';
import { OneLayoutType } from '../ones/OnesLayout';

export type IBeaconsListHeader = ViewProps & {
    selectedTemplateId: string | null;
    activeLayoutType: OneLayoutType;
}

export function BeaconsListHeader({ activeLayoutType, selectedTemplateId, style = {} }: IBeaconsListHeader) {
    const shouldConfirm = activeLayoutType == OneLayoutType.ConfirmBeacon;

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
            <AppText type={TextType.Subtitle}>
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
    },
});