import { generateRandomId, getNow } from "@/utils/appUtils";
import Beacon from "./beacon";
import User from "./user";
import Story from "./story";


export type ActivityWithUser = StoryActivity & {
    user: User | null;
};

interface IStoryActivity {
    id: string;
    note: string;
    date: Date;
    userId: string;
    storyId: string;
}

export default class StoryActivity implements IStoryActivity {
    id: string;
    note: string;
    date: Date;
    userId: string;
    storyId: string;

    constructor(id: string, note: string, date: Date,
        userId: string, storyId: string
    ) {
        this.id = id;
        this.note = note;
        this.date = date;
        this.userId = userId;
        this.storyId = storyId;
    }

    static createStoryActivity(note: string, executor: User,
        story: Story
    ): StoryActivity {
        return new StoryActivity(
            generateRandomId(),
            note,
            getNow(),
            executor.id,
            story.id
        );
    }

}