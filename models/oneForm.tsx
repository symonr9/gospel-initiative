import { AvatarIcon, OneCategory, OneStage } from "@/enums/enums";
import One from "./one";
import ActionStep from "./actionStep";

interface IOneForm {
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    category: OneCategory;
    actionSteps: ActionStep[];
}

export default class OneForm implements IOneForm {
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    category: OneCategory;
    actionSteps: ActionStep[];
    gospelChecklist: Number[];

    constructor(name: string, icon: AvatarIcon, stage: OneStage,
        category: OneCategory, actionSteps: ActionStep[],
        gospelChecklist: Number[]
    ) {
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.category = category;
        this.actionSteps = actionSteps;
        this.gospelChecklist = gospelChecklist;
    }

    static createDefault() {
        return new OneForm(
            "",
            AvatarIcon.User,
            OneStage.Curious,
            OneCategory.CloseFriend,
            [],
            []
        );
    }

    static createFromOne(one: One, actionSteps: ActionStep[]) {
        if (!one) {
            return this.createDefault();
        }

        return new OneForm(
            one.name,
            one.icon,
            one.stage,
            one.category,
            actionSteps,
            one.gospelChecklist
        );
    }

}