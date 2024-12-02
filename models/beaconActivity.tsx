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
    username: string;
    global: boolean;
}

export default class BeaconActivity implements IBeaconActivity {
    id: string;
    note: string;
    date: Date;
    userId: string;
    beaconId: string;
    username: string;
    global: boolean;

    constructor(id: string, note: string, date: Date,
        userId: string, beaconId: string, global: boolean
    ) {
        this.id = id;
        this.note = note;
        this.date = date;
        this.userId = userId;
        this.beaconId = beaconId;
        this.username = "";
        this.global = global;
    }

    static createBeaconActivity(note: string, executor: User,
        beacon: Beacon
    ): BeaconActivity {
        return new BeaconActivity(
            generateRandomId(),
            note,
            getNow(),
            executor.id,
            beacon.id,
            beacon.global,
        );
    }

}