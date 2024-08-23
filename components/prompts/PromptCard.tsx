import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCard } from '../common/SimpleCard';
import Prompt from '@/models/prompt';

export type IPromptCard = ViewProps & {
  prompt: Prompt;
};

export function PromptCard({ prompt }: IPromptCard) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCard iconSrc={prompt.icon}
                    title={prompt.notes}
                    detailsView={detailsView} />
  );
}