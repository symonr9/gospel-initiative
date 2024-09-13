import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AppText, TextType } from './AppText';

const CIRCLE_SIZE = 50;
const STROKE_WIDTH = 5;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type IAnimatedCount = {
  count: number;
  label?: string | undefined;
  customStyles?: any;
  low?: number;
  medium?: number;
  high?: number;
};

// Create an animated version of the Svg.Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function AnimatedCount({ count, label = undefined, customStyles = {},
  low = 1, medium = 3, high = 5 }: IAnimatedCount) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateCircle = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ).start();
    };

    animateCircle();
  }, [animatedValue]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });


  const strokeColor = (() => {
    if (count >= high) {
      return 'lightgreen';
    } else if (count >= medium) {
      return 'lightyellow';
    } else if (count >= low) {
      return 'lightblue';
    }
    return 'lightgray';
  })();



  return (
    <View style={[styles.container, customStyles.container]}>
      <Svg height={CIRCLE_SIZE} width={CIRCLE_SIZE}>
        <Circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke="#ddd"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        <AnimatedCircle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <AppText type={TextType.DefaultSemiBold} style={[styles.countText, customStyles.countText]}>{count}</AppText>
      {
        label && (
          <AppText type={TextType.Italic}>{label}</AppText>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  countText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    top: 14
  },
});
