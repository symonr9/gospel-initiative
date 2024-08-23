import React from 'react';
import { View, type ViewProps } from 'react-native';

import PrayerBeacon from '@/models/prayerBeacon';
import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import { AppIcon } from '@/enums/enums';

export type IPrayerBeaconCard = ViewProps & {
  prayerBeacon: PrayerBeacon;
};

export function PrayerBeaconCard({ prayerBeacon }: IPrayerBeaconCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={prayerBeacon.name}
                    detailsView={detailsView} />
  );
}