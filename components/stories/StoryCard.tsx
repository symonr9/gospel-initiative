import React from 'react';
import { View, type ViewProps } from 'react-native';

import { AppText } from '../common/AppText';
import { SimpleCard } from '../common/SimpleCard';
import Story from '@/models/story';
import { AppIcon } from '@/enums/enums';

export type IStoryCard = ViewProps & {
    story: Story;
};

export function StoryCard({ story }: IStoryCard) {
  const detailsView = (
    <AppText>Test</AppText>
  );

  return (
    <SimpleCard iconSrc={AppIcon.Man1}
                    title={story.title}
                    detailsView={detailsView} />
  );
}