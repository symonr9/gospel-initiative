import { AvatarIcon, OneStage } from "@/enums/enums";
import Meeting from "./meeting";
import Prayer from "./prayer";

interface IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    nextMeetingAt: Date | undefined;
    meetings: Meeting[];
    prayers: Prayer[];
}

export default class One implements IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    nextMeetingAt: Date | undefined;
    meetings: Meeting[];
    prayers: Prayer[];
    
    constructor(id: string, name: string, icon: AvatarIcon, stage: OneStage,
        nextMeetingAt: Date | undefined, meetings: Meeting[], prayers: Prayer[]
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.nextMeetingAt = nextMeetingAt;
        this.meetings = meetings;
        this.prayers = prayers;
    }

}