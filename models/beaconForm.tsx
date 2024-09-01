import { BeaconLogTag, Priority } from "@/enums/enums";

interface IBeaconForm {
    shareOneName: boolean;
    shareOwnName: boolean;
    notes: string | null;
    priority: Priority;
    tags: BeaconLogTag[];
}

export default class BeaconForm implements IBeaconForm {
    shareOneName: boolean;
    shareOwnName: boolean;
    notes: string | null;
    priority: Priority;
    tags: BeaconLogTag[];

    constructor(shareOneName: boolean, shareOwnName: boolean,
        notes: string | null, priority: Priority, tags: BeaconLogTag[]
    ) {
        this.shareOneName = shareOneName;
        this.shareOwnName = shareOwnName;
        this.notes = notes;
        this.priority = priority;
        this.tags = tags;
    }

}