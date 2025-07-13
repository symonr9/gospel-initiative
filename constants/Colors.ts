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
 * Khaki (2): #f8f5e0
 */

export const Colors = {
  appLogo: '#a8543a',
  sharpGood: '#134f5c',
  success: '#8FBC8F',
  error: '#B22222',
  selected: '#7D7D7D',
  info: '#999999',
  open: '#AAAAAA',
  white: '#fff',
  forestGreen: '#6aa84f',
  red: '#e06666',
  light: {
    text: '#333',
    header: '#7D7D7D',
    alternateText: '#ffffff',
    background: '#ffffff',
    primary: '#abceea',
    secondary: '#cde0e4',
    darkAlternative: '#6eaadb'
  },
  dark: {
    text: '#f5f5f5',
    header: '#7D7D7D',
    alternateText: '#222222',
    background: '#1a2327',
    primary: '#3a5c6e',
    secondary: '#22343c',
    darkAlternative: '#0e1a1f'
  },
};

export const useThemeColors = () => {
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  const headerColor = useThemeColor(
    { light: Colors.light.header, dark: Colors.dark.header },
    "header"
  );
  const alternateTextColor = useThemeColor(
    { light: Colors.light.alternateText, dark: Colors.dark.alternateText },
    "alternateText"
  );
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const primaryColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.primary },
    "primary"
  );
  const secondaryColor = useThemeColor(
    { light: Colors.light.secondary, dark: Colors.dark.secondary },
    "secondary"
  );
  const darkAlternativeColor = useThemeColor(
    { light: Colors.light.darkAlternative, dark: Colors.dark.darkAlternative },
    "darkAlternative"
  );

  return {
    textColor,
    headerColor,
    alternateTextColor,
    backgroundColor,
    primaryColor,
    secondaryColor,
    darkAlternativeColor,
  };
};