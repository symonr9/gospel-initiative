import { JournalEntryType } from "@/enums/enums";

interface IJournalEntry {
    id: string;
    type: string;
    details: string;
    userId: string;
    entryType: JournalEntryType;
    createdAt: Date;
}

export default class JournalEntry implements IJournalEntry {
    id: string;
    type: string;
    details: string;
    userId: string;
    entryType: JournalEntryType;
    createdAt: Date;
    
    constructor(id: string, type: string, details: string, userId: string,
        entryType: JournalEntryType, createdAt: Date
    ) {
        this.id = id;
        this.type = type;
        this.details = details;
        this.userId = userId;
        this.entryType = entryType;
        this.createdAt = createdAt;
    }

}