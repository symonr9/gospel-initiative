import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Animated, LayoutAnimation } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { EnhancedStory } from '@/models/story';
import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { mapStoryChapterTypeToAppIcon } from '@/utils/appUtils';

export type IShareChristStoryDetails = {
  activeStory: EnhancedStory | null;
};

function ShareChristStoryDetails({ activeStory }: IShareChristStoryDetails) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (!activeStory) {
    return <></>;
  }

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.timelineContainer}>
        {activeStory.chapters.map((chapter, index) => {
          const isExpanded = expandedCard === chapter.id;

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
                styles.timelineItem,
                { flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' },
              ]}
            >
              <View style={styles.timelineMarker} />
              <TouchableOpacity
                onPress={() => toggleExpand(chapter.id)}
                style={[
                  styles.timelineContent,
                  isExpanded ? styles.expandedContent : null,
                ]}
              >
                <Image source={icon} style={styles.chapterIcon} />
                <AppText type={TextType.BodyBold} style={styles.chapterTitle}>
                  {chapter.title}
                </AppText>
                {
                    isExpanded ? (
                        <AppText type={TextType.Body} style={styles.chapterContent}>
                            {chapter.content}
                        </AppText>
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
    backgroundColor: '#f7f7f7',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timelineContainer: {
    position: 'relative',
    paddingVertical: 16,
  },
  timelineItem: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  timelineContent: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    maxWidth: '45%',
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
  timelineMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 2,
    backgroundColor: '#ccc',
    zIndex: -1,
  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristStoryDetails);
