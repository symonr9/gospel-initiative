import { MAX_DAILY_TASKS_NEEDED_TO_COMPLETE } from "@/constants/Constants";
import { AppIcon, AvatarIcon, GospelChecklistItem, GospelStepLayoutType, OneNoteType, OneStage, StoryChapterTag, StoryChapterType, StoryType } from "@/enums/enums";
import Beacon from "@/models/beacon";
import GospelStep from "@/models/gospelStep";
import One from "@/models/one";
import OneNote from "@/models/oneNote";
import StoryChapter from "@/models/storyChapter";
import User from "@/models/user";

export const getSelectedOne = (selectedOneId: string | null, ones: One[]) => {
    if (!selectedOneId) {
        return null;
    }
    return ones.find((one) => one.id === selectedOneId);
};

export function formatEnumKey<T>(enumObj: T, enumValue: T[keyof T]): string {
    const enumKey = Object.keys(enumObj).find(key => enumObj[key as keyof T] === enumValue);
    return enumKey ? enumKey.replace(/([a-z])([A-Z])/g, '$1 $2') : '';
}

export function getRandomElement(arr: Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)];
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

export function getNextWeek() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 8);
    return tomorrow;
}

export function addOneHour(date: Date) {
    return new Date(date.getTime() + 60 * 60 * 1000);
}

export function getDayInFuture(day: number) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + day);
    return tomorrow;
}

export function getTheNextDay(date: Date | undefined) {
    if (!date) {
        return null;
    }
    date.setDate(date.getDate() + 1);
    return date;
}

export function isWithinNext24Hours(date: Date): boolean {
    const now = new Date();
    const future24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return date && date > now && date <= future24Hours;
}

export function isWithinPast24Hours(date: Date | undefined): boolean {
    if (!date) {
        return false;
    }
    const now = new Date();
    const past24Hours = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    return date && date <= now && date >= past24Hours;
}

export function countRecentActionSteps(ones: One[]): number {
    return ones.reduce((total, one) => {
        const recentSteps = one.actionSteps.filter((step) =>
            isWithinPast24Hours(step.lastModified)
        );
        return total + recentSteps.length;
    }, 0);
}

export function countRecentGospelSteps(ones: One[]): number {
    return ones.reduce((total, one) => {
        const recentSteps = one.gospelSteps.filter((step) =>
            isWithinPast24Hours(step.date)
        );
        return total + recentSteps.length;
    }, 0);
}

export function countRecentOneNotes(ones: One[]): number {
    return ones.reduce((total, one) => {
        const recentSteps = one.oneNotes.filter((note) =>
            isWithinPast24Hours(note.date)
        );
        return total + recentSteps.length;
    }, 0);
}

export function getTimePercentage(targetDate: Date | null): number {
    if (!targetDate) {
        return 0;
    }

    const now = new Date();
    const differenceInMs = targetDate.getTime() - now.getTime();

    // If the target date is in the past or right now
    if (differenceInMs <= 0) {
        return 0;
    }

    const totalMillisecondsIn24Hours = 24 * 60 * 60 * 1000;
    const percentage = (differenceInMs / totalMillisecondsIn24Hours) * 100;

    return Math.min(Math.max(percentage, 0), 100) * 0.01;
}

export function getRecentStoryChapters(myStoryChapters: StoryChapter[]): StoryChapter[] {
    return myStoryChapters.filter((chapter) => isWithinPast24Hours(chapter.created));
}

export function getAppTimeAgoText(date: Date | undefined, expiration = false, plain = false): string {
    if (!date) {
        return '';
    }

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
            if (plain) {
                return isFuture ? `${count} ${unit}` : `${count} ${unit} ago`;
            } else if (expiration) {
                return isFuture ? `Expires in ${count} ${unit}` : `Expired ${count} ${unit} ago`;
            }
            return isFuture ? `In ${count} ${unit}` : `Passed ${count} ${unit} ago`;
        }
    }

    return isFuture ? 'soon' : 'just now';
}

