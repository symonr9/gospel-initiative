import React from 'react';
import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import Meeting from '@/models/meeting';

export type IMeetingCardView = ViewProps & {
  one: One;
  meeting: Meeting;
};

export function MeetingCardView({ one, meeting }: IMeetingCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={one.icon}
                    title={meeting.notes}
                    detailsView={detailsView} />
  );
}