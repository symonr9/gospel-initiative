
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
  selected?: Boolean;
};

export function ActionStepCard({ actionStep, handleOnPress, selected = false, style }: IActionStepCard) {

  const onPress = () => {
    if (handleOnPress) {
      handleOnPress();
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <PageRow style={[styles.actionStepCard, selected && styles.selected, style]}>
        <Image source={mapActionStepTypeToIcon(actionStep.type)} style={styles.icon} />
        <PageColumn style={styles.actionStepTextContainer}>
        <AppText type={TextType.Prefix}>{getAppTimeAgoText(actionStep.targetDate)}</AppText>

        
          <AppText type={TextType.DefaultSemiBold} style={{ fontSize: 20 }}>{mapActionStepTypeToText(actionStep.type)}</AppText>
          {
            actionStep.notes && (
              <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{actionStep.notes}</AppText>
            )
          }

          {
            selected && (
              <AppText type={TextType.Italic}>{formatDateTime(actionStep.targetDate)}</AppText>
            )
          }
        </PageColumn>
      </PageRow>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionStepCard: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    padding: 8,
    marginVertical: 2,
    borderRadius: 8
  },
  selected: {
    backgroundColor: 'lightgreen',
  },
  actionStepTextContainer: {
    flexShrink: 1
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginEnd: 12
  }
});