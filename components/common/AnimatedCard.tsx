import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';

import Animated, { FadeInUp, FadeInDown, FadeOutDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { AppText, TextType } from './AppText';
import { AppIcon, FadeDirection } from '@/enums/enums';
import { PageColumn } from './PageColumn';
import { Image } from 'expo-image';

type IAnimatedCard = {
  text: any;
  label?: string | undefined;
  label2?: string | undefined;
  customStyle?: any;
  duration?: number;
  delay?: number;
  icon?: AppIcon;
  direction?: FadeDirection;
};

export function AnimatedCard({ text, icon, label = undefined, label2 = undefined,
  duration = 400, delay = 0, direction = FadeDirection.Down, customStyle = {} }: IAnimatedCard) {

  const animation = (() => {
    if (direction === FadeDirection.Up) return FadeInUp;
    else if (direction === FadeDirection.Left) return FadeInLeft;
    else if (direction === FadeDirection.Right) return FadeInRight;
    return FadeInDown;
  })();

  return (
    <Animated.View entering={animation.duration(duration).delay(delay)} 
                   style={[styles.container, customStyle.container]}>
        {
          icon && (
            <Image source={icon} style={[styles.icon, customStyle.icon]}/>
          )
        }
        <PageColumn>
          <AppText type={TextType.BodyBold} style={[styles.textLabel, customStyle.textLabel]}>{text}</AppText>
          {
            label && (
              <AppText type={TextType.Body} style={[customStyle.label]}>{label}</AppText>
            )
          }
          {
            label2 && (
              <AppText type={TextType.Body} style={[customStyle.label2]}>{label2}</AppText>
            )
          }
        </PageColumn>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  textLabel: {
    fontSize: 18
  },
  icon: {
    height: 28,
    width: 28,
    alignSelf: 'center',
    marginEnd: 8,
  }
});
