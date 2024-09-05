import { AppIcon } from "@/enums/enums";

interface IMissionsTrip {
    id: string;
    title: string;
    details: string;
    startDate: Date;
    endDate: Date;
    location: string;
    icon: AppIcon;
}

export default class MissionsTrip implements IMissionsTrip {
    id: string;
    title: string;
    details: string;
    startDate: Date;
    endDate: Date;
    location: string;
    icon: AppIcon;

    constructor(id: string, title: string, details: string, startDate: Date, endDate: Date, location: string, icon: AppIcon
    ) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.icon = icon;
    }
}