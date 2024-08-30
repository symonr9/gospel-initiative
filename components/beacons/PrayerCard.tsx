import React from 'react';
import { View, type ViewProps } from 'react-native';

import Prayer from '@/models/prayer';
import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import { AppIcon } from '@/enums/enums';

export type IPrayerCard = ViewProps & {
  prayer: Prayer;
};

export function PrayerCard({ prayer }: IPrayerCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={prayer.name}
                    detailsView={detailsView} />
  );
}