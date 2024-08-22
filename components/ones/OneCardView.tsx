import React from 'react';
import { View, type ViewProps } from 'react-native';

import One from '@/models/one';
import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';

export type IOneCardView = ViewProps & {
  one: One;
};

export function OneCardView({ one }: IOneCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={one.icon}
                    title={one.name}
                    detailsView={detailsView} />
  );
}