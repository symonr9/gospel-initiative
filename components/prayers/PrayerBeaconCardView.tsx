import React from 'react';
import { View, type ViewProps } from 'react-native';

import PrayerBeacon from '@/models/prayerBeacon';
import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import { AppIcon } from '@/enums/enums';

export type IPrayerBeaconCardView = ViewProps & {
  prayerBeacon: PrayerBeacon;
};

export function PrayerBeaconCardView({ prayerBeacon }: IPrayerBeaconCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={AppIcon.Man1}
                    title={prayerBeacon.name}
                    detailsView={detailsView} />
  );
}