export function formatDateTime(date: Date | null | undefined): string {
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

export function formatDateTimeSimple(date: Date | null | undefined): string {
    if (!date) {
        return '';
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function getHoursLeft(date: Date | null): number {
    if (!date) {
        return 0;
    }

    const now = new Date();
    const timeDifference = date.getTime() - now.getTime();
    if (timeDifference < 0) {
        return 24;
    }
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return 24 - hours;
}

export function isBeaconActive(beacon: Beacon): boolean {
    if (!beacon.activeUntil) {
        return false;
    }
    return beacon.activeUntil.getTime() >= new Date().getTime();
}

export function isGospelStepCompleted(item: GospelStep, threshold: number): boolean {
    switch (item.layoutType) {
        case GospelStepLayoutType.Binary:
        case GospelStepLayoutType.Scale:
            return item.rating >= threshold;
        case GospelStepLayoutType.BinaryCounter:
        case GospelStepLayoutType.PositiveCounter:
            return false; // Never officially completes
    }
}

export function mapGospelChecklistItemTypeToIcon(item: GospelChecklistItem): AppIcon {
    switch (item) {
        case GospelChecklistItem.Creation:
        case GospelChecklistItem.Fall:
        case GospelChecklistItem.Sin:
        case GospelChecklistItem.Prophets:
        case GospelChecklistItem.Incarnation:
        case GospelChecklistItem.JesusLife:
        case GospelChecklistItem.JesusOnTheCross:
        case GospelChecklistItem.Resurrection:
        case GospelChecklistItem.Ascension:
        case GospelChecklistItem.Grace:
        case GospelChecklistItem.Faith:
        case GospelChecklistItem.Repentance:
        case GospelChecklistItem.HolySpirit:
        case GospelChecklistItem.NewCreation:
        case GospelChecklistItem.Discipleship:
        case GospelChecklistItem.GreatCommission:
        case GospelChecklistItem.SecondComing:
        case GospelChecklistItem.Heaven:
        case GospelChecklistItem.Judgment:
        case GospelChecklistItem.KingdomOfGod:
        case GospelChecklistItem.Reconciliation:
        case GospelChecklistItem.Redemption:
        case GospelChecklistItem.Forgiveness:
        default:
            return AppIcon.Christ;
    }
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

export function shouldKeepChapter(quality: number): boolean {
    return quality >= 5;
}

export function getDaysDifference(startDate: Date, currentDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const diffInTime = currentDate.getTime() - startDate.getTime();
    return Math.abs(Math.floor(diffInTime / oneDay));
}

export function getItemForDate(currentDate: Date, array: string[]): string {
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const startDate = new Date(0);
    const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / millisecondsInADay);
    const index = daysPassed % array.length;
    return array[index];
}

export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dateArray: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return dateArray;
}

export function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - 3) + '...';
}

export function calculatePercent(arr1: any[], arr2: any[]): number {
    const countInSecondArray = arr2.filter(num => arr1.includes(num)).length;
    const percentage = Math.ceil((countInSecondArray / arr2.length) * 100);
    return percentage;
}

export function calculatePercentByTotals(value: number, total: number): number {
    return value / total;
}

export function getRandomString(strings: string[]): string {
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
}

export const isAppIcon = (value: any): value is AppIcon => {
    return Object.values(AppIcon).includes(value);
};

export const isAvatarIcon = (value: any): value is AvatarIcon => {
    return Object.values(AvatarIcon).includes(value);
};

export function getAppIconKey(value: any): string | undefined {
    for (const [key, val] of Object.entries(AppIcon)) {
        if (val === value) {
            return key;
        }
    }
    return undefined;
}

export function getAvatarIconKey(value: any): string | undefined {
    for (const [key, val] of Object.entries(AvatarIcon)) {
        if (val === value) {
            return key;
        }
    }
    return undefined;
}

export function partitionChaptersByTag(storyChapters: StoryChapter[]): { key: StoryChapterTag; items: StoryChapter[] }[] {
    const partitioned = new Map<StoryChapterTag, StoryChapter[]>();

    storyChapters.forEach((chapter) => {
        chapter.tags.forEach((tag) => {
            // If the tag is not already in the map, add it with an empty array
            if (!partitioned.has(tag)) {
                partitioned.set(tag, []);
            }
            partitioned.get(tag)!.push(chapter);
        });
    });

    return Array.from(partitioned, ([key, items]) => ({ key, items }))
        .sort((a, b) => b.items.length - a.items.length);
}


