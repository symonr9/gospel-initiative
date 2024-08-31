import { AppIcon, BeaconType } from "@/enums/enums";

interface IBeaconTemplate {
    id: string;
    name: string;
    message: string;
    icon: AppIcon;
    type: BeaconType;
}

export default class BeaconTemplate implements IBeaconTemplate {
    id: string;
    name: string;
    message: string;
    icon: AppIcon;
    type: BeaconType;

    constructor(id: string, name: string, message: string, icon: AppIcon, type: BeaconType) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.icon = icon;
        this.type = type;
    }
}