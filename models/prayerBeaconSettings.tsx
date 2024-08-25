import { PrayerBeaconType } from "@/enums/enums";

interface IPrayerBeaconSettings {
    id: string;
    name: string;
    userId: string;
    shareOneName: boolean | false;
    shareOwnName: boolean | true;
}

export default class PrayerBeaconSettings implements IPrayerBeaconSettings {
    id: string;
    name: string;
    userId: string;
    shareOneName: boolean | false;
    shareOwnName: boolean | true;
    
    constructor(id: string, name: string, userId: string, 
        shareOneName: boolean | false, shareOwnName: boolean | true,
    ) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.shareOneName = shareOneName;
        this.shareOwnName = shareOwnName;
    }

}