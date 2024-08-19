import { MeetingTag, Location } from "@/enums/enums";

interface IMeeting {
    id: string;
    meetingDate: Date;
    notes: string;
    oneId: string;
    userId: string;
    tags: MeetingTag[];
    location: Location;
}

export default class Meeting implements IMeeting {
    id: string;
    meetingDate: Date;
    notes: string;
    oneId: string;
    userId: string;
    tags: MeetingTag[];
    location: Location;

    constructor(id: string, date: Date, notes: string, oneId: string,
        userId: string, tags: MeetingTag[], location: Location
    ) {
        this.id = id;
        this.meetingDate = date;
        this.notes = notes;
        this.oneId = oneId;
        this.userId = userId;
        this.tags = tags;
        this.location = location;
    }
}