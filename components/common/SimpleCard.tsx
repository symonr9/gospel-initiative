import React from 'react';
import { GestureResponderEvent, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';


import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { useBackgroundThemeColor } from '@/constants/Colors';
import { AppIcon } from '@/enums/enums';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';

export type ISimpleCard = ViewProps & {
  iconSrc: AppIcon | null;
  title: string;
  detailsView?: any;
  onClick?: Function;
}

export function SimpleCard({ iconSrc = null, title, detailsView = <></>,
  onClick, style
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
      <ThemedView style={[styles.container, style]}>
        <PageRow>
          {
            iconSrc && (
              <Image source={iconSrc} style={styles.icon} contentFit="contain" />
            )
          }
          <PageColumn style={{}}>
            <AppText type={TextType.Subtitle} style={{ alignSelf: 'center' }}>{title}</AppText>
            {detailsView}
          </PageColumn>
        </PageRow>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    alignItems: 'center',
    padding: 4,
    paddingVertical: 6,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6, // Shadow radius for a softer shadow
    elevation: 4,
  },
  icon: {
    width: 24,
    height: 24,
    marginEnd: 8,
  },
});