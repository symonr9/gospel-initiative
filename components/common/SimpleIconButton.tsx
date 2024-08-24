import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText, ThemedTextType } from './ThemedText';
import { useBackgroundThemeColor } from '@/constants/Colors';

export type ISimpleIconButton = {
  iconSrc: string | null;
  title: string;
  onClick?: () => void; // Changed to a more specific type
}

export function SimpleIconButton({ iconSrc = null, title, onClick }: ISimpleIconButton) {
  const backgroundColor = useBackgroundThemeColor(); // Assuming you use this for theming

  const onTouchEnd = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onTouchEnd}>
      <View style={styles.iconContainer}>
        {
          iconSrc && (
            <Image source={iconSrc} style={styles.icon} contentFit="contain" />
          )
        }
      </View>
      <ThemedText type={ThemedTextType.Subtitle} style={styles.title}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40, // Circle
    backgroundColor: '#FFF', // Background for icon
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, // Space between the icon and the title
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
