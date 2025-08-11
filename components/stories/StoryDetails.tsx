import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { EnhancedStory } from '@/models/story';
import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { mapStoryChapterTypeToIcon } from "@/utils/iconUtils";
import { halfScreenWidth, standardPaddedWidth } from '@/constants/Dimensions';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemeColors } from '@/constants/Colors';

export type IStoryDetails = {
  activeStory: EnhancedStory | null;
};

function StoryDetails({ activeStory }: IStoryDetails) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [openedChapterIds, setOpenedChapterIds] = useState<string[]>([]);

  const themeColors = useThemeColors();
  const { backgroundColor, secondaryColor } = themeColors;

  useEffect(() => {
    if (!activeStory) {
      return;
    }
    setOpenedChapterIds([]);
  }, [activeStory]);

  useEffect(() => {
    if (expandedCardId === null || openedChapterIds.includes(expandedCardId)) {
      return;
    }
    setOpenedChapterIds(prev => [...prev, expandedCardId]);
  }, [expandedCardId]);

  if (!activeStory) {
    return <></>;
  }

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.timelineContainer}>
        {activeStory.chapters.map((chapter, index) => {
          const isExpanded = expandedCardId === chapter.id;
          const hasBeenOpened = openedChapterIds.includes(chapter.id);

          const icon = (() => {
            if (chapter.icon && chapter.icon !== AppIcon.Book) {
              return chapter.icon;
            }
            return mapStoryChapterTypeToIcon(chapter.chapterType);
          })();

          return (
            <View
              key={chapter.id}
              style={[
                styles.timelineRow,
                {
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                },
              ]}
            >
              <View style={styles.timelineMarker} />
              <TouchableOpacity
                onPress={() => toggleExpand(chapter.id)}
                style={[
                  styles.timelineContent,
                  { backgroundColor: secondaryColor },
                  isExpanded ? styles.expandedContent : null,
                ]}
              >
                <Image source={icon} style={styles.chapterIcon} />
                <AppText type={TextType.Subtitle}>
                  {chapter.title}
                </AppText>
                {
                  isExpanded ? (
                    <>
                      <AppText type={TextType.Default} style={[{ marginBottom: 12 }]}>
                        {chapter.content}
                      </AppText>
                      {
                        chapter.questions.map((question) => (
                          <AppText type={TextType.Italic} style={{ marginBottom: 8 }}>
                            {question}
                          </AppText>
                        ))
                      }
                    </>
                  ) : (
                    <AppText type={TextType.Italic} style={styles.chapterContent}>
                      Tap to Open
                    </AppText>
                  )
                }

              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  timelineContainer: {
    position: 'relative',
    paddingVertical: 16,
  },
  timelineRow: {
    marginBottom: 32,
  },
  timelineContent: {
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    maxWidth: halfScreenWidth,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    marginRight: 16,
    position: 'relative',
  },
  openedContent: {
    opacity: 0.7,
    backgroundColor: '#eeeeee'
  },
  expandedContent: {
    maxWidth: standardPaddedWidth,
  },
  chapterIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  chapterContent: {
    fontSize: 16,
    color: '#666',
  },
  questionsContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8
  },
  timelineMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '47%',
    width: 3,
    backgroundColor: '#ccc',
    zIndex: -1,
  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoryDetails);
