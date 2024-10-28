import { AppIcon, OneNoteType } from "@/enums/enums";

interface IOneNote {
    id: string;
    type: OneNoteType;
    notes: string;
    oneId: string;
}

export default class OneNote implements IOneNote {
    id: string;
    type: OneNoteType;
    notes: string;
    oneId: string;
    
    constructor(id: string, type: OneNoteType, notes: string,
        oneId: string) {
        this.id = id;
        this.type = type;
        this.notes = notes;
        this.oneId = oneId;
    }

}