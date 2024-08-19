import { StoryChapterType, StoryType, AppIcon } from "@/enums/enums";

interface IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    storyType: StoryType;
    title: string;
    notes: string;
    icon: AppIcon;
    order: number;
}

export default class StoryChapter implements IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    storyType: StoryType;
    title: string;
    notes: string;
    icon: AppIcon;
    order: number;
    
    constructor(id: string, storyId: string, chapterType: StoryChapterType,
        storyType: StoryType, title: string, notes: string, icon: AppIcon,
        order: number
    ) {
        this.id = id;
        this.storyId = storyId;
        this.chapterType = chapterType;
        this.storyType = storyType;
        this.title = title;
        this.notes = notes;
        this.icon = icon;
        this.order = order;
    }

}