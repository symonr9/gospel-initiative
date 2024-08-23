import { StoryChapterType, StoryType, AppIcon } from "@/enums/enums";

interface IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    title: string;
    content: string;
    icon: AppIcon;
    order: number;
    isEssential: boolean;
}

export default class StoryChapter implements IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    title: string;
    content: string;
    icon: AppIcon;
    order: number;
    isEssential: boolean;
    
    constructor(id: string, storyId: string, chapterType: StoryChapterType,
        title: string, content: string, icon: AppIcon, order: number,
        essential: boolean
    ) {
        this.id = id;
        this.storyId = storyId;
        this.chapterType = chapterType;
        this.title = title;
        this.content = content;
        this.icon = icon;
        this.order = order;
        this.isEssential = essential;
    }

}