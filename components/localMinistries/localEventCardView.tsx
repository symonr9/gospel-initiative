
import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import LocalEvent from '@/models/localEvent';
import { AppIcon } from '@/enums/enums';

export type ILocalEventCardView = ViewProps & {
    localEvent: LocalEvent;
};

export function LocalEventCardView({ localEvent }: ILocalEventCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={AppIcon.Man1}
                    title={localEvent.title}
                    detailsView={detailsView} />
  );
}