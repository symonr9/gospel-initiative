
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import LocalMinistry from '@/models/localMinistry';
import { AppIcon } from '@/enums/enums';

export type ILocalMinistryCard = ViewProps & {
    localMinistry: LocalMinistry;
};

export function LocalMinistryCard({ localMinistry }: ILocalMinistryCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={localMinistry.title}
                    detailsView={detailsView} />
  );
}