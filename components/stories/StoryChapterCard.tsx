
import React from 'react';
import { type ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { mapStoryChapterTagToText, mapStoryChapterTypeToAppIcon, mapStoryChapterTypeToText } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import StoryChapter from '@/models/storyChapter';
import { PageChip } from '../common/PageChip';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export type IStoryChapterCard = ViewProps & {
  chapter: StoryChapter;
  handleOnPress?: Function;
  selected?: Boolean;
  canEdit?: Boolean;
};

export function StoryChapterCard({ chapter, handleOnPress, selected = false, style }: IStoryChapterCard) {

  const onPress = () => {
    if (handleOnPress) {
      handleOnPress();
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <PageRow style={[styles.chapterCard, selected && styles.selected, style]}>
        <PageColumn style={styles.actionStepTextContainer}>
          <PageRow>
            <Image source={mapStoryChapterTypeToAppIcon(chapter.chapterType)} style={styles.icon} />
            <PageColumn>
              <PageRow style={{ flexShrink: 1, width: 300 }}>
                <AppText type={TextType.Subtitle} style={{ fontSize: 22 }}>{chapter.title}</AppText>
              </PageRow>
              <AppText type={TextType.Subtitle2}>
                {mapStoryChapterTypeToText(chapter.chapterType)}
              </AppText>
            </PageColumn>
          </PageRow>

          <PageRow style={{ flexWrap: 'wrap' }}>
            {
              chapter.tags.map((tag) => (
                <PageChip title={mapStoryChapterTagToText(tag)} small />
              ))
            }
          </PageRow>

          <PageRow style={{ flexWrap: 'wrap' }}>
            {
              chapter.names.map((name) => (
                <PageChip title={name} small style={{ backgroundColor: '#d9ead3'}} />
              ))
            }
          </PageRow>

          {
            chapter.content && (
              <PageRow style={{ flexShrink: 1, marginVertical: 12 }}>
                <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{chapter.content}</AppText>
              </PageRow>
            )
          }

          <AppText type={TextType.Body}>
            Questions:
          </AppText>
          <PageColumn style={{ gap: 2 }}>
            {
              chapter.questions.map((question) => (
                <AppText type={TextType.Italic}>{question}</AppText>
              ))
            }
          </PageColumn>
        </PageColumn>
      </PageRow>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chapterCard: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F1F3',
    borderColor: 'lightgray',
    borderWidth: 1,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 4, // Shadow for Android
  },
  completed: {
    backgroundColor: '#d9ead3',
  },
  selected: {
    backgroundColor: '#a2c4c9',
  },
  actionStepTextContainer: {
    flexShrink: 1,
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginEnd: 12
  }
});