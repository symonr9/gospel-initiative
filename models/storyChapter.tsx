import { StoryChapterType, StoryType, AppIcon } from "@/enums/enums";

interface IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    title: string;
    content: string;
    icon: AppIcon;
    order: number;
}

export default class StoryChapter implements IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    title: string;
    content: string;
    icon: AppIcon;
    order: number;
    
    constructor(id: string, storyId: string, chapterType: StoryChapterType,
        title: string, content: string, icon: AppIcon, order: number
    ) {
        this.id = id;
        this.storyId = storyId;
        this.chapterType = chapterType;
        this.title = title;
        this.content = content;
        this.icon = icon;
        this.order = order;
    }

}