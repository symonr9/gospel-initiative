import React from 'react';
import { View, type ViewProps } from 'react-native';

import { AppText } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import StoryChapter from '@/models/storyChapter';

export type IStoryChapterCard = ViewProps & {
    storyChapter: StoryChapter;
};

export function StoryChapterCard({ storyChapter }: IStoryChapterCard) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={storyChapter.icon}
                    title={storyChapter.title}
                    detailsView={detailsView} />
  );
}