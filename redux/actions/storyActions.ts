import Story from "@/models/story";
import { Action } from "../actions";
import StoryChapter from "@/models/storyChapter";
import { StoryChapterTag, StoryChapterType } from "@/enums/enums";

export const updateChaptersFilter = (tagFilters: StoryChapterTag[], typeFilters: StoryChapterType[] ) => ({
    type: Action.UpdateChaptersFilter,
    payload: { tagFilters, typeFilters },
});

export const setEditingChapterId = (item: string) => ({
    type: Action.SetEditingChapterId,
    payload: item
});