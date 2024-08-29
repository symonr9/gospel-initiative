import { ActivityType } from "@/enums/enums";

interface IActivity {
    id: string;
    name: string;
    hours: number;
    date: Date;
    userId: string;
    beaconId: string | null;
    localEventId: string | null;
    localMinistryId: string | null;
    missionsTripId: string | null;
    type: ActivityType;
}

export default class Activity implements IActivity {
    id: string;
    name: string;
    hours: number;
    date: Date;
    userId: string;
    beaconId: string | null;
    localEventId: string | null;
    localMinistryId: string | null;
    missionsTripId: string | null;
    type: ActivityType

    constructor(id: string, name: string, hours: number, date: Date,
        localEventId: string | null, localMinistryId: string | null, missionsTripId: string | null,
        userId: string, beaconId: string | null, type: ActivityType
    ) {
        this.id = id;
        this.name = name;
        this.hours = hours;
        this.date = date;
        this.localEventId = localEventId;
        this.localMinistryId = localMinistryId;
        this.missionsTripId = missionsTripId;
        this.userId = userId;
        this.beaconId = beaconId;
        this.type = type;
    }

}