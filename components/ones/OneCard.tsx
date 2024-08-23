import React from 'react';
import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';

export type IOneCard = ViewProps & {
  one: One;
};

export function OneCard({ one }: IOneCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={one.icon}
                    title={one.name}
                    detailsView={detailsView} />
  );
}