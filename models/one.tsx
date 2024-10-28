import { AvatarIcon, OneCategory, OneStage, } from "@/enums/enums";
import ActionStep from "./actionStep";
import OneNote from "./oneNote";
import GospelStep from "./gospelStep";
import Christian from "./christian";

interface IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    category: OneCategory;
    knownSince: Date | undefined;
    gospelChecklist: Number[];
    hidden: boolean;
    userId: string;

    actionSteps: ActionStep[];
    oneNotes: OneNote[];
    gospelSteps: GospelStep[];
    christians: Christian[];
}

export default class One implements IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    category: OneCategory;
    knownSince: Date | undefined;
    gospelChecklist: Number[];
    hidden: boolean;
    userId: string;

    actionSteps: ActionStep[];
    oneNotes: OneNote[];
    gospelSteps: GospelStep[];
    christians: Christian[];
    
    constructor(id: string, name: string, icon: AvatarIcon, 
        stage: OneStage, category: OneCategory,
        knownSince: Date | undefined, gospelChecklist: Number[],
        hidden: boolean, userId: string,
        actionSteps: ActionStep[], oneNotes: OneNote[],
        gospelSteps: GospelStep[], christians: Christian[]
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.category = category;
        this.knownSince = knownSince;
        this.gospelChecklist = gospelChecklist;
        this.hidden = hidden;
        this.userId = userId;

        this.actionSteps = actionSteps;
        this.oneNotes = oneNotes;
        this.gospelSteps = gospelSteps;
        this.christians = christians;
    }

}