import { StoryChapterType, StoryType, StoryChapterIcon } from "@/enums/enums";

interface IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    storyType: StoryType;
    title: string;
    notes: string;
    icon: StoryChapterIcon;
}

export default class StoryChapter implements IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    storyType: StoryType;
    title: string;
    notes: string;
    icon: StoryChapterIcon;
    
    constructor(id: string, storyId: string, chapterType: StoryChapterType,
        storyType: StoryType, title: string, notes: string, icon: StoryChapterIcon
    ) {
        this.id = id;
        this.storyId = storyId;
        this.chapterType = chapterType;
        this.storyType = storyType;
        this.title = title;
        this.notes = notes;
        this.icon = icon;
    }

}