import React from 'react';
import { Text, type TextProps, StyleSheet, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export enum ThemedTextType {
  Default = 'default',
  Title = 'title',
  DefaultSemiBold = 'defaultSemiBold',
  Subtitle = 'subtitle',
  Link = 'link'
};

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemedTextType;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = ThemedTextType.Default,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        { flexShrink: 1 },
        type === ThemedTextType.Default ? styles.default : undefined,
        type === ThemedTextType.Title ? styles.title : undefined,
        type === ThemedTextType.DefaultSemiBold ? styles.defaultSemiBold : undefined,
        type === ThemedTextType.Subtitle ? styles.subtitle : undefined,
        type === ThemedTextType.Link ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    flexShrink: 1,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
