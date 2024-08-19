import { } from "@/enums/enums";
import PrayerBeaconSettings from "./prayerBeaconSettings";

interface IPrayerBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string;
    meetingId: string;
    responses: string[];
    targetDate: Date | undefined;
    settings: PrayerBeaconSettings;
}

export default class PrayerBeacon implements IPrayerBeacon {
    id: string;
    name: string;
    message: string;
    userId: string;
    oneId: string;
    meetingId: string;
    responses: string[];
    targetDate: Date | undefined;
    settings: PrayerBeaconSettings;
    
    constructor(id: string, name: string, notes: string, oneId: string,
        responses: string[], targetDate: Date | undefined,
        settings: PrayerBeaconSettings, userId: string, meetingId: string,
    ) {
        this.id = id;
        this.name = name;
        this.message = notes;
        this.userId = userId;
        this.oneId = oneId;
        this.meetingId = meetingId;
        this.responses = responses;
        this.targetDate = targetDate;
        this.settings = settings;
    }

}