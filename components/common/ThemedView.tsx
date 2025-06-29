import React from 'react';
import { View, type ViewProps } from 'react-native';
import { useThemeColors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { backgroundColor } = useThemeColors();

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
