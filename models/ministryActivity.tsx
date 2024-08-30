
interface IMinistryActivity {
    id: string;
    note: string;
    hours: number;
    date: Date;
    userId: string;
    localEventId: string | null;
    localMinistryId: string | null;
    missionsTripId: string | null;
}

export default class MinistryActivity implements IMinistryActivity {
    id: string;
    note: string;
    hours: number;
    date: Date;
    userId: string;
    localEventId: string | null;
    localMinistryId: string | null;
    missionsTripId: string | null;

    constructor(id: string, note: string, hours: number, date: Date,
        localEventId: string | null, localMinistryId: string | null, missionsTripId: string | null,
        userId: string
    ) {
        this.id = id;
        this.note = note;
        this.hours = hours;
        this.date = date;
        this.localEventId = localEventId;
        this.localMinistryId = localMinistryId;
        this.missionsTripId = missionsTripId;
        this.userId = userId;
    }

}