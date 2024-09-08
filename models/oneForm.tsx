import { AvatarIcon, OneStage } from "@/enums/enums";
import One from "./one";

interface IOneForm {
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
}

export default class OneForm implements IOneForm {
    name: string;
    icon: AvatarIcon;
    stage: OneStage;

    constructor(name: string, icon: AvatarIcon, stage: OneStage
    ) {
        this.name = name;
        this.icon = icon;
        this.stage = stage;
    }

    static createDefault() {
        return new OneForm(
            "",
            AvatarIcon.Man1,
            OneStage.Curious
        );
    }

    static createFromOne(one: One) {
        if (!one) {
            return this.createDefault();
        }

        return new OneForm(
            one.name,
            one.icon,
            one.stage
        );
    }

}