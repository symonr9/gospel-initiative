import { BeaconType, Priority } from "@/enums/enums";
import One from "./one";
import User from "./user";
import BeaconActivity, { ActivityWithUser } from "./beaconActivity";


export type BeaconWithActivities = Beacon & {
    activities: ActivityWithUser[];
}

export type EnhancedBeacon = Beacon & {
    one: One | null;
    user: User | null;
    incomingActivities: BeaconActivity[];
    completedActivities: BeaconActivity[];
};

interface IBeacon {
    id: string;
    name: string;
    message: string | null;
    userId: string;
    oneId: string | null;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    shareOwnName: boolean | true;
}

export default class Beacon implements IBeacon {
    id: string;
    name: string;
    message: string | null;
    userId: string;
    oneId: string | null;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    shareOwnName: boolean | true;

    constructor(id: string, name: string, message: string | null, oneId: string | null,
        priority: Priority, userId: string,
        type: BeaconType, activeUntil: Date | undefined,
        shareOwnName: boolean | true
    ) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.userId = userId;
        this.oneId = oneId;
        this.priority = priority;
        this.type = type;
        this.activeUntil = activeUntil;
        this.shareOwnName = shareOwnName;
    }

    static createNew() {
        return new Beacon(
            "",
            "New Beacon",
            "",
            null,
            Priority.Normal,
            "",
            BeaconType.Meeting,
            new Date(),
            false,
            true
        );
    }

}
