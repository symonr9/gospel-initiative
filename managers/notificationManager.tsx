import { setAppError, setIsSetupForNotifications } from '@/redux/actions';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { NewUserStep, RefreshSpec } from '@/enums/enums';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AppText } from '@/components/common/AppText';
import { Platform, AppState } from 'react-native';
import { updatePushToken } from '@/requests/userRequests';
import User from '@/models/user';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e: unknown) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}

export type INotificationManager = {
    newUserStep: NewUserStep,
    isSetupForNotifications: boolean,
    setAppError: Function,
    setIsSetupForNotifications: Function,
    executor: User
};

function NotificationManager({ newUserStep, isSetupForNotifications, setAppError,
    setIsSetupForNotifications, executor }: INotificationManager) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );

    useEffect(() => {
        if (newUserStep !== NewUserStep.Completed && !isSetupForNotifications)
            return;

        registerForPushNotificationsAsync()
            .then(token => setExpoPushToken(token ?? ''))
            .catch((error: any) => setExpoPushToken(`${error}`));

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, [newUserStep]);

    useEffect(() => {
        if (!expoPushToken
            || newUserStep !== NewUserStep.Completed
            || !executor
            || isSetupForNotifications)
            return;

        const updateToken = async () => {
            const { error } = await updatePushToken(expoPushToken);
            if (error) {
                console.error('Failed to update push token:', error);
                return;
            }

            console.log('Push token updated successfully:', expoPushToken);
            setIsSetupForNotifications();
        };

        updateToken();
    }, [expoPushToken]);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    newUserStep: state.app.newUserStep,
    isSetupForNotifications: state.users.isSetupForNotifications,
    executor: state.users.executor,
});

const mapDispatchToProps = {
    setAppError,
    setIsSetupForNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);