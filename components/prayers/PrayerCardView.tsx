import React from 'react';
import { View, type ViewProps } from 'react-native';

import Prayer from '@/models/prayer';
import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import { AppIcon } from '@/enums/enums';

export type IPrayerCardView = ViewProps & {
  prayer: Prayer;
};

export function PrayerCardView({ prayer }: IPrayerCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={AppIcon.Man1}
                    title={prayer.name}
                    detailsView={detailsView} />
  );
}