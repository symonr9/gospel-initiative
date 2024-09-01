import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';

import Animated, { FadeInUp, FadeInDown, FadeOutDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { AppText, TextType } from './AppText';
import { FadeDirection } from '@/enums/enums';

type IAnimatedCountCard = {
  count: number;
  label?: string | undefined;
  style?: any;
  duration?: number;
  delay?: number;
  direction?: FadeDirection;
};

export function AnimatedCountCard({ count, label = undefined, duration = 400, delay = 0, direction = FadeDirection.Down, style = {} }: IAnimatedCountCard) {

  const animation = (() => {
    if (direction === FadeDirection.Up) return FadeInUp;
    else if (direction === FadeDirection.Left) return FadeInLeft;
    else if (direction === FadeDirection.Right) return FadeInRight;
    return FadeInDown;
  })();

  return (
    <Animated.View entering={animation.duration(duration).delay(delay)} style={[styles.container, style]}>
        <AppText type={TextType.BodyBold} style={styles.countText}>{count}</AppText>
        {
          label && (
            <AppText type={TextType.Body}>{label}</AppText>
          )
        }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 4,
    margin: 4,
  },
  countText: {
  },
});
