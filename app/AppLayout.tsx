import React, { useEffect } from 'react';
import { ColorSchemeProvider } from '../contexts/ColorSchemeContext';
import { connect } from 'react-redux';
import { setStatusBarStyle } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Alert, TouchableOpacity, LogBox, View, useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { clearAllLocalStorage } from '@/utils/storageUtils';
import { AppIcon, NewUserStep, RefreshSpec } from '@/enums/enums';
import { clearAllData, refreshData, setNewUserStep } from '@/redux/actions';
import User from '@/models/user';

LogBox.ignoreAllLogs(true);

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export type IAppLayout = {
    executor: User,
    clearAllData: Function,
};


function AppLayout({ executor, clearAllData }: IAppLayout) {
    const colorScheme = useColorScheme() || 'light';
    const [loaded] = useFonts({
        LeagueSpartanLight: require('../assets/fonts/LeagueSpartan-Light.ttf'),
        LeagueSpartan: require('../assets/fonts/LeagueSpartan-Regular.ttf'),
        LeagueSpartanBold: require('../assets/fonts/LeagueSpartan-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
            setStatusBarStyle("dark");
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const showMenuOptions = () => {
        Alert.alert(
            'Options',
            'Choose an option:',
            [
                { text: 'Reset All', onPress: confirmResetAll },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    const confirmResetAll = () => {
        Alert.alert(
            'Are you sure?',
            'Are you sure you want to clear all your data? You will lose all your progress.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'Yes, I am sure', onPress: confirmFinalReset },
            ],
            { cancelable: true }
        );
    };

    const confirmFinalReset = () => {
        Alert.alert(
            'Are you really sure?',
            'This action cannot be undone. Please confirm that you want to proceed.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes, delete all', onPress: async () => {
                        await clearAllLocalStorage();
                        clearAllData();
                    }
                },
            ],
            { cancelable: true }
        );
    };

    const MenuTitle = (
        <View>
            <Image source={AppIcon.GospelInitiativeTransparent} style={{
                width: 200,
                height: 50,
            }} />
        </View>

    );

    const MenuIcon = (
        <TouchableOpacity onPress={showMenuOptions}>
            <Ionicons name="ellipsis-vertical" size={24} color={Colors.white} />
        </TouchableOpacity>
    );

    return (
        <ColorSchemeProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack
                    screenOptions={{
                        headerTitle: () => MenuTitle,
                        headerRight: () => MenuIcon,
                        headerStyle: {
                            backgroundColor: Colors[colorScheme].primary,
                        },
                        headerTintColor: Colors[colorScheme].text,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: Colors[colorScheme].text,
                        },
                    }}>
                    <Stack.Screen name="(tabs)" options={{}} />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </ThemeProvider>
        </ColorSchemeProvider>
    );
}

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
    };
};

const mapDispatchToProps = {
    clearAllData
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);