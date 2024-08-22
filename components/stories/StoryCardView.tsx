import React from 'react';
import { View, type ViewProps } from 'react-native';

import { ThemedText } from '../common/ThemedText';
import { SimpleCardView } from '../common/SimpleCardView';
import StoryChapter from '@/models/storyChapter';

export type IStoryChapterCardView = ViewProps & {
    storyChapter: StoryChapter;
};

export function StoryChapterCardView({ storyChapter }: IStoryChapterCardView) {
  const detailsView = (
    <ThemedText>Test</ThemedText>
  );

  return (
    <SimpleCardView iconSrc={storyChapter.icon}
                    title={storyChapter.title}
                    detailsView={detailsView} />
  );
}