import { AppIcon } from "@/enums/enums";

interface IPrompt {
    id: string;
    userId: string;
    title: string;
    notes: string;
    icon: AppIcon;
    order: number;
}

export default class Prompt implements IPrompt {
    id: string;
    userId: string;
    title: string;
    notes: string;
    icon: AppIcon;
    order: number;
    
    constructor(id: string, userId: string, title: string,
        notes: string, icon: AppIcon, order: number
    ) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.notes = notes;
        this.icon = icon;
        this.order = order;
    }

}