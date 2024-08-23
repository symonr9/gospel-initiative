
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import LocalEvent from '@/models/localEvent';
import { AppIcon } from '@/enums/enums';

export type ILocalEventCard = ViewProps & {
    localEvent: LocalEvent;
};

export function LocalEventCard({ localEvent }: ILocalEventCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={localEvent.title}
                    detailsView={detailsView} />
  );
}