import { } from "@/enums/enums";

interface IGodsStory {
    id: string;
    userId: string;
}

export default class GodsStory implements IGodsStory {
    id: string;
    userId: string;
    
    constructor(id: string, userId: string
    ) {
        this.id = id;
        this.userId = userId;
    }

}