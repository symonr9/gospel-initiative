import { IOne } from "@/interfaces/interfaces";

import { AvatarIcon } from "@/enums/enums";

export default class One implements IOne {
    id: string;
    name: string;
    icon: AvatarIcon | undefined;
    
    constructor(id: string, name: string, icon: AvatarIcon | undefined) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }
}