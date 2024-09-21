import { AvatarIcon, OneCategory, OneStage, } from "@/enums/enums";

interface IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    category: OneCategory;
    prayingSince: Date | undefined;
    gospelChecklist: Number[];
    hidden: boolean;
    userId: string;
}

export default class One implements IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    category: OneCategory;
    prayingSince: Date | undefined;
    gospelChecklist: Number[];
    hidden: boolean;
    userId: string;
    
    constructor(id: string, name: string, icon: AvatarIcon, 
        stage: OneStage, category: OneCategory,
        prayingSince: Date | undefined,
        gospelChecklist: Number[],
        hidden: boolean, userId: string
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.category = category;
        this.prayingSince = prayingSince;
        this.gospelChecklist = gospelChecklist;
        this.hidden = hidden;
        this.userId = userId;
    }

}