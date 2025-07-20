import React, { } from 'react';
import { Animated, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';

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
        return 'Use beacons to share prayer requests with your community. Your beacon will be available to view for 24 hours by everyone with the app.';
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
        padding: 4,
    },
});