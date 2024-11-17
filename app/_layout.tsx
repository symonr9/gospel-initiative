import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { setStatusBarStyle } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Alert, TouchableOpacity, LogBox, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { clearAll } from '@/utils/storageUtils';
import { SimpleIcon } from '@/components/common/SimpleIcon';
import { AppIcon } from '@/enums/enums';

LogBox.ignoreAllLogs(true);

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
        { text: 'Settings', onPress: () => console.log('Settings pressed') },
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
        { text: 'Yes, delete all', onPress: async () => {
          await clearAll();
        }},
      ],
      { cancelable: true }
    );
  };

  const MenuTitle = (
    <View>
      <Image source={AppIcon.GospelInitiativeTransparent} style={{
        width: 180,
        height: 50,
      }}/>
    </View>

  );

  const MenuIcon = (
    <TouchableOpacity onPress={showMenuOptions}>
      <Ionicons name="ellipsis-vertical" size={24} color={Colors.light.text} />
    </TouchableOpacity>
  );

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerTitle: () => MenuTitle,
            headerRight: () => MenuIcon,
            headerStyle: {
              backgroundColor: Colors.light.primary,
            },
            headerTintColor: Colors.light.text,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: Colors.light.text,
            },
          }}>
          <Stack.Screen name="(tabs)" options={{}} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}