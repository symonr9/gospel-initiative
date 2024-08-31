import React from 'react';
import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { AppText } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import Meeting from '@/models/meeting';

export type IMeetingCardView = ViewProps & {
  one: One;
  meeting: Meeting;
};

export function MeetingCard({ one, meeting }: IMeetingCardView) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={one.icon}
                    title={meeting.notes}
                    detailsView={detailsView} />
  );
}