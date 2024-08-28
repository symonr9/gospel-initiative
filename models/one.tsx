import { AvatarIcon, OneStage, } from "@/enums/enums";

interface IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    nextMeetingAt: Date | undefined;
    prayingSince: Date | undefined;
    hidden: boolean;
    userId: string;
}

export default class One implements IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    nextMeetingAt: Date | undefined;
    prayingSince: Date | undefined;
    hidden: boolean;
    userId: string;
    
    constructor(id: string, name: string, icon: AvatarIcon, stage: OneStage,
        nextMeetingAt: Date | undefined, prayingSince: Date | undefined,
        hidden: boolean, userId: string
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.nextMeetingAt = nextMeetingAt;
        this.prayingSince = prayingSince;
        this.hidden = hidden;
        this.userId = userId;
    }

}