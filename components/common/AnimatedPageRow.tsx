import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewProps } from 'react-native';

export type IAnimatedPageRow = ViewProps & {
  itemsToRender: React.ReactNode[];
};

export function AnimatedPageRow({ itemsToRender }: IAnimatedPageRow) {
  const [refresh, setRefresh] = useState(false); // State to trigger re-render
  const animations = useRef<Animated.Value[]>(itemsToRender.map(() => new Animated.Value(0)));

  // Reset animations when itemsToRender changes
  useEffect(() => {
    if (animations.current.length !== itemsToRender.length) {
      animations.current = itemsToRender.map(() => new Animated.Value(0));
    } else {
      // Reset animation values
      animations.current.forEach(anim => anim.setValue(0));
    }

    // Trigger animations after reset
    const animationsArray = animations.current.map((anim, index) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 100, // Stagger the animations
        useNativeDriver: true,
      });
    });

    Animated.stagger(100, animationsArray).start();

    return triggerRerender(setRefresh);
  }, [itemsToRender]);

  if (animations.current.length !== itemsToRender.length) {
    return <></>;
  }

  return (
    <View style={styles.rowContainer}>
      {itemsToRender.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.card,
            {
              opacity: animations.current[index],
              transform: [
                {
                  translateX: animations.current[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0], // Right to left
                  }),
                },
                {
                  scale: animations.current[index].interpolate({
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

function triggerRerender(setRefresh: Function) {
    // This is just an example of triggering a re-render after 2 seconds
    const timer = setTimeout(() => {
      setRefresh((prev: any) => !prev); // Toggle the refresh state
    }, 100);

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
}

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    marginHorizontal: 10, // Space between the cards
    // Add other card-specific styling here
  },
});
