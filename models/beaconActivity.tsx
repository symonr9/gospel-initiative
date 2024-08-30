
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

}