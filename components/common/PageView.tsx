import React from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/common/ThemedView';
import { Colors, useThemeColors } from '@/constants/Colors';
import { screenHeight, screenWidth } from '@/constants/Dimensions';

type Props = PropsWithChildren<{

}>;

export default function PageView({
  children,
}: Props) {
  const { backgroundColor, textColor } = useThemeColors();

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
        {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: screenHeight - 170,
    width: screenWidth,
    flex: 1,
    flexDirection: 'column'
  },
});
