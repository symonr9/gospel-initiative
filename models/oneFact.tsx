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
        icon: AppIcon, priority: Priority, type: OneFactType
    ) {
        this.id = id;
        this.oneId = oneId;
        this.notes = notes;
        this.icon = icon;
        this.priority = priority;
        this.type = type;
    }

}