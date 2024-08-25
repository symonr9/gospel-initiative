import { PrayerBeaconType, Priority } from "@/enums/enums";
import PrayerBeaconSettings from "./prayerBeaconSettings";

interface IPrayerBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string | null;
    meetingId: string | null;
    responses: string[];
    targetDate: Date | undefined;
    priority: Priority;
    type: PrayerBeaconType;
    settingsId: string;
}

export default class PrayerBeacon implements IPrayerBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string | null;
    meetingId: string | null;
    responses: string[];
    targetDate: Date | undefined;
    priority: Priority;
    type: PrayerBeaconType;
    settingsId: string;

    constructor(id: string, name: string, notes: string, oneId: string | null,
        responses: string[], targetDate: Date | undefined, priority: Priority,
        settingsId: string, userId: string, meetingId: string | null,
        type: PrayerBeaconType,
    ) {
        this.id = id;
        this.name = name;
        this.message = notes;
        this.userId = userId;
        this.oneId = oneId;
        this.meetingId = meetingId;
        this.responses = responses;
        this.targetDate = targetDate;
        this.priority = priority;
        this.settingsId = settingsId;
        this.type = type;
    }

    static createNew() {
        return new PrayerBeacon(
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
            PrayerBeaconType.ToCommunity
        );
    }

}