import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/common/ThemedView';
import { Colors } from '@/constants/Colors';

type Props = PropsWithChildren<{

}>;

export default function PageView({
  children,
}: Props) {
  return (
    <ThemedView style={styles.container}>
        {children}
    </ThemedView>
  );
}

const { width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: screenHeight - 170,
    width: screenWidth,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
    flex: 1,
    flexDirection: 'column'
  },
});
