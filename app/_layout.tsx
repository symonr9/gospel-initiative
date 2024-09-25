import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Ionicons } from '@expo/vector-icons';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Alert, Button, TouchableOpacity, LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

// Prevent the splash screen from auto-hiding before asset loading is complete.a
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
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  const MenuIcon = (
    <TouchableOpacity onPress={() => Alert.alert('Options', 'This is the ellipsis button')}>
      <Ionicons name="ellipsis-vertical" size={24} color={Colors.light.alternateText} />
    </TouchableOpacity>
  );

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerTitle: 'Gospel Initiative',
            headerRight: () => MenuIcon,
            headerStyle: {
              backgroundColor: Colors.light.primary,
            },
            headerTintColor: Colors.light.alternateText,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>

          <Stack.Screen name="(tabs)" options={{}} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
