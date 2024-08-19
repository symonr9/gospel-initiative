
interface IPrayerRequest {
    id: string;
    text: string;
    createdAt: Date;
    prayerId: string;
}

export default class PrayerRequest implements IPrayerRequest {
    id: string;
    name: string;
    text: string;
    createdAt: Date;
    prayerId: string;
    
    constructor(id: string, name: string, text: string, createdAt: Date,
        prayerId: string
    ) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.createdAt = createdAt;
        this.prayerId = prayerId;
    }

}