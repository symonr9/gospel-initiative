import { BeaconType, Priority } from "@/enums/enums";
import One from "./one";
import User from "./user";
import BeaconActivity from "./beaconActivity";

export type EnhancedBeacon = Beacon & {
    one: One | null;
    user: User | null;
    incomingActivities: BeaconActivity[];
    completedActivities: BeaconActivity[];
};

interface IBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string | null;
    meetingId: string | null;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    shareOneName: boolean | false;
    shareOwnName: boolean | true;
}

export default class Beacon implements IBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string | null;
    meetingId: string | null;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    shareOneName: boolean | false;
    shareOwnName: boolean | true;

    constructor(id: string, name: string, message: string, oneId: string | null,
        priority: Priority, userId: string, meetingId: string | null,
        type: BeaconType, activeUntil: Date | undefined, shareOneName: boolean | false,
        shareOwnName: boolean | true
    ) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.userId = userId;
        this.oneId = oneId;
        this.meetingId = meetingId;
        this.priority = priority;
        this.type = type;
        this.activeUntil = activeUntil;
        this.shareOneName = shareOneName;
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
            "",
            BeaconType.Meeting,
            new Date(),
            false,
            true
        );
    }

}
