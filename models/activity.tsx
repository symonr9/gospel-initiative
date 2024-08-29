interface IActivity {
    id: string;
    name: string;
    hours: number;
    date: Date;
    localEventId: string;
    localMinistryId: string;
    missionsTripId: string;
}

export default class Activity implements IActivity {
    id: string;
    name: string;
    hours: number;
    date: Date;
    localEventId: string;
    localMinistryId: string;
    missionsTripId: string;

    constructor(id: string, name: string, hours: number, date: Date,
        localEventId: string, localMinistryId: string, missionsTripId: string
    ) {
        this.id = id;
        this.name = name;
        this.hours = hours;
        this.date = date;
        this.localEventId = localEventId;
        this.localMinistryId = localMinistryId;
        this.missionsTripId = missionsTripId;
    }

}