import PrayerRequest from "./prayerRequest";

interface IPrayer {
    id: string;
    name: string;
    lastPrayedAt: Date | undefined;
    userId: string;
    oneId: String | undefined;
    requests: PrayerRequest[];
}

export default class Prayer implements IPrayer {
    id: string;
    name: string;
    lastPrayedAt: Date | undefined;
    userId: string;
    oneId: String | undefined;
    requests: PrayerRequest[];
    
    constructor(id: string, name: string, lastPrayedAt: Date | undefined, userId: string,
        oneId: String | undefined, requests: PrayerRequest[]
    ) {
        this.id = id;
        this.name = name;
        this.lastPrayedAt = lastPrayedAt;
        this.userId = userId;
        this.oneId = oneId;
        this.requests = requests;
    }

}