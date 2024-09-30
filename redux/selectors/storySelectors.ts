import { StoryType } from '@/enums/enums';
import Story from '@/models/story';
import StoryChapter from '@/models/storyChapter';
import { createSelector } from 'reselect';
import { selectExecutor } from './userSelectors';

export const selectAllStories = (state: any): Story[] => state.stories.stories;
export const selectAllMyStoryChapters = (state: any): StoryChapter[] => state.stories.myStoryChapters;
export const selectAllGodsStoryChapters = (state: any): StoryChapter[] => state.stories.GodsStoryChapters;

export const selectAllPersonalStories = (state: any): Story[] =>
    selectAllStories(state).filter(story => story.type === StoryType.Personal);

export const selectAllGodsStories = (state: any): Story[] =>
    selectAllStories(state).filter(story => story.type === StoryType.Gods);

export const selectPartionedEnhancedStories = createSelector(
    [selectAllStories, selectAllGodsStoryChapters, selectExecutor],
    (stories, chapters, executor) => {
        const partitionedStories = stories
            .map((story: Story) => {
                const chaptersForStory = chapters
                    .filter((chapter) => chapter.storyId === story.id)
                    .sort((a, b) => b.order < a.order ? 1 : -1);
                return {
                    ...story,
                    chapters: chaptersForStory
                }
            });

        const personalStories = partitionedStories.filter((story) => story.type === StoryType.Personal);
        const GodsStories = partitionedStories.filter((story) => story.type === StoryType.Gods);
        return {
            personalStories,
            GodsStories
        };
    }
);