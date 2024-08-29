import { AppIcon, Priority, OneFactType } from "@/enums/enums";

interface IOneFact {
    id: string;
    oneId: string;
    notes: string;
    icon: AppIcon;
    priority: Priority;
    type: OneFactType;
}

export default class OneFact implements IOneFact {
    id: string;
    oneId: string;
    notes: string;
    icon: AppIcon;
    priority: Priority;
    type: OneFactType;
    
    constructor(id: string, oneId: string, notes: string, 
        priority: Priority, type: OneFactType, icon: AppIcon
    ) {
        this.id = id;
        this.oneId = oneId;
        this.notes = notes;
        this.priority = priority;
        this.type = type;
        this.icon = icon;
    }

}