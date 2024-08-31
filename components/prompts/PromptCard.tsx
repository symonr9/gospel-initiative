import React from 'react';
import { View, type ViewProps } from 'react-native';

import { AppText } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import Prompt from '@/models/prompt';

export type IPromptCard = ViewProps & {
  prompt: Prompt;
};

export function PromptCard({ prompt }: IPromptCard) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={prompt.icon}
                    title={prompt.notes}
                    detailsView={detailsView} />
  );
}