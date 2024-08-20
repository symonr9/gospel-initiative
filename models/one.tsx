import { AvatarIcon, OneStage, } from "@/enums/enums";
import Meeting from "./meeting";
import Prayer from "./prayer";
import ActionStep from "./actionStep";
import OneFact from "./oneFact";

interface IOne {
    id: string;
    name: string;
    icon: AvatarIcon;
    stage: OneStage;
    nextMeetingAt: Date | undefined;
    meetings: Meeting[];
    prayers: Prayer[];
    actionSteps: ActionStep[];
    facts: OneFact[];
    prayingSince: Date;
    hidden: boolean;
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
    facts: OneFact[];
    prayingSince: Date;
    hidden: boolean;
    
    constructor(id: string, name: string, icon: AvatarIcon, stage: OneStage,
        nextMeetingAt: Date | undefined, meetings: Meeting[], prayers: Prayer[],
        actionSteps: ActionStep[], facts: OneFact[], prayingSince: Date,
        hidden: boolean
    ) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.stage = stage;
        this.nextMeetingAt = nextMeetingAt;
        this.meetings = meetings;
        this.prayers = prayers;
        this.actionSteps = actionSteps;
        this.facts = facts;
        this.prayingSince = prayingSince;
        this.hidden = hidden;
    }

}