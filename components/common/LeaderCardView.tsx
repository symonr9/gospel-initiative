
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import { AppIcon } from '@/enums/enums';
import Leader from '@/models/leader';

export type ILeaderCardView = ViewProps & {
    leader: Leader;
};

export function LeaderCardView({ leader }: ILeaderCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={AppIcon.Man1}
                    title={leader.name}
                    detailsView={detailsView} />
  );
}