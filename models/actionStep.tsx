import { ActionStepType } from "@/enums/enums";

interface IActionStep {
    id: string;
    notes: string;
    oneId: string;
    isComplete: boolean;
    targetDate: Date | undefined;
    type: ActionStepType;
}

export default class ActionStep implements IActionStep {
    id: string;
    notes: string;
    oneId: string;
    isComplete: boolean;
    targetDate: Date | undefined;
    type: ActionStepType;
    
    constructor(id: string, notes: string, oneId: string,
        isComplete: boolean, targetDate: Date | undefined, type: ActionStepType
    ) {
        this.id = id;
        this.notes = notes;
        this.oneId = oneId;
        this.isComplete = isComplete;
        this.targetDate = targetDate;
        this.type = type;
    }

}