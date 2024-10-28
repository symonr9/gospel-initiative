import { AppIcon, GospelStepType } from "@/enums/enums";

interface IGospelStep {
    id: string;
    date: Date;
    type: GospelStepType;
    notes: string | undefined;
    nextSteps: string | undefined;
    oneId: string;
}

export default class GospelStep implements IGospelStep {
    id: string;
    date: Date;
    type: GospelStepType;
    notes: string | undefined;
    nextSteps: string | undefined;
    oneId: string;
    
    constructor(id: string, date: Date, type: GospelStepType,
        notes: string | undefined, nextSteps: string | undefined,
        oneId: string) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.notes = notes;
        this.nextSteps = nextSteps;
        this.oneId = oneId;
    }

}