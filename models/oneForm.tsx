import { AvatarIcon } from "@/enums/enums";
import One from "./one";

interface IOneForm {
    name: string;
    icon: AvatarIcon;
}

export default class OneForm implements IOneForm {
    name: string;
    icon: AvatarIcon;

    constructor(name: string, icon: AvatarIcon
    ) {
        this.name = name;
        this.icon = icon;
    }

    static createDefault() {
        return new OneForm(
            "",
            AvatarIcon.Man1
        );
    }

    static createFromOne(one: One) {
        if (!one) {
            return this.createDefault();
        }
        
        return new OneForm(
            one.name,
            one.icon
        );
    }

}