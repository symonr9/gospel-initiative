import { AppIcon, OneFactType, OneStage, ShareChristPageState } from "@/enums/enums";

// console.log(formatEnumKey(OneFactType, OneFactType.SpiritualBeliefs)); // Output: "Spiritual Beliefs"
export function formatEnumKey<T>(enumObj: T, enumValue: T[keyof T]): string {
    const enumKey = Object.keys(enumObj).find(key => enumObj[key as keyof T] === enumValue);
    return enumKey ? enumKey.replace(/([a-z])([A-Z])/g, '$1 $2') : '';
}

export function mapStageToText(stage: OneStage) {
    switch (stage) {
        case OneStage.Disciple:
            return "Disciple";
        case OneStage.NewBeliever:
            return "New Believer";
        case OneStage.Seeking:
            return "Seeking";
        case OneStage.Curious:
            return "Curious";
        case OneStage.Apathetic:
            return "Apathetic";
        case OneStage.Hostile:
            return "Hostile";
    }
    
    return "";
}

export function mapOneFactTypeToAppIcon(oneFactType: OneFactType): AppIcon {
    switch (oneFactType) {
        case OneFactType.Background:
            return AppIcon.Man1;
        case OneFactType.Family:
            return AppIcon.Tree;
        case OneFactType.Likes:
            return AppIcon.Cherries;
        case OneFactType.Dislikes:
            return AppIcon.Skull;
        case OneFactType.Work:
            return AppIcon.City;
        case OneFactType.Hobbies:
            return AppIcon.Bird;
        case OneFactType.Education:
            return AppIcon.Edit;
        case OneFactType.SpiritualBeliefs:
            return AppIcon.Christ;
        case OneFactType.LifeGoals:
            return AppIcon.CrossChurch;
        case OneFactType.Favorite:
            return AppIcon.ChurchValentines;
        case OneFactType.FaithBackground:
            return AppIcon.Church;
        case OneFactType.CommonGround:
            return AppIcon.NetworkPeople;
        case OneFactType.PrayerPoint:
            return AppIcon.Prayer;
        default:
            return AppIcon.Globe;
    }
}

export function isEditing(pageState: ShareChristPageState) {
    return [
        ShareChristPageState.Edit,
        ShareChristPageState.EditActionSteps,
        ShareChristPageState.EditOneFacts
    ].includes(pageState);
}