import { AppIcon, BeaconType, OneFactType, OneStage, Priority, ShareChristPageState, StoryChapterType, StoryType } from "@/enums/enums";
import Beacon from "@/models/beacon";
import One from "@/models/one";
import StoryChapter from "@/models/storyChapter";
import User from "@/models/user";

// console.log(formatEnumKey(OneFactType, OneFactType.SpiritualBeliefs)); // Output: "Spiritual Beliefs"
export function formatEnumKey<T>(enumObj: T, enumValue: T[keyof T]): string {
    const enumKey = Object.keys(enumObj).find(key => enumObj[key as keyof T] === enumValue);
    return enumKey ? enumKey.replace(/([a-z])([A-Z])/g, '$1 $2') : '';
}

export function getNow() {
    return new Date();
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

export function mapBeaconTypeToAppIcon(type: BeaconType) {
    switch (type) {
        case BeaconType.SpiritualConversation:
            return AppIcon.Conversation;
        case BeaconType.PrayerNeed:
            return AppIcon.Prayer;
        case BeaconType.SharingGospel:
            return AppIcon.FastResponse;
        case BeaconType.InvitedToChurch:
            return AppIcon.Church;
        case BeaconType.OfferedHelp:
            return AppIcon.Car;
        case BeaconType.AttendedEventTogether:
            return AppIcon.Rapport;
        case BeaconType.GaveTestimony:
            return AppIcon.Book;
        case BeaconType.FollowedUp:
            return AppIcon.Phone;
        case BeaconType.Meeting:
        case BeaconType.Archived:
        default:
            return AppIcon.Coffee;
    }
}

export function mapBeaconTypeToTitleText(type: BeaconType, shareOneName: boolean, 
    shareOwnName: boolean, user: User, one: One) {
    const userName = shareOwnName ? user.name : 'A User';
    const oneName = shareOneName ? one.name :'their One';
    switch (type) {
        case BeaconType.SpiritualConversation:
            return `${userName} would like a spiritual conversation with ${oneName}.`;
        case BeaconType.PrayerNeed:
            return `${userName} heard about a prayer need from ${oneName}.`;
        case BeaconType.SharingGospel:
            return `${userName} would like to share an aspect of their faith with ${oneName}.`;
        case BeaconType.InvitedToChurch:
            return `${userName} is planning to invite ${oneName} to church.`;
        case BeaconType.OfferedHelp:
            return `${userName} wants to serve ${oneName} in some way.`;
        case BeaconType.AttendedEventTogether:
            return `${userName} wants to build rapport with ${oneName}.`;
        case BeaconType.GaveTestimony:
            return `${userName} wants to share their personal testimoney with ${oneName}.`;
        case BeaconType.FollowedUp:
            return `${userName} wants to follow-up on a previous conversation with ${oneName}.`;
        case BeaconType.Meeting:
        default:
            return `${userName} is meeting with ${oneName}`;
    }
}

export function isEditing(pageState: ShareChristPageState) {
    return [
        ShareChristPageState.Edit,
    ].includes(pageState);
}

export function generateRandomId(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  export function mapStoryTypeToText(type: StoryType): string {
    switch (type) {
        case StoryType.Personal:
            return "My Story";
        case StoryType.Gods:
            return "Gods Story";
    }
    return "";
  }

  export function mapStoryChapterTypeToAppIcon(type: StoryChapterType) : AppIcon {
    switch (type) {
        case StoryChapterType.Background:
            return AppIcon.Bird;
        case StoryChapterType.Seeking:
            return AppIcon.StageSeeking;
        case StoryChapterType.Curious:
            return AppIcon.StageCurious;
        case StoryChapterType.SalvationExperience:
            return AppIcon.OpenHands;
        case StoryChapterType.Struggle:
            return AppIcon.Fighting;
        case StoryChapterType.Highlight:
            return AppIcon.Dove;
        case StoryChapterType.Lowlight:
            return AppIcon.Rainy;
        case StoryChapterType.GrowingInFaith:
            return AppIcon.PlantGrow;
        case StoryChapterType.Creation:
            return AppIcon.Tree;
        case StoryChapterType.Sin:
            return AppIcon.Skull;
        case StoryChapterType.JesusMinistry:
            return AppIcon.Sheep;
        case StoryChapterType.Jesus:
        case StoryChapterType.Crucifixion:
            return AppIcon.Christ;
        case StoryChapterType.Resurrection:
            return AppIcon.CrossChurch;
        case StoryChapterType.Church:
            return AppIcon.Church;
        case StoryChapterType.ChosenPeople:
            return AppIcon.Exodus;
        case StoryChapterType.OldTestament:
        case StoryChapterType.ScriptureHighlight:
        case StoryChapterType.Character:
        case StoryChapterType.Misc:
        default:
            return AppIcon.Book;
    }
  }