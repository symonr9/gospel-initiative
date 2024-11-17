
import React, { useState } from 'react';
import { type ViewProps, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
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
  if (editing) return '90%';
  if (expanded) return 400;
  return 100;
}

export function StoryChapterCard({ chapter, setChapterArray, setEditingChapterId,
  editing = false, canEdit = true, expandOnLoad = false, canDiscard = false, executor,
  setAppError, refreshData, style }: IStoryChapterCard) {
  const [expanded, setExpanded] = useState(expandOnLoad);
  const [formChapter, setFormChapter] = useState(chapter);
  const shouldKeep = shouldKeepChapter(chapter.quality);

  const Header = [];
  const Body = [];
  const ExpandedLayoutButtons = [];

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
    setExpanded(!expanded);
  };

  // Building the Header
  if (editing) {
    Header.push(
      <AppText type={TextType.Italic} style={{ fontSize: 16 }}>
        Editing Item...
      </AppText>
    );
  }

  if (editing) {
    Header.push(
      <PageColumn style={{ marginVertical: 8 }}>
        <TextInput
          style={[formStyles.slimTextInput, { flexGrow: 1, marginBottom: 8 }]}
          placeholder={'Enter title here...'}
          placeholderTextColor={'gray'}
          value={formChapter.title}
          onChangeText={(text) => setFormChapter({ ...formChapter, title: text })} />

        <ChapterTypePicker formChapter={formChapter}
          setFormChapter={setFormChapter} />
      </PageColumn>
    )
  } else {
    Header.push(
      <PageRow style={{ flexShrink: 1, width: 300 }}>
        <AppText type={TextType.Subtitle} style={{ fontSize: 18 }}>{chapter.title}</AppText>
      </PageRow>
    );
  }

  if (canDiscard) {
    Header.push(
      <AppText type={TextType.Subtitle2}>
        {mapStoryChapterTypeToText(chapter.chapterType)}
      </AppText>
    );
  }

  Header.push(
    <PageColumn style={{ gap: 4 }}>
      <TagsPicker formChapter={formChapter}
        editing={editing}
        setFormChapter={setFormChapter} />
      <NamesPicker formChapter={formChapter}
        editing={editing}
        setFormChapter={setFormChapter} />
    </PageColumn>
  );

  if (!editing && expanded && !canDiscard) {
    ExpandedLayoutButtons.push(
      <SimpleIconButton iconSrc={AppIcon.ChevronUp}
        title={'Collapse'}
        onClick={onExpandClick}
        small />
    );
  }

  // Building the Body
  if (expanded || editing) {
    const ExpandedLayout = [];

    if (editing) {
      ExpandedLayout.push(
        <TextInput
          style={[formStyles.multiLineTextInput, { height: 240, marginVertical: 8 }]}
          placeholder="Enter note here..."
          placeholderTextColor={'gray'}
          value={formChapter.content}
          multiline
          numberOfLines={8}
          onChangeText={(text) => setFormChapter({ ...formChapter, content: text })} />
      );
    } else if (chapter.content) {
      ExpandedLayout.push(
        <PageRow style={{ flexShrink: 1 }}>
          <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{chapter.content}</AppText>
        </PageRow>
      );
    }

    if (editing) {
      ExpandedLayout.push(
        <PageColumn style={{}}>
          <AppText type={TextType.Body}>
            Questions:
          </AppText>
          <QuestionsPicker formChapter={formChapter}
            setFormChapter={setFormChapter} />
        </PageColumn>
      );
    } else {
      ExpandedLayout.push(
        <PageColumn style={{ marginVertical: 12 }}>
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
        </PageColumn>
      );
    }

    if (expanded && !editing && chapter.originalPrompt) {
      ExpandedLayout.push(
        <PageColumn style={{ marginVertical: 12 }}>
          <AppText type={TextType.Body}>
            Original Prompt:
          </AppText>
          <PageColumn style={{ flexShrink: 1, width: 350 }}>
            <AppText type={TextType.Italic}>
              {chapter.originalPrompt}
            </AppText>
          </PageColumn>
        </PageColumn>
      );
    }

    if (canEdit) {
      if (canDiscard) {
        ExpandedLayoutButtons.push(
          <SimpleCard iconSrc={shouldKeep ? AppIcon.Star : AppIcon.Trash}
            title={shouldKeep ? 'Keeping' : 'Discarding'}
            onClick={onKeepClick} />
        );
      }

      ExpandedLayoutButtons.push(
        <SimpleIconButton iconSrc={AppIcon.Trash}
          title={'Delete'}
          small
          onClick={onDeleteClick} />
      );

      if (editing) {
        ExpandedLayoutButtons.push(
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
        );
      } else {
        ExpandedLayoutButtons.push(
          <SimpleIconButton iconSrc={AppIcon.Pencil}
            title={'Edit'}
            small
            customStyles={{ container: { marginEnd: 8 } }}
            onClick={onEditClick} />
        );
      }
    }

    Body.push(
      <PageColumn style={{ marginBottom: 12 }}>
        {ExpandedLayout.map((item) => item)}
      </PageColumn>
    );
  }

  const Element = (
    <Animated.View style={[gridStyles.itemCard, !shouldKeep && styles.shouldDiscard, { height: getHeight(expanded, editing)}, style]}>
      <PageColumn style={{}}>
        <ScrollLayout style={{ maxHeight: 320 }}>
          <PageRow>
            <PageRow style={{ marginBottom: 8 }}>
              {
                !editing && (
                  <Animated.View entering={FadeInUp.duration(200)} style={{ marginBottom: 8 }}>
                    <Image source={mapStoryChapterTypeToAppIcon(chapter.chapterType)} style={styles.icon} />
                  </Animated.View>
                )
              }

              <PageColumn style={{ width: 380 }}>
                {Header.map((item) => item)}
              </PageColumn>
            </PageRow>
          </PageRow>

          {Body.map((item) => item)}
        </ScrollLayout>

        <PageRow style={[styles.footer]}>
          {ExpandedLayoutButtons.map((item) => item)}
        </PageRow>
      </PageColumn>
    </Animated.View>
  );

  if (expanded) {
    return Element;
  }

  return (
    <TouchableOpacity onPress={onExpandClick}>
      {Element}
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
  footer: {
    marginTop: 12,
    gap: 16,
    flexDirection: 'row',
  },
  stateBtn: {
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
});