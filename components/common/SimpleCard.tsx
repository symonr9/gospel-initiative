import React from 'react';
import { GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { flexStyles } from '@/styles/Styles';

import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { useBackgroundThemeColor } from '@/constants/Colors';
import { AppIcon } from '@/enums/enums';

export type ISimpleCard = ViewProps & {
  iconSrc: AppIcon | null;
  title: string;
  detailsView?: any;
  onClick?: Function;
}

export function SimpleCard({ iconSrc = null, title, detailsView = <></>,
  onClick,
}: ISimpleCard) {
  const backgroundColor = useBackgroundThemeColor();

  const onPress = (e: GestureResponderEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.container}>
        <View style={flexStyles.column}>
          {
            iconSrc && (
              <Image source={iconSrc} style={styles.icon} contentFit="contain" />
            )
          }
          <AppText type={TextType.Subtitle}>{title}</AppText>
        </View>
        <View style={flexStyles.column}>
          {detailsView}
        </View>
      </ThemedView>
    </TouchableOpacity>
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
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 10,
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