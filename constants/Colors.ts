/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { useThemeColor } from "@/hooks/useThemeColor";

export const Colors = {
  appLogo: '#a8543a',
  light: {
    // text: '#5d6065',
    text: '#333',
    alternateText: '#ffffff',
    // background: '#f2ecc2',
    background: '#ffffff',
    primary: '#5d6065',
    secondary: '#abceea',
    alternate1: '#5f715b',
    alternate2: '#674f43',
    white: '#eee',
    black: '#333'
  },
  dark: {
  },
};


export const useBackgroundThemeColor = () => useThemeColor({
  light: Colors.light.background,
  dark: Colors.dark.background
}, 'background');