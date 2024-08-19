import One from "./one";

interface IMeeting {
    id: string;
    meetingDate: Date;
    notes: string;
    oneId: string;
    userId: string;
    didMakeDecisionForJesus: boolean;
}

export default class Meeting implements IMeeting {
    id: string;
    meetingDate: Date;
    notes: string;
    oneId: string;
    userId: string;
    didMakeDecisionForJesus: boolean;

    constructor(id: string, date: Date, notes: string, oneId: string,
        userId: string, didMakeDecisionForJesus: boolean
    ) {
        this.id = id;
        this.meetingDate = date;
        this.notes = notes;
        this.oneId = oneId;
        this.userId = userId;
        this.didMakeDecisionForJesus = didMakeDecisionForJesus;
    }
}