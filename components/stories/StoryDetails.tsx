import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Animated, LayoutAnimation } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { EnhancedStory } from '@/models/story';
import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { mapStoryChapterTypeToAppIcon } from '@/utils/appUtils';
import { StoryLayoutType } from './MyStoriesLayout';

export type IStoryDetails = {
  activeStory: EnhancedStory | null;
  activeLayoutType: StoryLayoutType;
};

function StoryDetails({ activeStory, activeLayoutType }: IStoryDetails) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [openedChapterIds, setOpenedChapterIds] = useState<string[]>([]);

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

  if (!activeStory || activeLayoutType !== StoryLayoutType.Normal) {
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
            return mapStoryChapterTypeToAppIcon(chapter.chapterType);
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
                  hasBeenOpened && !isExpanded ? styles.openedContent : null,
                  isExpanded ? styles.expandedContent : null,
                ]}
              >
                <Image source={icon} style={styles.chapterIcon} />
                <AppText type={TextType.BodyBold} style={styles.chapterTitle}>
                  {chapter.title}
                </AppText>
                {
                  isExpanded ? (
                    <>
                      <AppText type={TextType.Body} style={[styles.chapterContent, { marginBottom: 12 }]}>
                        {chapter.content}
                      </AppText>
                      {
                        chapter.questions.map((question) => (
                          <AppText type={TextType.Italic} style={styles.questionsContent}>
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
    padding: 16,
  },
  timelineContainer: {
    position: 'relative',
    paddingVertical: 16,
  },
  timelineRow: {
    marginBottom: 32,
  },
  timelineContent: {
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    maxWidth: '45%',
    backgroundColor: '#FFF',
    paddingHorizontal: 28,
    marginHorizontal: 4,
    marginRight: 16,
    position: 'relative',
  },
  openedContent: {
    opacity: 0.7,
    backgroundColor: '#eeeeee'
  },
  expandedContent: {
    maxWidth: '90%',
  },
  chapterIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
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
