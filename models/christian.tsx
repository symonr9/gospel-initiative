import { AppIcon, AvatarIcon, OneCategory } from "@/enums/enums";
import { generateRandomId } from "@/utils/appUtils";

interface IChristian {
    id: string;
    name: string;
    oneCategory: OneCategory;
    category: OneCategory;
    icon: AvatarIcon;
    oneKnownSince: Date | undefined;
    knownSince: Date | undefined;
    notes: string | undefined;
    mutualInterests: string | undefined;
    lastPrayedFor: Date | undefined;
    lastReachedOutTo: Date | undefined;
    timesPrayed: number;
    timesReachedOut: number;
    oneId: string;
}

export default class Christian implements IChristian {
    id: string;
    name: string;
    oneCategory: OneCategory;
    category: OneCategory;
    icon: AvatarIcon;
    oneKnownSince: Date | undefined;
    knownSince: Date | undefined;
    notes: string | undefined;
    mutualInterests: string | undefined;
    lastPrayedFor: Date | undefined;
    lastReachedOutTo: Date | undefined;
    timesPrayed: number;
    timesReachedOut: number;
    oneId: string;
    
    constructor(id: string, name: string, oneCategory: OneCategory,
        category: OneCategory, icon: AvatarIcon, oneKnownSince: Date | undefined,
        knownSince: Date | undefined, notes: string | undefined,
        mutualInterests: string | undefined, lastPrayedFor: Date | undefined,
        lastReachedOutTo: Date | undefined, timesPrayed: number,
        timesReachedOut: number, oneId: string
    ) {
        this.id = id;
        this.name = name;
        this.oneCategory = oneCategory;
        this.category = category;
        this.icon = icon;
        this.oneKnownSince = oneKnownSince;
        this.knownSince = knownSince;
        this.notes = notes;
        this.mutualInterests = mutualInterests;
        this.lastPrayedFor = lastPrayedFor;
        this.lastReachedOutTo = lastReachedOutTo;
        this.timesPrayed = timesPrayed;
        this.timesReachedOut = timesReachedOut;
        this.oneId = oneId;
    }

    static createDefault(oneId: string) {
        return new Christian(
            generateRandomId(),
            "",
            OneCategory.Friend,
            OneCategory.CloseFriend,
            AvatarIcon.Man1,
            new Date(),
            new Date(),
            "",
            "",
            new Date(),
            new Date(),
            0,
            0,
            oneId
        );
    }

}