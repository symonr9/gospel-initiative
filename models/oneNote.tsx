import { AppIcon, OneNoteType } from "@/enums/enums";
import { generateRandomId } from "@/utils/appUtils";

interface IOneNote {
    id: string;
    type: OneNoteType;
    date: Date;
    notes: string;
    oneId: string;
}

type PartitionedNotes = {
    [key in OneNoteType]?: OneNote[];
};


export default class OneNote implements IOneNote {
    id: string;
    type: OneNoteType;
    date: Date;
    notes: string;
    oneId: string;
    
    constructor(id: string, type: OneNoteType, date: Date, 
        notes: string, oneId: string) {
        this.id = id;
        this.type = type;
        this.date = date;
        this.notes = notes;
        this.oneId = oneId;
    }

    static createDefault(oneId: string) {
        return new OneNote(
            generateRandomId(),
            OneNoteType.InterestsHobbiesGoals,
            new Date(),
            "",
            oneId
        );
    }

    static partitionNotes(notes: OneNote[]) : PartitionedNotes {
        return notes.reduce<PartitionedNotes>((acc, note) => {
            if (!acc[note.type]) {
                acc[note.type] = [];
            }
            acc[note.type]?.push(note);
            return acc;
        }, {});
    }

}