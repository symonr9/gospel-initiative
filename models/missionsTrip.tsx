import { AppIcon } from "@/enums/enums";

interface IMissionsTrip {
    id: string;
    title: string;
    details: string;
    icon: AppIcon;
}

export default class MissionsTrip implements IMissionsTrip {
    id: string;
    title: string;
    details: string;
    icon: AppIcon;

    constructor(id: string, title: string, details: string, icon: AppIcon
    ) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.icon = icon;
    }
}