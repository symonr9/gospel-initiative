
import React from 'react';
import { View, type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';
import { AnimatedCard } from '../common/AnimatedCard';
import { formatDateTime, getAppTimeAgoText, mapActionStepTypeToIcon, mapActionStepTypeToText } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';

export type IActionStepCard = ViewProps & {
  actionStep: ActionStep;
  handleOnPress?: Function;
};

export function ActionStepCard({ actionStep, handleOnPress, style }: IActionStepCard) {

  const onPress = () => {
    if (handleOnPress) {
      handleOnPress();
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <PageRow style={[styles.actionStepCard, style]}>
        <Image source={mapActionStepTypeToIcon(actionStep.type)} style={styles.icon} />
        <PageColumn style={styles.actionStepTextContainer}>
        <AppText type={TextType.Prefix}>{getAppTimeAgoText(actionStep.targetDate)}</AppText>
          <AppText type={TextType.DefaultSemiBold} style={{ fontSize: 20 }}>{mapActionStepTypeToText(actionStep.type)}</AppText>
          <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{actionStep.notes}</AppText>
          <AppText type={TextType.Italic}>{formatDateTime(actionStep.targetDate)}</AppText>
        </PageColumn>
      </PageRow>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionStepCard: {
    padding: 8,
    backgroundColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8
  },
  actionStepTextContainer: {
    flexShrink: 1
  },
  icon: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginEnd: 12
  }
});