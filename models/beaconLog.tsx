import { BeaconLogTag } from "@/enums/enums";
import User from "./user";
import Beacon from "./beacon";
import { generateRandomId, getNow, getTomorrow } from "@/utils/appUtils";

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

    static createBeaconLog(note: string, executor: User, beacon: Beacon, tags: BeaconLogTag[]): BeaconLog {
        return new BeaconLog(
            generateRandomId(),
            note,
            getNow(),
            executor.id,
            beacon.id,
            tags
        );
    }

}