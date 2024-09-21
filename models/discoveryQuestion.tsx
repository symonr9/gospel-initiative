import { AppIcon, MissionalLivingWheelStep } from "@/enums/enums";

interface IDiscoveryQuestion {
    title: string;
    stepType: MissionalLivingWheelStep;
    icon: AppIcon;
}

export default class DiscoveryQuestion implements IDiscoveryQuestion {
    title: string;
    stepType: MissionalLivingWheelStep;
    icon: AppIcon;

    constructor(title: string, stepType: MissionalLivingWheelStep, icon: AppIcon
    ) {
        this.title = title;
        this.stepType = stepType;
        this.icon = icon;
    }

}