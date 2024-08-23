
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import MissionsTrip from '@/models/missionsTrip';
import { AppIcon } from '@/enums/enums';

export type IMissionsTripCard = ViewProps & {
    missionsTrip: MissionsTrip;
};

export function MissionsTripCard({ missionsTrip }: IMissionsTripCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={missionsTrip.title}
                    detailsView={detailsView} />
  );
}