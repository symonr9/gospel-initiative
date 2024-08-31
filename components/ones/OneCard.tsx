import React from 'react';
import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { AppText } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';

export type IOneCard = ViewProps & {
  one: One;
};

export function OneCard({ one }: IOneCard) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={one.icon}
                    title={one.name}
                    detailsView={detailsView} />
  );
}