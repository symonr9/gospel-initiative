import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ThemedText, ThemedTextType } from './ThemedText';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = 60;
const STROKE_WIDTH = 7;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type IAnimatedCount = {
  count: number;
  label: string;
  style: any;
};

// Create an animated version of the Svg.Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function AnimatedCount({ count, label, style = {} }: IAnimatedCount) {
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

  return (
    <View style={[styles.container, style]}>
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
          stroke="#4CAF50"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <ThemedText type={ThemedTextType.DefaultSemiBold} style={styles.countText}>{count}</ThemedText>
      <ThemedText type={ThemedTextType.DefaultSemiBold}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
  },
  countText: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 25,
  },
  labelText: {
    marginTop: 10,
    fontSize: 18,
  },
});
