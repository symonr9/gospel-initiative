
import React, { useState } from 'react';
import { type ViewProps, StyleSheet, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { AppText, TextType } from '../common/AppText';
import { mapStoryChapterTypeToAppIcon, mapStoryChapterTypeToText, shouldKeepChapter } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import StoryChapter from '@/models/storyChapter';
import { PageChip } from '../common/PageChip';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon, RefreshSpec } from '@/enums/enums';
import ScrollLayout from '../common/ScrollLayout';
import { SimpleCard } from '../common/SimpleCard';
import { formStyles, gridStyles } from '@/styles/Styles';
import { QuestionsPicker } from './QuestionsPicker';
import TagsPicker from './TagsPicker';
import NamesPicker from './NamesPicker';
import User from '@/models/user';
import { deleteChapter } from "@/requests/storyRequests";
import { updateChapter } from "@/requests/storyRequests";
import ChapterTypePicker from './ChapterTypePicker';
import { SimpleIcon } from '../common/SimpleIcon';
import AppError from '@/models/error';
import { Colors } from '@/constants/Colors';
import { ButtonType, SimpleButton } from '../common/SimpleButton';

export type IStoryChapterCard = ViewProps & {
  chapter: StoryChapter;
  setChapterArray?: Function;
  setEditingChapterId?: Function;
  editing?: Boolean;
  canEdit?: Boolean;
  canDiscard?: Boolean;
  expandOnLoad?: Boolean;
  executor: User;
  setAppError: Function;
  refreshData?: Function;
};

function getHeight(expanded: Boolean, editing: Boolean) {
  if (editing) return 500;
  if (expanded) return undefined;
  return undefined;
}

