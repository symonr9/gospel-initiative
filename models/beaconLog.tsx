import { BeaconLogTag } from "@/enums/enums";

interface IBeaconLog {
    id: string;
    note: string;
    date: Date;
    userId: string;
    beaconId: string;
    tags: BeaconLogTag[];
}

export default class BeaconLog implements IBeaconLog {
    id: string;
    note: string;
    date: Date;
    userId: string;
    beaconId: string;
    tags: BeaconLogTag[];

    constructor(id: string, note: string, date: Date,
        userId: string, beaconId: string, tags: BeaconLogTag[]
    ) {
        this.id = id;
        this.note = note;
        this.date = date;
        this.userId = userId;
        this.beaconId = beaconId;
        this.tags = tags;
    }

}