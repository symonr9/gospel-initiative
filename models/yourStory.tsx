import { } from "@/enums/enums";

interface IYourStory {
    id: string;
    userId: string;
}

export default class YourStory implements IYourStory {
    id: string;
    userId: string;
    
    constructor(id: string, userId: string
    ) {
        this.id = id;
        this.userId = userId;
    }

}