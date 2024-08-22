
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';

export type IActionStepCardView = ViewProps & {
    actionStep: ActionStep;
};

export function ActionStepCardView({ actionStep }: IActionStepCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={AppIcon.Man1}
                    title={actionStep.notes}
                    detailsView={detailsView} />
  );
}