/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { useThemeColor } from "@/hooks/useThemeColor";

/**
 * Colors for reference:
 * 
 * Ocean blue: #84b2bd
 * Lighter Ocean blue: #cde0e4
 * Khaki: #f2ecc2
 */

export const Colors = {
  appLogo: '#a8543a',
  success: '#d9ead3',
  error: '#ff6666',
  selected: '#d0e0e3',
  white: '#fff',
  light: {
    text: '#333',
    alternateText: '#ffffff',
    background: '#cde0e4',
    primary: '#5d6065',
    secondary: '#abceea',
  },
  dark: {
    background: '#cde0e4'
  },
};


export const useBackgroundThemeColor = () => useThemeColor({
  light: Colors.light.background,
  dark: Colors.dark.background
}, 'background');