import React, {  } from 'react';
import { type ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { cardStyles, flexStyles } from '@/styles/Styles';
import BeaconTemplate from '@/models/beaconTemplate';
import { PageRow } from '../common/PageRow';

export type IBeaconCard = ViewProps & {
  template: BeaconTemplate;
  isSelected?: boolean;
};

export function BeaconTemplateCard({ template, isSelected = false }: IBeaconCard) {
  return (
    <PageRow style={[cardStyles.container, flexStyles.row, isSelected && styles.selected]}>
      <Image source={template.icon}
        style={styles.icon}
        contentFit="contain" />

      <PageColumn style={{ width: '80%'}}>
        <AppText type={TextType.Subtitle}>
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
    backgroundColor: '#d9ead3'
  },
  icon: {
    width: 36,
    height: 36,
    marginTop: 8,
    marginEnd: 8,
  },
});