import { PrayerBeaconType } from "@/enums/enums";

interface IPrayerBeaconSettings {
    id: string;
    name: string;
    shareOneName: boolean | false;
    shareOwnName: boolean | true;
    type: PrayerBeaconType;
}

export default class PrayerBeaconSettings implements IPrayerBeaconSettings {
    id: string;
    name: string;
    shareOneName: boolean | false;
    shareOwnName: boolean | true;
    type: PrayerBeaconType;
    
    constructor(id: string, name: string, shareOneName: boolean | false,
        shareOwnName: boolean | true, type: PrayerBeaconType
    ) {
        this.id = id;
        this.name = name;
        this.shareOneName = shareOneName;
        this.shareOwnName = shareOwnName;
        this.type = type;
    }

}