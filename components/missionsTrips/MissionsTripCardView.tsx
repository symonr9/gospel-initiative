
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import MissionsTrip from '@/models/missionsTrip';
import { AppIcon } from '@/enums/enums';

export type IMissionsTripCardView = ViewProps & {
    missionsTrip: MissionsTrip;
};

export function MissionsTripCardView({ missionsTrip }: IMissionsTripCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={AppIcon.Man1}
                    title={missionsTrip.title}
                    detailsView={detailsView} />
  );
}