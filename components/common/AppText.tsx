import React from 'react';
import { Text, type TextProps, StyleSheet, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export enum TextType {
  Default = 'default',
  Title = 'title',
  DefaultSemiBold = 'defaultSemiBold',
  Subtitle = 'subtitle',
  Subtitle2 = 'subtitle2',
  Link = 'link',
  Prefix = 'prefix',
  Body = 'body',
  BodyBold = 'boldBold',
  Italic = 'italic'
};

export type IAppText = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TextType;
};

export function AppText({
  style,
  lightColor,
  darkColor,
  type = TextType.Default,
  ...rest
}: IAppText) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { fontFamily: 'LeagueSpartan' },
        { color },
        { flexShrink: 1 },
        type === TextType.Default ? styles.default : undefined,
        type === TextType.Title ? styles.title : undefined,
        type === TextType.DefaultSemiBold ? styles.defaultSemiBold : undefined,
        type === TextType.Subtitle ? styles.subtitle : undefined,
        type === TextType.Subtitle2 ? styles.subtitle2 : undefined,
        type === TextType.Link ? styles.link : undefined,
        type === TextType.Prefix ? styles.prefix : undefined,
        type === TextType.Body ? styles.body : undefined,
        type === TextType.BodyBold ? styles.bodyBold : undefined,
        type === TextType.Italic ? styles.italic : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 16,
  },
  defaultSemiBold: {
    fontSize: 18,
    lineHeight: 12,
    fontWeight: '700',
    color: Colors.light.primary
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'LeagueSpartanBold'
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'LeagueSpartanBold'
  },
  subtitle2: {
    fontSize: 18,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  prefix: {
    fontSize: 14,
    color: '#5b5b5b',
    fontStyle: 'italic'
  },
  body: {
    fontSize: 14,
    fontFamily: 'LeagueSpartanLight'
  },
  bodyBold: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  italic: {
    fontSize: 14,
    fontStyle: 'italic'
  },
});
