
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import LocalMinistry from '@/models/localMinistry';
import { AppIcon } from '@/enums/enums';

export type ILocalMinistryCardView = ViewProps & {
    localMinistry: LocalMinistry;
};

export function LocalMinistryListView({ localMinistry }: ILocalMinistryCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={AppIcon.Man1}
                    title={localMinistry.title}
                    detailsView={detailsView} />
  );
}