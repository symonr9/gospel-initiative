import { AppIcon, OneFactType, OneStage, Priority, ShareChristPageState } from "@/enums/enums";
import Beacon from "@/models/beacon";

// console.log(formatEnumKey(OneFactType, OneFactType.SpiritualBeliefs)); // Output: "Spiritual Beliefs"
export function formatEnumKey<T>(enumObj: T, enumValue: T[keyof T]): string {
    const enumKey = Object.keys(enumObj).find(key => enumObj[key as keyof T] === enumValue);
    return enumKey ? enumKey.replace(/([a-z])([A-Z])/g, '$1 $2') : '';
}

export function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
}

export function isWithinNext24Hours(date: Date): boolean {
    const now = new Date();
    const future24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return date && date > now && date <= future24Hours;
}


export function getAppTimeAgoText(date: Date): string {
    const now = new Date();
    const secondsDifference = Math.floor((date.getTime() - now.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 365 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        week: 7 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
        second: 1,
    };

    const isFuture = secondsDifference > 0;
    const seconds = Math.abs(secondsDifference);

    for (const interval in intervals) {
        const intervalSeconds = intervals[interval];
        const count = Math.floor(seconds / intervalSeconds);
        if (count > 0) {
            const unit = `${interval}${count !== 1 ? 's' : ''}`;
            return isFuture
                ? `Expires in ${count} ${unit}`
                : `Expired ${count} ${unit} ago`;
        }
    }

    return isFuture ? 'soon' : 'just now';
}

export function formatDateTime(date: Date | null): string {
    if (!date) {
        return '';
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12; // The hour '0' should be '12'

    return `${dayOfWeek}, ${month} ${day}, ${year} at ${hour}:${minute} ${ampm}`;
}

export function getDaysPrayedForText(date: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();

    if (timeDifference < 0) {
        return "Just started praying.";
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `Been praying for ${days} days.`;
}


export function isBeaconActive(beacon: Beacon): boolean {
    if (!beacon.activeUntil) {
        return false;
    }
    return isWithinNext24Hours(beacon.activeUntil);
}


export const getShowHideIcon = (show: boolean) => show ? AppIcon.Show : AppIcon.Hide;

export function mapPriorityToText(priority: Priority) {
    switch (priority) {
        case Priority.Low:
            return "Low";
        case Priority.Normal:
            return "Normal";
        case Priority.High:
            return "High";
    }
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

export function mapStageToIcon(stage: OneStage) {
    switch (stage) {
        case OneStage.Disciple:
            return AppIcon.StageDisciple;
        case OneStage.NewBeliever:
            return AppIcon.StageNewBeliever;
        case OneStage.Seeking:
            return AppIcon.StageSeeking;
        case OneStage.Curious:
            return AppIcon.StageCurious;
        case OneStage.Friendly:
            return AppIcon.StageFriendly;
        case OneStage.Apathetic:
            return AppIcon.StageApathetic;
        case OneStage.Hostile:
            return AppIcon.StageHostile;
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