
interface IBeaconSettings {
    id: string;
    name: string;
    userId: string;
    shareOneName: boolean | false;
    shareOwnName: boolean | true;
}

export default class BeaconSettings implements IBeaconSettings {
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