
import React, { useState } from 'react';
import { type ViewProps, StyleSheet, TextInput, Alert } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { AppText, TextType } from '../common/AppText';
import { mapStoryChapterQualityToText, mapStoryChapterTypeToAppIcon, mapStoryChapterTypeToText, shouldKeepChapter } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import StoryChapter from '@/models/storyChapter';
import { PageChip } from '../common/PageChip';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import ScrollLayout from '../common/ScrollLayout';
import { SimpleCard } from '../common/SimpleCard';
import { formStyles } from '@/styles/Styles';
import { QuestionsPicker } from './QuestionsPicker';
import TagsPicker from './TagsPicker';
import NamesPicker from './NamesPicker';
import User from '@/models/user';
import { deleteChapter, updateChapter } from '@/requests/Requests';
import ChapterTypePicker from './ChapterTypePicker';

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
  refreshData: Function;
};

function getHeight(expanded: Boolean, editing: Boolean) {
  if (editing) return 800;
  if (expanded) return 500;
  return 150;
}

export function StoryChapterCard({ chapter, setChapterArray, setEditingChapterId,
  editing = false, canEdit = true, expandOnLoad = false, canDiscard = false, executor,
  setAppError, refreshData, style }: IStoryChapterCard) {
  const [expanded, setExpanded] = useState(expandOnLoad);
  const [formChapter, setFormChapter] = useState(chapter);
  const shouldKeep = shouldKeepChapter(chapter.quality);

  const Header = [];
  const Body = [];

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
      const response = await updateChapter(formChapter, executor.id);
      if (response.error) {
        setAppError(new Error('Error updating chapter: ', response.error));
        return;
      }
      refreshData();
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
              const response = await deleteChapter(formChapter, executor.id);
              if (response.error) {
                setAppError(new Error('Error deleting chapter: ', response.error));
                return;
              }
              refreshData();
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
      <PageRow style={{ flexShrink: 1, width: 270 }}>
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
    <PageColumn style={{ gap: 16 }}>
      <TagsPicker formChapter={formChapter}
        editing={editing}
        setFormChapter={setFormChapter} />
      <NamesPicker formChapter={formChapter}
        editing={editing}
        setFormChapter={setFormChapter} />
    </PageColumn>
  );

  // Building the Body
  if (expanded) {
    const ExpandedLayout = [];

    if (editing) {
      ExpandedLayout.push(
        <TextInput
          style={[formStyles.multiLineTextInput, { height: 240, width: 300, marginVertical: 8 }]}
          placeholder="Enter note here..."
          placeholderTextColor={'gray'}
          value={formChapter.content}
          multiline
          numberOfLines={8}
          onChangeText={(text) => setFormChapter({ ...formChapter, content: text })} />
      );
    } else if (chapter.content) {
      ExpandedLayout.push(
        <ScrollLayout style={{ maxHeight: 150, marginVertical: 12 }}>
          <PageRow style={{ flexShrink: 1, width: 360, }}>
            <AppText type={TextType.Default} style={{ marginBottom: 0 }}>{chapter.content}</AppText>
          </PageRow>
        </ScrollLayout>
      );
    }

    if (editing) {
      ExpandedLayout.push(
        <>
          <AppText type={TextType.Body}>
            Questions:
          </AppText>
          <QuestionsPicker formChapter={formChapter}
            setFormChapter={setFormChapter} />
        </>
      );
    } else {
      ExpandedLayout.push(
        <>
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
        </>
      );
    }

    ExpandedLayout.push(
      <PageRow style={{ marginTop: 8 }}>
        <PageChip title={`Quality: ${mapStoryChapterQualityToText(chapter.quality)}`}
          style={{ backgroundColor: '#d0e0e3' }}
          small />
      </PageRow>
    );

    if (canEdit) {
      const ExpandedLayoutButtons = [];

      if (canDiscard) {
        ExpandedLayoutButtons.push(
          <SimpleCard iconSrc={shouldKeep ? AppIcon.Star : AppIcon.Trash}
            title={shouldKeep ? 'Keeping' : 'Discarding'}
            onClick={onKeepClick} />
        );
      }

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

        ExpandedLayoutButtons.push(
          <SimpleIconButton iconSrc={AppIcon.Trash}
            title={'Delete'}
            small
            onClick={onDeleteClick} />
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

      ExpandedLayout.push(
        <PageRow spaceBetween style={[styles.footer, !canDiscard && { flexDirection: 'row-reverse' }]}>
          {ExpandedLayoutButtons.map((item) => item)}
        </PageRow>
      );
    }

    Body.push(
      <PageColumn style={{ marginBottom: 12 }}>
        {ExpandedLayout.map((item) => item)}
      </PageColumn>
    );
  }

  return (
    <Animated.View style={[styles.chapterCard, !shouldKeep && styles.shouldDiscard, { height: getHeight(expanded, editing)}, style]}>
      <PageColumn style={{ gap: 8 }}>
        <PageRow>
          <PageRow style={{ marginBottom: 8 }}>
            {
              !editing && (
                <Animated.View entering={FadeInUp.duration(200)} style={{ marginBottom: 8 }}>
                  <Image source={mapStoryChapterTypeToAppIcon(chapter.chapterType)} style={styles.icon} />
                </Animated.View>
              )
            }

            <PageColumn>
              {Header.map((item) => item)}
            </PageColumn>
          </PageRow>

          <PageRow spaceEvenly style={[{ marginLeft: 20, marginRight: 4 }, editing && { opacity: 0 }]}>
            <SimpleIconButton iconSrc={expanded ? AppIcon.ChevronUp : AppIcon.ChevronDown}
              onClick={onExpandClick}
              small />
          </PageRow>
        </PageRow>

        <PageColumn style={styles.bodyContainer}>
          {Body.map((item) => item)}
        </PageColumn>

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
    marginTop: 12,
    flexDirection: 'row',
  },
  stateBtn: {
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  bodyContainer: {
  },
});