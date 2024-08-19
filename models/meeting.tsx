import { MeetingTag } from "@/enums/enums";

interface IMeeting {
    id: string;
    meetingDate: Date;
    notes: string;
    oneId: string;
    userId: string;
    tags: MeetingTag[];
}

export default class Meeting implements IMeeting {
    id: string;
    meetingDate: Date;
    notes: string;
    oneId: string;
    userId: string;
    tags: MeetingTag[];

    constructor(id: string, date: Date, notes: string, oneId: string,
        userId: string, tags: MeetingTag[]
    ) {
        this.id = id;
        this.meetingDate = date;
        this.notes = notes;
        this.oneId = oneId;
        this.userId = userId;
        this.tags = tags;
    }
}