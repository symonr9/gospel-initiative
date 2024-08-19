import { StoryChapterType } from "@/enums/enums";

interface IStoryChapter {
    id: string;
    storyId: string;
    type: StoryChapterType;
}

export default class StoryChapter implements IStoryChapter {
    id: string;
    storyId: string;
    type: StoryChapterType;
    
    constructor(id: string, storyId: string, type: StoryChapterType
    ) {
        this.id = id;
        this.storyId = storyId;
        this.type = type;
    }

}