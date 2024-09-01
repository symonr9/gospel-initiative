import { generateRandomId, getNow } from "@/utils/appUtils";
import Beacon from "./beacon";
import User from "./user";


export type ActivityWithUser = BeaconActivity & {
    user: User | null;
};

interface IBeaconActivity {
    id: string;
    note: string;
    date: Date;
    userId: string;
    beaconId: string;
}

export default class BeaconActivity implements IBeaconActivity {
    id: string;
    note: string;
    date: Date;
    userId: string;
    beaconId: string;

    constructor(id: string, note: string, date: Date,
        userId: string, beaconId: string
    ) {
        this.id = id;
        this.note = note;
        this.date = date;
        this.userId = userId;
        this.beaconId = beaconId;
    }

    static createBeaconActivity(note: string, executor: User,
        beacon: Beacon
    ): BeaconActivity {
        return new BeaconActivity(
            generateRandomId(),
            note,
            getNow(),
            executor.id,
            beacon.id
        );
    }

}