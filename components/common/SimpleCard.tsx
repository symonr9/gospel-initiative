import React from 'react';
import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { flexStyles } from '@/styles/Styles';

import { ThemedText, ThemedTextType } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useBackgroundThemeColor } from '@/constants/Colors';

export type ISimpleCard = ViewProps & {
  iconSrc: string | null;
  title: string;
  detailsView?: any;
  onClick?: Function;
}

export function SimpleCard({ iconSrc = null, title, detailsView = <></>,
  onClick,
 }: ISimpleCard) {
  const backgroundColor = useBackgroundThemeColor();

  const onTouchEnd = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <ThemedView style={styles.container} onTouchEnd={onTouchEnd}>
      <View style={flexStyles.column}>
        {
            iconSrc && (
                <Image source={iconSrc} style={styles.icon} contentFit="contain" />
            )
        }
        <ThemedText type={ThemedTextType.Subtitle}>{title}</ThemedText>
      </View>
      <View style={flexStyles.column}>
        {detailsView}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#F0E68C', // Khaki color
    borderRadius: 4,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6, // Shadow radius for a softer shadow
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 12, // Space between the icon and the name
  },
});