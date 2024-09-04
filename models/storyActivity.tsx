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
    openedChapters: number;
    totalChapters: number;
}

export default class StoryActivity implements IStoryActivity {
    id: string;
    note: string;
    date: Date;
    userId: string;
    storyId: string;
    openedChapters: number;
    totalChapters: number;

    constructor(id: string, note: string, date: Date,
        userId: string, storyId: string, openedChapters: number,
        totalChapters: number
    ) {
        this.id = id;
        this.note = note;
        this.date = date;
        this.userId = userId;
        this.storyId = storyId;
        this.openedChapters = openedChapters;
        this.totalChapters = totalChapters;
    }

    static createStoryActivity(note: string, executor: User,
        story: Story, openedChapters: number, totalChapters: number
    ): StoryActivity {
        return new StoryActivity(
            generateRandomId(),
            note,
            getNow(),
            executor.id,
            story.id,
            openedChapters,
            totalChapters
        );
    }

}