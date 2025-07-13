import React, { } from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { flexStyles, useGridStyles } from '@/styles/Styles';
import BeaconTemplate from '@/models/beaconTemplate';
import { PageRow } from '../common/PageRow';
import { Colors, useThemeColors } from '@/constants/Colors';
import { halfScreenWidth, standardPaddedWidth } from '@/constants/Dimensions';

export type IBeaconCard = ViewProps & {
  template: BeaconTemplate;
  isSelected?: boolean;
};

export function BeaconTemplateCard({ template, isSelected = false }: IBeaconCard) {
  const themeColors = useThemeColors();
  const gridStyles = useGridStyles(themeColors);

  return (
    <PageRow style={[gridStyles.itemCard, flexStyles.row, isSelected && styles.selected]}>
      <Image source={template.icon}
        style={styles.icon}
        contentFit="contain" />

      <PageColumn style={{ width: standardPaddedWidth, flexShrink: 1 }}>
        <AppText type={TextType.Subtitle3}>
          {template.name}
        </AppText>
        <AppText type={TextType.Default}>
          {template.message}
        </AppText>
      </PageColumn>
    </PageRow>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: Colors.success,
  },
  icon: {
    width: 36,
    height: 36,
    marginTop: 8,
    marginEnd: 8,
  },
});