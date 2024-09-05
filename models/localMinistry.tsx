import { AppIcon } from "@/enums/enums";

interface ILocalMinistry {
    id: string;
    title: string;
    details: string;
    startDate: Date;
    endDate: Date;
    location: string;
    recurring: string;
    isActive: boolean;
    icon: AppIcon;
}

export default class LocalMinistry implements ILocalMinistry {
    id: string;
    title: string;
    details: string;
    startDate: Date;
    endDate: Date;
    location: string;
    recurring: string;
    isActive: boolean;
    icon: AppIcon;

    constructor(id: string, title: string, details: string, startDate: Date, endDate: Date, location: string, 
        recurring: string, isActive: boolean, icon: AppIcon
    ) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.recurring = recurring;
        this.isActive = isActive;
        this.icon = icon;
    }

}