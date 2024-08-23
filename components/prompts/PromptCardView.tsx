import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import Prompt from '@/models/prompt';

export type IPromptCardView = ViewProps & {
  prompt: Prompt;
};

export function PromptCardView({ prompt }: IPromptCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={prompt.icon}
                    title={prompt.notes}
                    detailsView={detailsView} />
  );
}