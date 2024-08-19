import { AvatarIcon, OneStage } from "@/enums/enums";
import Meeting from "./meeting";
import Prayer from "./prayer";
import ActionStep from "./actionStep";

interface IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    nextMeetingAt: Date | undefined;
    meetings: Meeting[];
    prayers: Prayer[];
    actionSteps: ActionStep[];
}

export default class One implements IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    nextMeetingAt: Date | undefined;
    meetings: Meeting[];
    prayers: Prayer[];
    actionSteps: ActionStep[];
    
    constructor(id: string, name: string, icon: AvatarIcon, stage: OneStage,
        nextMeetingAt: Date | undefined, meetings: Meeting[], prayers: Prayer[],
        actionSteps: ActionStep[]
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.nextMeetingAt = nextMeetingAt;
        this.meetings = meetings;
        this.prayers = prayers;
        this.actionSteps = actionSteps;
    }

}