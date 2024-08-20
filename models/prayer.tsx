import { PrayerType } from "@/enums/enums";
import PrayerRequest from "./prayerRequest";

interface IPrayer {
    id: string;
    name: string;
    lastPrayedAt: Date | undefined;
    userId: string;
    oneId: String | undefined;
    requests: PrayerRequest[];
    type: PrayerType;
}

export default class Prayer implements IPrayer {
    id: string;
    name: string;
    lastPrayedAt: Date | undefined;
    userId: string;
    oneId: String | undefined;
    requests: PrayerRequest[];
    type: PrayerType;
    
    constructor(id: string, name: string, lastPrayedAt: Date | undefined, userId: string,
        oneId: String | undefined, requests: PrayerRequest[], type: PrayerType
    ) {
        this.id = id;
        this.name = name;
        this.lastPrayedAt = lastPrayedAt;
        this.userId = userId;
        this.oneId = oneId;
        this.requests = requests;
        this.type = type;
    }

}

export function generateRandomPrayer(userId: string, oneId: string | undefined): Prayer {
    const id = Math.random().toString(36).substr(2, 9); // Random ID
    const name = `Prayer ${Math.floor(Math.random() * 1000)}`; // Random name
    const lastPrayedAt = new Date(Date.now() - Math.floor(Math.random() * 1000000000)); // Random date within the last 1000 days
    const requests: PrayerRequest[] = [];
    const type = Math.random() > 0.5 ? PrayerType.ForOne : PrayerType.ForCityMinistry;

    return new Prayer(id, name, lastPrayedAt, userId, oneId, requests, type);
}