export function partitionNotesByType(notes: OneNote[]): { key: OneNoteType; items: OneNote[] }[] {
    const partitioned = new Map<OneNoteType, OneNote[]>();
    notes.forEach((note) => {
        if (!partitioned.has(note.type)) {
            partitioned.set(note.type, []);
        }
        partitioned.get(note.type)!.push(note);
    });
    return Array.from(partitioned, ([key, items]) => ({ key, items }))
        .sort((a, b) => b.items.length - a.items.length);
}

export function toggleTagFromFilter(tag: StoryChapterTag, tagFilters: StoryChapterTag[]) {
    if (!tagFilters) {
        return [];
    }

    if (tagFilters.includes(tag)) {
        return [...tagFilters].filter((t) => t !== tag);
    }
    return [...tagFilters, tag];
}

export function toggleTypeFromFilter(type: StoryChapterType, typeFilters: StoryChapterType[]) {
    if (!typeFilters) {
        return [];
    }

    if (typeFilters.includes(type)) {
        return [...typeFilters].filter((t) => t !== type);
    }
    return [...typeFilters, type];
}

export function toggleOneNoteTypeFromFilter(type: OneNoteType, typeFilters: OneNoteType[]) {
    if (!typeFilters) {
        return [];
    }

    if (typeFilters.includes(type)) {
        return [...typeFilters].filter((t) => t !== type);
    }
    return [...typeFilters, type];
}

export const countRenderableChapters = (storyChapters: StoryChapter[], tagFilters: StoryChapterTag[],
    typeFilters: StoryChapterType[]): number => {
    return storyChapters.filter(chapter => doesChapterMatchFilter(chapter, tagFilters, typeFilters)).length;
};

export function doesChapterMatchFilter(chapter: StoryChapter, tagFilters: StoryChapterTag[], typeFilters: StoryChapterType[]): Boolean {
    const hasFilter = tagFilters.length + typeFilters.length > 0;
    return !hasFilter || (tagFilters.some((tag => chapter.tags.includes(tag))) || typeFilters.includes(chapter.chapterType));
}

export function getHomeDailyTasksData(ones: One[], executor: User, completedBeacons: any, activeBeacons: Beacon[]) {
    const hasPrayedForBeaconToday = completedBeacons.length > 0;

    const sentBeacons = activeBeacons.filter((value) => !value.global);
    const hasSentBeaconToday = sentBeacons.length > 0;

    const numOfRecentActionSteps = countRecentActionSteps(ones);
    const hasUpdatedActionStepToday = numOfRecentActionSteps > 0;

    const numOfRecentGospelSteps = countRecentGospelSteps(ones);
    const hasUpdatedGospelStepToday = numOfRecentGospelSteps > 0;

    const numOfRecentOneNotes = countRecentOneNotes(ones);
    const hasUpdatedOneNoteToday = numOfRecentOneNotes > 0;

    const hasPracticedTestimonyToday = isWithinPast24Hours(executor.lastPartitionDate);

    const percentDone = ((hasPrayedForBeaconToday ? 1 : 0)
        + (hasSentBeaconToday ? 1 : 0)
        + (hasUpdatedActionStepToday ? 1 : 0)
        + (hasUpdatedGospelStepToday ? 1 : 0)
        + (hasUpdatedOneNoteToday ? 1 : 0)
        + (hasPracticedTestimonyToday ? 1 : 0)
    ) / MAX_DAILY_TASKS_NEEDED_TO_COMPLETE;

    return {
        hasPrayedForBeaconToday,
        hasSentBeaconToday,
        numOfRecentActionSteps,
        hasUpdatedActionStepToday,
        numOfRecentGospelSteps,
        hasUpdatedGospelStepToday,
        numOfRecentOneNotes,
        hasUpdatedOneNoteToday,
        hasPracticedTestimonyToday,
        percentDone
    };
}

export function isChristianStage(stage: OneStage): boolean {
    return stage === OneStage.Disciple || stage === OneStage.NewBeliever;
}