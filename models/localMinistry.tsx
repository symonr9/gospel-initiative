import { AppIcon } from "@/enums/enums";

interface ILocalMinistry {
    id: string;
    title: string;
    details: string;
    icon: AppIcon;
}

export default class LocalMinistry implements ILocalMinistry {
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