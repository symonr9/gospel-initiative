import { StoryType } from "@/enums/enums";

interface IYourStory {
    id: string;
    userId: string;
    type: StoryType;
}

export default class YourStory implements IYourStory {
    id: string;
    userId: string;
    type: StoryType;
    
    constructor(id: string, userId: string, type: StoryType
    ) {
        this.id = id;
        this.userId = userId;
        this.type = type;
    }

}