export function StoryChapterCard({ chapter, setChapterArray, setEditingChapterId,
  editing = false, canEdit = true, expandOnLoad = false, canDiscard = false, executor,
  setAppError, refreshData, style }: IStoryChapterCard) {
  const [expanded, setExpanded] = useState(expandOnLoad);
  const [formChapter, setFormChapter] = useState(chapter);
  const shouldKeep = shouldKeepChapter(chapter.quality);
  const height = getHeight(expanded, editing);

  const resetPage = () => {
    if (setEditingChapterId) {
      setEditingChapterId(null);
    }
    setFormChapter(chapter);
  };

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
    resetPage();
  };

  const onSaveClick = async () => {
    if (setChapterArray) {
      setChapterArray((prev: StoryChapter[]) => prev.map((item) => (
        item.id === formChapter.id
          ? formChapter
          : item
      )));

      if (setEditingChapterId) {
        setEditingChapterId(null);
      }
    } else if (refreshData) {
      const response = await updateChapter(formChapter);
      if (response.error) {
        setAppError(new AppError('Error updating chapter: ', response.error));
        return;
      }
      refreshData(RefreshSpec.Stories);
      resetPage();
    }
  };

  const onDeleteClick = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this chapter?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            if (setChapterArray) {
              setChapterArray((prev: StoryChapter[]) => prev.filter((item) => (
                item.id !== formChapter.id)));
            } else if (refreshData) {
              const response = await deleteChapter(formChapter);
              if (response.error) {
                setAppError(new AppError('Error deleting chapter: ', response.error));
                return;
              }
              refreshData(RefreshSpec.Stories);
              resetPage();
            }
          }
        }
      ]
    );
  };

  const onExpandClick = () => {
    if (!editing) {
      setExpanded(val => !val);
    }
  };

  const Header = (
    <PageRow>
      <TouchableOpacity onPress={onExpandClick} activeOpacity={editing ? 1 : 0.2}>
        <PageRow style={{ width: 300 }} spaceBetween>
          <PageRow style={{}}>
            <Animated.View entering={FadeInUp.duration(200)} style={{ marginBottom: 8 }}>
              <Image source={mapStoryChapterTypeToAppIcon(chapter.chapterType)} style={styles.icon} />
            </Animated.View>
            <PageColumn style={{ width: 300, flexShrink: 1 }}>
              <AppText type={TextType.Subtitle3}>
                {chapter.title}
              </AppText>
              <TagsPicker formChapter={formChapter}
                editing={editing}
                maxToRender={expanded || editing ? null : 3}
                setFormChapter={setFormChapter} />
              <NamesPicker formChapter={formChapter}
                editing={editing}
                maxToRender={expanded || editing ? null : 2}
                setFormChapter={setFormChapter} />
            </PageColumn>
          </PageRow>
          {
            !editing && (
              <Image source={expanded ? AppIcon.ChevronUp : AppIcon.ChevronDown}
                style={{ height: 30, width: 30 }} />
            )
          }
        </PageRow>
      </TouchableOpacity>
    </PageRow>
  );

  if (editing) {
    return (
      <PageColumn style={[gridStyles.itemCard, !shouldKeep && styles.shouldDiscard, { height: getHeight(expanded, editing), width: 350 }, style]}>
        <ScrollLayout style={[height !== undefined && { maxHeight: height - 140 }]}>
          {Header}

          <ChapterTypePicker formChapter={formChapter}
            setFormChapter={setFormChapter}/>

          <TextInput
            style={[formStyles.multiLineTextInput, { maxHeight: 240, marginVertical: 8 }]}
            placeholder="Enter note here..."
            placeholderTextColor={'gray'}
            value={formChapter.content}
            multiline
            numberOfLines={8}
            onChangeText={(text) => setFormChapter({ ...formChapter, content: text })} />

          <PageColumn style={{ gap: 8 }}>
            <AppText type={TextType.Body}>
              Questions:
            </AppText>
            <QuestionsPicker formChapter={formChapter}
              setFormChapter={setFormChapter} />
          </PageColumn>
        </ScrollLayout>

        <PageRow spaceEvenly style={{}}>
          <SimpleButton type={ButtonType.Edit} text={'Back'} onPress={onBackClick} />
          <SimpleButton type={ButtonType.Save} text={'Save'} onPress={onSaveClick} />
        </PageRow>
      </PageColumn>
    );
  }

  if (expanded) {
    return (
      <PageColumn style={[gridStyles.itemCard, !shouldKeep && styles.shouldDiscard, { height: getHeight(expanded, editing), width: 350, gap: 12 }, style]}>
        {Header}

        <ScrollLayout style={[height !== undefined && { maxHeight: height - 200 }]}>
          <PageColumn style={{ gap: 12 }}>
            <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{chapter.content}</AppText>

            <PageColumn style={{ marginVertical: 0 }}>
              <AppText type={TextType.Body}>
                Questions:
              </AppText>
              <PageColumn style={{ gap: 2, flexShrink: 1, width: 320 }}>
                {
                  chapter.questions.map((question) => (
                    <AppText type={TextType.Italic}>{question}</AppText>
                  ))
                }
              </PageColumn>
            </PageColumn>

            {
              chapter.originalPrompt && (
                <PageColumn style={{ marginVertical: 0 }}>
                  <AppText type={TextType.Body}>
                    Original Prompt:
                  </AppText>
                  <PageColumn style={{ flexShrink: 1, width: 320 }}>
                    <AppText type={TextType.Italic}>
                      {chapter.originalPrompt}
                    </AppText>
                  </PageColumn>
                </PageColumn>
              )
            }
          </PageColumn>
        </ScrollLayout>

        <PageRow style={[{}]} spaceEvenly>
          {
            canDiscard && (
              <SimpleCard iconSrc={shouldKeep ? AppIcon.Star : AppIcon.Trash}
                title={shouldKeep ? 'Keeping' : 'Discarding'}
                onClick={onKeepClick} />
            )
          }

          {
            canEdit && (
              <>
                <SimpleButton type={ButtonType.Close} onPress={onDeleteClick} text={'Delete'} />
                <SimpleButton type={ButtonType.Edit} onPress={onEditClick} text={'Edit'} />
              </>
            )
          }
        </PageRow>

      </PageColumn>
    );
  }

  return (
    <TouchableOpacity onPress={onExpandClick}>
      <PageColumn style={[gridStyles.itemCard, !shouldKeep && styles.shouldDiscard, { height: getHeight(expanded, editing), width: 350 }, style]}>
        {Header}
      </PageColumn>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  completed: {
    backgroundColor: Colors.success,
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
  stateBtn: {
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
});