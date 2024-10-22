import { BeaconLogTag, BeaconTag, Priority } from "@/enums/enums";

interface IBeaconForm {
    shareOwnName: boolean;
    notes: string | null;
    priority: Priority;
    tags: BeaconTag[];
}

export default class BeaconForm implements IBeaconForm {
    shareOwnName: boolean;
    notes: string | null;
    priority: Priority;
    tags: BeaconTag[];

    constructor(shareOwnName: boolean,
        notes: string | null, priority: Priority, tags: BeaconTag[]
    ) {
        this.shareOwnName = shareOwnName;
        this.notes = notes;
        this.priority = priority;
        this.tags = tags;
    }

}