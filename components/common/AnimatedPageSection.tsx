import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewProps } from 'react-native';

export type IAnimatedPageSection = ViewProps & {
  row?: boolean;
  column?: boolean;
  durationPerEach?: number;
  delayMultiple?: number;
  itemsToRender: React.ReactNode[];
};

export function AnimatedPageSection({ row, column, itemsToRender,
  durationPerEach = 400, delayMultiple = 100
 }: IAnimatedPageSection) {
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
        duration: durationPerEach,
        delay: index * delayMultiple, // Stagger the animations
        useNativeDriver: true,
      });
    });

    Animated.stagger(100, animationsArray).start();

    return triggerRerender(setRefresh);
  }, [itemsToRender]);

  if (animations.current.length !== itemsToRender.length) {
    return <></>;
  }

  const stylesToUse = [];
  stylesToUse.push(styles.container);
  if (row) {
    stylesToUse.push(styles.row);
  } else if (column) {
    stylesToUse.push(styles.column);
  }

  return (
    <View style={stylesToUse}>
      {itemsToRender.map((item, index) => {
        const transformArr = getTranslateArr(animations, 
          index, row, column);
        return (
          <Animated.View
            key={index}
            style={[
              styles.card,
              {
                opacity: animations.current[index],
                transform: transformArr
              },
            ]}
          >
            {item}
          </Animated.View>
        );
      })}
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

function getTranslateArr(animations: any, index: number, 
  row: boolean | undefined, column: boolean | undefined) {
  const transformArr = [];
  if (row) {
    transformArr.push(getTranslateXTransformObj(animations, index));
  } else if (column) {
    transformArr.push(getTranslateYTransformObj(animations, index));
  }

  transformArr.push(getScaleTransformObj(animations, index));

  return transformArr;
}

function getTranslateXTransformObj(animations: any, index: number) {
  return {
    translateX: animations.current[index].interpolate({
      inputRange: [0, 1],
      outputRange: index === 0 ? [-50, 0] : [50, 0], // Right to left
    }),
  };
};

function getTranslateYTransformObj(animations: any, index: number) {
  return {
    translateY: animations.current[index].interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0],
    }),
  };
};

function getScaleTransformObj(animations: any, index: number) {
  return {
    scale: animations.current[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1], // Scale up
    }),
  };
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    flex: 2,
  },
});
