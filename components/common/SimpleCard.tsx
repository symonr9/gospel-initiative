import React from 'react';
import { GestureResponderEvent, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';


import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { useBackgroundThemeColor } from '@/constants/Colors';
import { AppIcon, AvatarIcon } from '@/enums/enums';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { gridStyles } from '@/styles/Styles';

export type ISimpleCard = ViewProps & {
  iconSrc?: AppIcon | AvatarIcon | null;
  title: string;
  subtitle?: string;
  detailsView?: any;
  onClick?: Function;
}

export function SimpleCard({ iconSrc = null, title, subtitle, detailsView = <></>,
  onClick, style
}: ISimpleCard) {
  const onPress = (e: GestureResponderEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onClick === undefined ? 1 : 0.2}>
      <ThemedView style={[gridStyles.itemCard, { padding: 12 }, style]}>
        <PageColumn style={{ gap: 4 }}>
          <PageRow>
            {
              iconSrc && (
                <Image source={iconSrc}
                  style={styles.icon}
                  contentFit="contain" />
              )
            }
            <PageColumn style={{ maxWidth: 300 }}>
              <AppText type={TextType.Subtitle3} style={{}}>{title}</AppText>
              {
                subtitle && (
                  <AppText type={TextType.Body} style={{}}>{subtitle}</AppText>
                )
              }
            </PageColumn>
          </PageRow>
          {detailsView}
        </PageColumn>
      </ThemedView>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginEnd: 8,
    alignSelf: 'center'
  },
});