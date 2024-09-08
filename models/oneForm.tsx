import { AvatarIcon, OneStage } from "@/enums/enums";
import One from "./one";
import ActionStep from "./actionStep";

interface IOneForm {
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    actionSteps: ActionStep[];
}

export default class OneForm implements IOneForm {
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    actionSteps: ActionStep[];

    constructor(name: string, icon: AvatarIcon, stage: OneStage,
        actionSteps: ActionStep[]
    ) {
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.actionSteps = actionSteps;
    }

    static createDefault() {
        return new OneForm(
            "",
            AvatarIcon.Man1,
            OneStage.Curious,
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
            actionSteps
        );
    }

}