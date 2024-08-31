
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { AppText } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import LocalMinistry from '@/models/localMinistry';
import { AppIcon } from '@/enums/enums';

export type ILocalMinistryCard = ViewProps & {
    localMinistry: LocalMinistry;
};

export function LocalMinistryCard({ localMinistry }: ILocalMinistryCard) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={localMinistry.title}
                    detailsView={detailsView} />
  );
}