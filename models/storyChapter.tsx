import { StoryChapterType, StoryType, AppIcon, StoryChapterTag } from "@/enums/enums";

interface IStoryChapter {
    id: string;
    storyId: string;
    chapterType: StoryChapterType;
    title: string;
    content: string;
    questions: string[];
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
    questions: string[];
    icon: AppIcon;
    order: number;
    tags: StoryChapterTag[];
    isEssential: boolean;
    
    constructor(id: string, storyId: string, chapterType: StoryChapterType,
        title: string, content: string, questions: string[], icon: AppIcon, 
        order: number, tags: StoryChapterTag[], essential: boolean,
    ) {
        this.id = id;
        this.storyId = storyId;
        this.chapterType = chapterType;
        this.title = title;
        this.content = content;
        this.questions = questions;
        this.icon = icon;
        this.order = order;
        this.tags = tags;
        this.isEssential = essential;
    }

}