
import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';
import { AnimatedCard } from '../common/AnimatedCard';
import { mapActionStepTypeToText } from '@/utils/appUtils';

export type IActionStepCard = ViewProps & {
  actionStep: ActionStep;
};

export function ActionStepCard({ actionStep }: IActionStepCard) {

  return (
    <AnimatedCard text={actionStep.notes}
      icon={AppIcon.Chat}
      label={`${mapActionStepTypeToText(actionStep.type)}`} />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});