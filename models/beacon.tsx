import { BeaconType, Priority } from "@/enums/enums";
import One from "./one";
import User from "./user";
import BeaconActivity from "./beaconActivity";

export type EnhancedBeacon = Beacon & {
    one: One | null;
    user: User | null;
    activities: BeaconActivity[];
};

interface IBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string | null;
    meetingId: string | null;
    targetDate: Date | undefined;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    settingsId: string;
}

export default class Beacon implements IBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string | null;
    meetingId: string | null;
    targetDate: Date | undefined;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    settingsId: string;

    constructor(id: string, name: string, notes: string, oneId: string | null,
        targetDate: Date | undefined, priority: Priority,
        settingsId: string, userId: string, meetingId: string | null,
        type: BeaconType, activeUntil: Date | undefined
    ) {
        this.id = id;
        this.name = name;
        this.message = notes;
        this.userId = userId;
        this.oneId = oneId;
        this.meetingId = meetingId;
        this.targetDate = targetDate;
        this.priority = priority;
        this.settingsId = settingsId;
        this.type = type;
        this.activeUntil = activeUntil;
    }

    static createNew() {
        return new Beacon(
            "",
            "New Beacon",
            "",
            null,
            [],
            undefined,
            Priority.Normal,
            "",
            "",
            null,
            BeaconType.Normal,
            undefined
        );
    }

}
