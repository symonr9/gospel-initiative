import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewProps } from 'react-native';

export type IAnimatedPageRow = ViewProps & {
  itemsToRender: React.ReactNode[];
};

export function AnimatedPageColumn({ itemsToRender }: IAnimatedPageRow) {
  const animations = useRef(itemsToRender.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animationsArray = animations.map((anim, index) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 100, // Stagger the animations
        useNativeDriver: true,
      });
    });

    Animated.stagger(100, animationsArray).start();
  }, [animations]);

  return (
    <View style={styles.rowContainer}>
      {itemsToRender.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.card,
            {
              opacity: animations[index],
              transform: [
                {
                  translateY: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0]
                  }),
                },
                {
                  scale: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1], // Scale up
                  }),
                },
              ],
            },
          ]}
        >
          {item}
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    marginHorizontal: 10, // Space between the cards
    // Add other card-specific styling here
  },
});