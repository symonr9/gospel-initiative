import Story from "@/models/story";
import { Action } from "../actions";
import StoryChapter from "@/models/storyChapter";

export const addStory = (item: Story) => ({
    type: Action.AddStory,
    payload: item,
});

export const AddStoryChapters = (item: StoryChapter) => ({
    type: Action.AddStoryChapter,
    payload: item,
});