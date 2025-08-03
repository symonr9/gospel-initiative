import { setActiveOnesLayoutNormalBodyType, setActiveOnesLayoutType, setAppError, setIsSetupForNotifications, setSelectedPrayerId } from '@/redux/actions';
import React, { useEffect, useState, useRef } from 'react';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { NewUserStep, RefreshSpec } from '@/enums/enums';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AppText } from '@/components/common/AppText';
import { Platform, AppState } from 'react-native';
import { updatePushToken } from '@/requests/userRequests';
import User from '@/models/user';
import { OneLayoutType } from '@/components/ones/OnesLayout';
import { OnesLayoutNormalBodyType } from '@/components/ones/layout/OnesLayoutNormal';
import { useRouter } from 'expo-router';

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
    executor: User,
    activeOnesLayoutType: OneLayoutType,
    activeOnesLayoutNormalBodyType: OnesLayoutNormalBodyType,
    setActiveOnesLayoutType: Function,
    setActiveOnesLayoutNormalBodyType: Function,
    setSelectedPrayerId: Function,
};

function NotificationManager({ newUserStep, isSetupForNotifications, setAppError,
    setIsSetupForNotifications, executor, setActiveOnesLayoutType, setActiveOnesLayoutNormalBodyType,
    activeOnesLayoutType, activeOnesLayoutNormalBodyType, setSelectedPrayerId }: INotificationManager) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();
    const router = useRouter();


    useEffect(() => {
        if (newUserStep !== NewUserStep.Completed && !isSetupForNotifications)
            return;

        registerForPushNotificationsAsync()
            .then(token => setExpoPushToken(token ?? ''))
            .catch((error: any) => setExpoPushToken(`${error}`));


        console.log('NotificationManager mounted');

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const responseData = response?.notification?.request?.content?.data || null;

            if (responseData?.sendBeaconNotification || responseData?.morningEveningNotifications) {
                const beaconId = responseData?.beaconId;
                if (beaconId)
                    setSelectedPrayerId(beaconId);

                router.replace('/ones?tab=1');
            } else if (responseData?.sendPrayerNotification) {
                router.replace('/ones?tab=0');
                setActiveOnesLayoutType(OneLayoutType.Normal);
                setActiveOnesLayoutNormalBodyType(OnesLayoutNormalBodyType.Beacons);
            }
        });

        return () => {
            if (notificationListener.current)
                Notifications.removeNotificationSubscription(notificationListener.current);
            if (responseListener.current)
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [newUserStep]);

    useEffect(() => {
        if (!expoPushToken
            || newUserStep !== NewUserStep.Completed
            || !executor
            || isSetupForNotifications) {
            return;
        }

        const updateToken = async () => {
            const { error } = await updatePushToken(expoPushToken);
            if (error) {
                console.error('Failed to update push token:', error);
                return;
            }

            setIsSetupForNotifications();
        };

        updateToken();
    }, [expoPushToken, executor]);

    return <></>;
}

const mapStateToProps = (state: any) => ({
    newUserStep: state.app.newUserStep,
    isSetupForNotifications: state.users.isSetupForNotifications,
    executor: state.users.executor,
    activeOnesLayoutType: state.app.activeOnesLayoutType,
    activeOnesLayoutNormalBodyType: state.app.activeOnesLayoutNormalBodyType,
});

const mapDispatchToProps = {
    setAppError,
    setIsSetupForNotifications,
    setActiveOnesLayoutType,
    setActiveOnesLayoutNormalBodyType,
    setSelectedPrayerId
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);