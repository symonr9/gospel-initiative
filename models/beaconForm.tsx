import { BeaconLogTag, Priority } from "@/enums/enums";

interface IBeaconForm {
    shareOwnName: boolean;
    notes: string | null;
    priority: Priority;
    tags: BeaconLogTag[];
}

export default class BeaconForm implements IBeaconForm {
    shareOwnName: boolean;
    notes: string | null;
    priority: Priority;
    tags: BeaconLogTag[];

    constructor(shareOwnName: boolean,
        notes: string | null, priority: Priority, tags: BeaconLogTag[]
    ) {
        this.shareOwnName = shareOwnName;
        this.notes = notes;
        this.priority = priority;
        this.tags = tags;
    }

}