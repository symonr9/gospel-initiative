import { AutoBeaconType, AvatarIcon, BeaconTag, BeaconType, GlobalBeaconType, OneCategory, OneStage, Priority } from "@/enums/enums";
import One from "./one";
import User from "./user";
import BeaconActivity, { ActivityWithUser } from "./beaconActivity";


export type BeaconWithActivities = Beacon & {
    activities: ActivityWithUser[];
}

export type EnhancedBeacon = Beacon & {
    one: One | null;
    user: User | null;
    incomingActivities: BeaconActivity[];
    completedActivities: BeaconActivity[];
};

interface IBeacon {
    id: string;
    name: string;
    message: string | null;
    userId: string | null;
    oneId: string | null;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    shareOwnName: boolean | true;
    activities: BeaconActivity[] | undefined;
    tags: BeaconTag[];
    global: boolean;
    isAutoBeacon: boolean;
    
    userName: string | null;
    userIcon: AvatarIcon | null;
    oneName: string | null;
    oneIcon: AvatarIcon | null;
    oneStage: OneStage | null;
    oneCategory: OneCategory | null;
}

export default class Beacon implements IBeacon {
    id: string;
    name: string;
    message: string | null;
    userId: string | null;
    oneId: string | null;
    priority: Priority;
    type: BeaconType;
    activeUntil: Date | undefined;
    shareOwnName: boolean | true;
    activities: BeaconActivity[] | undefined;
    tags: BeaconTag[];
    global: boolean;
    globalType: GlobalBeaconType | null;
    isAutoBeacon: boolean;
    autoType: AutoBeaconType | null;

    userName: string | null;
    userIcon: AvatarIcon | null;
    oneName: string | null;
    oneIcon: AvatarIcon | null;
    oneStage: OneStage | null;
    oneCategory: OneCategory | null;

    constructor(id: string, name: string, message: string | null, oneId: string | null,
        priority: Priority, userId: string | null, type: BeaconType, activeUntil: Date | undefined,
        shareOwnName: boolean | true, activities: BeaconActivity[] | undefined,
        tags: BeaconTag[], global: boolean, isAutoBeacon: boolean
    ) {
        this.id = id;
        this.name = name;
        this.message = message;
        this.userId = userId;
        this.oneId = oneId;
        this.priority = priority;
        this.type = type;
        this.activeUntil = activeUntil;
        this.shareOwnName = shareOwnName;
        this.activities = activities;
        this.tags = tags;
        this.global = global;
        this.isAutoBeacon = isAutoBeacon;
        this.globalType = null;
        this.autoType = null;

        this.userName = null;
        this.userIcon = null;
        this.oneName = null;
        this.oneIcon = null;
        this.oneStage = null;
        this.oneCategory = null;
    }

    static createNew() {
        return new Beacon(
            "",
            "New Beacon",
            "",
            null,
            Priority.Normal,
            "",
            BeaconType.GetToKnowThem,
            new Date(),
            true,
            [],
            [],
            false,
            false
        );
    }

}
