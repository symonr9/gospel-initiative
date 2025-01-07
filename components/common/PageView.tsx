import React from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/common/ThemedView';
import { Colors } from '@/constants/Colors';
import { screenHeight, screenWidth } from '@/constants/Dimensions';

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
