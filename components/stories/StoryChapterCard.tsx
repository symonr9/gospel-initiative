
import React, { useState } from 'react';
import { type ViewProps, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import { mapStoryChapterQualityToText, mapStoryChapterTagToText, mapStoryChapterTypeToAppIcon, mapStoryChapterTypeToText, shouldKeepChapter } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import StoryChapter from '@/models/storyChapter';
import { PageChip } from '../common/PageChip';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import { Colors } from '@/constants/Colors';

export type IStoryChapterCard = ViewProps & {
  chapter: StoryChapter;
  setChapterArray?: Function;
  setEditingChapterId?: Function;
  editing?: Boolean;
  canEdit?: Boolean;
};

export function StoryChapterCard({ chapter, setChapterArray, setEditingChapterId, editing = false, canEdit = true, style }: IStoryChapterCard) {
  const [formChapter, setFormChapter] = useState(chapter);
  const shouldKeep = shouldKeepChapter(chapter.quality);

  const onEditClick = () => {
    if (setEditingChapterId) {
      setEditingChapterId(editing ? null : chapter.id);
    }
  }

  const onKeepClick = () => {
    if (setChapterArray) {
      setChapterArray((prev: StoryChapter[]) => prev.map((item) => (
        item.id === chapter.id
          ? { ...chapter, quality: shouldKeep ? 1 : 7 }
          : item
      )));
    }
  }
  
  const onBackClick = () => {
    if (setEditingChapterId) {
      setEditingChapterId(null);
    }
  };

  const onSaveClick = () => {
    if (setChapterArray) {
      setChapterArray((prev: StoryChapter[]) => prev.map((item) => (
        item.id === formChapter.id
          ? formChapter
          : item
      )));
    }
  };

  const icon = editing ? AppIcon.Pencil : mapStoryChapterTypeToAppIcon(chapter.chapterType);

  return (
    <PageRow style={[styles.chapterCard, !shouldKeep && styles.shouldDiscard, style]}>
      <PageColumn style={styles.actionStepTextContainer}>
        <PageRow>
          <Image source={icon} style={styles.icon} />
          <PageColumn>
            {
              editing && (
                <AppText type={TextType.Italic} style={{ fontSize: 16 }}>
                  Editing Item...
                </AppText>
              )
            }
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
              <PageChip title={name} small style={{ backgroundColor: '#d9ead3' }} />
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

        <PageRow style={{ marginVertical: 8 }}>
          <PageChip title={`Quality: ${mapStoryChapterQualityToText(chapter.quality)}`}
            style={{ backgroundColor: '#d0e0e3' }}
            small />
        </PageRow>

        {
          canEdit && (
            <PageRow spaceBetween style={[styles.footer]}>
              <Button title={shouldKeep ? 'Keeping' : 'Discarding'}
                onPress={onKeepClick}
                color={shouldKeep ? Colors.light.alternate1 : Colors.light.alternate2} />

              {
                !editing && (
                  <SimpleIconButton iconSrc={AppIcon.Pencil} 
                    title={'Edit'} 
                    small
                    customStyles={{ container: { marginEnd: 8 }}}
                    onClick={onEditClick} />
                )
              }

              {
                editing && (
                  <PageRow style={{ gap: 20, marginEnd: 8 }}>
                    <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                      title={'Back'}
                      small
                      onClick={onBackClick} />
                    <SimpleIconButton iconSrc={AppIcon.Save}
                      title={'Save'}
                      small
                      onClick={onSaveClick} />
                  </PageRow>
                )
              }
            </PageRow>
          )
        }
      </PageColumn>
    </PageRow>
  );
}

const styles = StyleSheet.create({
  chapterCard: {
    paddingTop: 16,
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
  shouldDiscard: {
    opacity: 0.4
  },
  actionStepTextContainer: {
    flexShrink: 1,
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginEnd: 12
  },
  footer: {
  },
  stateBtn: {
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
});