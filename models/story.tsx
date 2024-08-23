import { StoryType } from "@/enums/enums";

interface IStory {
    id: string;
    userId: string;
    title: string;
    type: StoryType;
}

export default class Story implements IStory {
    id: string;
    userId: string;
    title: string;
    type: StoryType;
    
    constructor(id: string, userId: string, type: StoryType,
        title: string
    ) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.title = title;
    }

}