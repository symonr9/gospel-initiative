import { AppIcon, GospelStepLayoutType, GospelStepType } from "@/enums/enums";
import { generateRandomId } from "@/utils/appUtils";

interface IGospelStep {
    id: string;
    date: Date;
    type: GospelStepType;
    layoutType: GospelStepLayoutType;
    notes: string | undefined;
    nextSteps: string | undefined;
    rating: number;
    oneId: string;
}

export default class GospelStep implements IGospelStep {
    id: string;
    date: Date;
    type: GospelStepType;
    layoutType: GospelStepLayoutType;
    notes: string | undefined;
    nextSteps: string | undefined;
    rating: number;
    oneId: string;
    
    constructor(id: string, date: Date, type: GospelStepType,
        layoutType: GospelStepLayoutType, notes: string | undefined, 
        nextSteps: string | undefined, rating: number, oneId: string) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.layoutType = layoutType;
        this.notes = notes;
        this.nextSteps = nextSteps;
        this.rating = rating;
        this.oneId = oneId;
    }

    static createDefault(oneId: string): GospelStep {
        return new GospelStep(
            generateRandomId(),
            new Date(),
            GospelStepType.GodIsReal,
            GospelStepLayoutType.Binary,
            "",
            "",
            1,
            oneId
        );
    }

}