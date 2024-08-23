
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import ActionStep from '@/models/actionStep';
import { AppIcon } from '@/enums/enums';

export type IActionStepCard = ViewProps & {
    actionStep: ActionStep;
};

export function ActionStepCard({ actionStep }: IActionStepCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={actionStep.notes}
                    detailsView={detailsView} />
  );
}