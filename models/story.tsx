import { AppIcon, StoryType } from "@/enums/enums";
import StoryChapter from "./storyChapter";
import User from "./user";

export type EnhancedStory = Story & {
    chapters: StoryChapter[];
    user: User;
}


interface IStory {
    id: string;
    userId: string;
    title: string;
    type: StoryType;
    icon: AppIcon;
}

export default class Story implements IStory {
    id: string;
    userId: string;
    title: string;
    type: StoryType;
    icon: AppIcon;
    
    constructor(id: string, userId: string, type: StoryType,
        title: string, icon: AppIcon
    ) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.title = title;
        this.icon = icon;
    }

}