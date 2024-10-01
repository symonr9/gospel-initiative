
import React, { useState } from 'react';
import { type ViewProps, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { AppText, TextType } from '../common/AppText';
import { mapStoryChapterQualityToText, mapStoryChapterTagToText, mapStoryChapterTypeToAppIcon, mapStoryChapterTypeToText, shouldKeepChapter } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import StoryChapter from '@/models/storyChapter';
import { PageChip } from '../common/PageChip';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';

export type IStoryChapterCard = ViewProps & {
  chapter: StoryChapter;
  setChapterArray?: Function;
  setEditingChapterId?: Function;
  editing?: Boolean;
  canEdit?: Boolean;
  canDiscard?: Boolean;
  expandOnLoad?: Boolean;
};

const EXPANDED_HEIGHT = 450;
const COLLAPSED_HEIGHT = 100;

export function StoryChapterCard({ chapter, setChapterArray, setEditingChapterId,
  editing = false, canEdit = true, expandOnLoad = false, canDiscard = false, style }: IStoryChapterCard) {
  const [expanded, setExpanded] = useState(expandOnLoad);
  const [formChapter, setFormChapter] = useState(chapter);
  const shouldKeep = shouldKeepChapter(chapter.quality);

  const height = useSharedValue(expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT);

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 500 }), // Adjust duration as needed
  }));

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

  const onExpandClick = () => {
    setExpanded(!expanded);
    height.value = expanded ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT;
  };

  const icon = editing ? AppIcon.Pencil : mapStoryChapterTypeToAppIcon(chapter.chapterType);

  return (
    <Animated.View style={[styles.chapterCard, animatedHeightStyle, !shouldKeep && styles.shouldDiscard, style]}>
      <PageColumn>
        <PageRow>
          <PageRow style={{ marginBottom: 8 }}>
            <Animated.View entering={FadeInUp.duration(200)} style={{ marginBottom: 8 }}>
              <Image source={icon} style={styles.icon} />
            </Animated.View>

            <PageColumn>
              {
                editing && (
                  <AppText type={TextType.Italic} style={{ fontSize: 16 }}>
                    Editing Item...
                  </AppText>
                )
              }
              <PageRow style={{ flexShrink: 1, width: 270 }}>
                <AppText type={TextType.Subtitle} style={{ fontSize: 18 }}>{chapter.title}</AppText>
              </PageRow>
              {
                canDiscard && (
                  <AppText type={TextType.Subtitle2}>
                    {mapStoryChapterTypeToText(chapter.chapterType)}
                  </AppText>
                )
              }

              <PageRow style={{}}>
                {
                  chapter.tags.map((tag) => (
                    <PageChip title={mapStoryChapterTagToText(tag)} small />
                  ))
                }
              </PageRow>

              <PageRow style={{ marginTop: 12 }}>
                {
                  chapter.names.map((name) => (
                    <PageChip title={name} small style={{ backgroundColor: '#d9ead3' }} />
                  ))
                }
              </PageRow>
            </PageColumn>
          </PageRow>

          <PageRow spaceEvenly style={{ marginLeft: 20, marginRight: 4 }}>
            <SimpleIconButton iconSrc={expanded ? AppIcon.ChevronUp : AppIcon.ChevronDown}
              onClick={onExpandClick}
              small />
          </PageRow>
        </PageRow>

        {
          expanded && (
            <PageColumn style={{ marginBottom: 12 }}>
              {
                chapter.content && (
                  <ScrollLayout style={{ maxHeight: 150, marginVertical: 12 }}>
                    <PageRow style={{ flexShrink: 1, width: 360,  }}>
                      <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{chapter.content}</AppText>
                    </PageRow>
                  </ScrollLayout>
                )
              }

              <AppText type={TextType.Body}>
                Questions:
              </AppText>
              <PageColumn style={{ gap: 2, flexShrink: 1, width: 350 }}>
                {
                  chapter.questions.map((question) => (
                    <AppText type={TextType.Italic}>{question}</AppText>
                  ))
                }
              </PageColumn>

              <PageRow style={{ marginTop: 8 }}>
                <PageChip title={`Quality: ${mapStoryChapterQualityToText(chapter.quality)}`}
                  style={{ backgroundColor: '#d0e0e3' }}
                  small />
              </PageRow>

              {
                canEdit && (
                  <PageRow spaceBetween style={[styles.footer]}>
                    {
                      canDiscard && (
                        <Button title={shouldKeep ? 'Keeping' : 'Discarding'}
                          onPress={onKeepClick}
                          color={shouldKeep ? Colors.light.alternate1 : Colors.light.alternate2} />
                      )
                    }

                    {
                      !editing && (
                        <>
                          <SimpleIconButton iconSrc={AppIcon.Pencil}
                            title={'Edit'}
                            small
                            customStyles={{ container: { marginEnd: 8 } }}
                            onClick={onEditClick} />
                        </>
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
          )
        }

      </PageColumn>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chapterCard: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: '#F3F1F3',
    borderColor: 'gray',
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
  flexShrink: {
    flexShrink: 1,
  },
  icon: {
    width: 42,
    height: 42,
    marginEnd: 6
  },
  footer: {
    flexDirection: 'row-reverse',
  },
  stateBtn: {
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
});