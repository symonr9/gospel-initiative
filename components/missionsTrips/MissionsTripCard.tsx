
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { AppText } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import MissionsTrip from '@/models/missionsTrip';
import { AppIcon } from '@/enums/enums';

export type IMissionsTripCard = ViewProps & {
    missionsTrip: MissionsTrip;
};

export function MissionsTripCard({ missionsTrip }: IMissionsTripCard) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={missionsTrip.title}
                    detailsView={detailsView} />
  );
}