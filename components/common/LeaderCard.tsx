
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { AppText } from './AppText';
import { SimpleCard } from './SimpleCard';
import { AppIcon } from '@/enums/enums';
import Leader from '@/models/leader';

export type ILeaderCard = ViewProps & {
    leader: Leader;
};

export function LeaderCard({ leader }: ILeaderCard) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={leader.name}
                    detailsView={detailsView} />
  );
}