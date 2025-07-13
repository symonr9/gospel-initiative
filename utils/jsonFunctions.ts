import { ActionStepType, AppIcon, AvatarIcon, OneStage, BeaconType, PromptType, StoryChapterType, StoryType, OneCategory, OneNoteType, GospelStepType, BeaconTag, Priority, GospelStepLayoutType, GlobalBeaconType, AutoBeaconType } from "@/enums/enums";
import One from "@/models/one";
import { shouldKeepChapter } from "./appUtils";
import { JournalEntryType } from "@/enums/enums";
import { LeaderType } from "@/enums/enums";
import { Role } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import OneNote from "@/models/oneNote";
import GospelStep from "@/models/gospelStep";
import Christian from "@/models/christian";
import User from "@/models/user";
import StoryChapter from "@/models/storyChapter";
import Beacon from "@/models/beacon";
import BeaconActivity from "@/models/beaconActivity";

const journalEntriesJson = require('../data/journal-entries.json');
const leadersJson = require('../data/leaders.json');
const localEventsJson = require('../data/local-events.json');
const localMinistriesJson = require('../data/local-ministries.json');
const missionsTripsJson = require('../data/missions-trips.json');
const beaconTemplatesJson = require('../data/beacon-templates.json');
const preferencesJson = require('../data/preferences.json');
const promptsJson = require('../data/prompts.json');
const storiesJson = require('../data/stories.json');
const storyChaptersJson = require('../data/story-chapters.json');
const storyActivitiesJson = require('../data/story-activities.json');
const usersJson = require('../data/users.json');

export function getOnesFromJson(json: any[]) {
    return json.map((one) => getOneFromJson(one));
}

export function getOneFromJson(item: any) {
    return new One(
        item.id,
        item.name,
        AvatarIcon[item.icon as keyof typeof AvatarIcon],
        item.stage as OneStage,
        item.category as OneCategory,
        item.knownSince,
        item.gospelChecklist ? item.gospelChecklist.split('∫').map(Number) : [],
        item.hidden,
        item.userId,
        getActionStepsFromJson(item.actionSteps || []),
        getOneNotesFromJson(item.oneNotes || []),
        getGospelStepsFromJson(item.gospelSteps || []),
        getChristiansFromJson(item.christians || [])
    );
}

export function getActionStepsFromJson(json: any[]) {
    return json.map((item: any) => getActionStepFromJson(item));
}

export function getActionStepFromJson(item: any) {
    return new ActionStep(
        item.id,
        item.notes,
        item.oneId,
        item.isComplete,
        item.targetDate ? new Date(item.targetDate) : undefined,
        item.lastModified ? new Date(item.lastModified) : undefined,
        item.type as ActionStepType
    );
}

export function getOneNotesFromJson(json: any[]) {
    return json.map((item: any) => getOneNoteFromJson(item));
}

export function getOneNoteFromJson(item: any) {
    return new OneNote(
        item.id,
        item.type as OneNoteType,
        new Date(item.date),
        item.notes,
        item.oneId,
    );
}

export function getGospelStepsFromJson(json: any[]) {
    return json.map((item: any) => getGospelStepFromJson(item));
}

export function getGospelStepFromJson(item: any) {
    return new GospelStep(
        item.id,
        new Date(item.date),
        item.type as GospelStepType,
        item.layoutType as GospelStepLayoutType,
        item.notes,
        item.nextSteps,
        item.rating,
        item.oneId
    );
}

export function getChristiansFromJson(json: any[]) {
    return json.map((item: any) => getChristianFromJson(item));
}

export function getChristianFromJson(item: any) {
    const icon = AvatarIcon[item.icon as keyof typeof AvatarIcon];
    return new Christian(
        item.id,
        item.name,
        item.oneCategory as OneCategory,
        item.category as OneCategory,
        icon,
        item.oneKnownSince ? new Date(item.oneKnownSince) : undefined,
        item.knownSince ? new Date(item.knownSince) : undefined,
        item.notes,
        item.mutualInterests,
        item.lastPrayedFor ? new Date(item.lastPrayedFor) : undefined,
        item.lastReachedOutTo ? new Date(item.lastReachedOutTo) : undefined,
        item.timesPrayed,
        item.timesReachedOut,
        item.oneId
    );
}

export function getUserFromJson(item: any) {
    let preferredNotificationTimes = [];
    if (item.preferredNotificationTimes && item.preferredNotificationTimes instanceof Array) {
        preferredNotificationTimes = item.preferredNotificationTimes;
    } else if (item.preferredNotificationTimes) {
        preferredNotificationTimes = item.preferredNotificationTimes.split('∫');
    }
    
    return new User(
        item.id,
        item.name,
        item.email,
        item.type as Role,
        AvatarIcon[item.icon as keyof typeof AvatarIcon],
        item.createdAt ? new Date(item.createdAt) : undefined,
        item.lastPartitionDate ? new Date(item.lastPartitionDate) : undefined,
        item.lastExtraPartitionGranted ? new Date(item.lastExtraPartitionGranted) : undefined,
        item.extraPartitionCount,
        item.enableAutoBeacons,
        item.autoBeaconType as AutoBeaconType,
        item.autoBeaconTags ? item.autoBeaconTags.split('∫').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as BeaconTag) : [],
        item.hasAutoBeaconBeenCreatedThisCycle,
        item.isSetupForNotifications || false,
        item.notifyOnEveryBeacon || false,
        item.notifyMorningAndEveningOnly || false,
        item.preferredNotificationTimes,
        item.lastNotificationSent ? new Date(item.lastNotificationSent) : undefined
    );
}

export function getGodsStoryChaptersFromJson() {
    return storyChaptersJson.map((item) => getStoryChapterFromJson(item));
}

export function getStoryChaptersFromJson(json: any[]) {
    return json.map((item) => getStoryChapterFromJson(item));
}

// Special because chapters are also locally imported from JSON.
export function getStoryChapterFromJson(item: any) {
    let questions = [];
    if (item.questions && item.questions instanceof Array) {
        questions = item.questions;
    } else if (item.questions) {
        questions = item.questions.split('∫');
    }

    let tags = [];
    if (item.tags && item.tags instanceof Array) {
        tags = item.tags;
    } else if (item.tags) {
        tags = item.tags.split('∫').map(Number);
    }

    let names = [];
    if (item.names && item.names instanceof Array) {
        names = item.names;
    } else if (item.names) {
        names = item.names.split('∫');
    }

    return new StoryChapter(
        item.id,
        item.storyId,
        item.type as StoryChapterType,
        item.title,
        item.content,
        questions,
        AppIcon[item.icon as keyof typeof AppIcon],
        item.order,
        tags,
        names,
        item.quality,
        item.userId,
        shouldKeepChapter(item.quality),
        item.originalPrompt,
        item.lastModified ? new Date(item.lastModified) : undefined,
        item.created ? new Date(item.created) : undefined
    );
};

export function getBeaconsFromJson(json: any[]) {
    return json.map(item => {
        const beacon = getBeaconFromJson(item);
        beacon.userName = item?.user?.name;
        beacon.userIcon = item?.user?.icon ? AvatarIcon[item.user.icon as keyof typeof AvatarIcon] : null;
        beacon.oneName = item?.one?.name;
        beacon.oneIcon = item?.one?.icon ? AvatarIcon[item.one.icon as keyof typeof AvatarIcon] : null;
        beacon.oneStage = item?.one?.stage as OneStage;
        beacon.oneCategory = item?.one?.category as OneCategory;
        beacon.globalType = item?.type as GlobalBeaconType || null;
        beacon.autoType = item?.type as AutoBeaconType || null;
        return beacon;
    });
}

export function getBeaconFromJson(item: any) {
    return new Beacon(
        item.id,
        item.name,
        item.message,
        item.oneId || "",
        item.priority as Priority,
        item.userId || "",
        item.type as BeaconType,
        item.activeUntil ? new Date(item.activeUntil) : undefined,
        item.shareOwnName,
        getBeaconActivitiesFromJson(item.activities || []),
        item.tags ? item.tags.split('∫').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as BeaconTag) : [],
        item.global || false,
        item.isAutoBeacon || false
    );
}

export function getBeaconActivitiesFromJson(json: any[]) {
    return json.map((item) => getBeaconActivityFromJson(item));
}

export function getBeaconActivityFromJson(item: any) {
    const activity = new BeaconActivity(
        item.id,
        item.note,
        item.date,
        item.userId,
        item.beaconId,
        item.global || false
    );
    activity.username = item.username || "";
    return activity;
}

export function getJournalEntriesJson() {
    return journalEntriesJson.map(item => {
        const type: JournalEntryType = item.type as JournalEntryType;
        return {
            id: item.id,
            type: String,
            details: String,
            userId: item.userId,
            createdAt: item.targetDate ? new Date(item.targetDate) : undefined,
            entryType: type
        };
    });
}

export function getLeadersJson() {
    return leadersJson.map(item => {
        const type: LeaderType = item.type as LeaderType;
        return {
            id: item.id,
            name: item.name,
            details: item.details,
            type: type,
            email: item.email,
            phone: item.phone
        };
    });
}

export function getLocalEventsJson() {
    return localEventsJson.map(item => {
        const icon = AppIcon[item.icon as keyof typeof AppIcon];
        return {
            id: item.id,
            title: item.title,
            details: item.details,
            startDate: item.startDate ? new Date(item.startDate) : undefined,
            endDate: item.endDate ? new Date(item.endDate) : undefined,
            location: item.location,
            icon: icon,
        };
    });
}

export function getLocalMinistriesJson() {
    return localMinistriesJson.map(item => {
        const icon = AppIcon[item.icon as keyof typeof AppIcon];
        return {
            id: item.id,
            title: item.title,
            details: item.details,
            startDate: item.startDate ? new Date(item.startDate) : undefined,
            endDate: item.endDate ? new Date(item.endDate) : undefined,
            location: item.location,
            recurring: item.recurring,
            isActive: item.isActive,
            icon: icon
        };
    });
}

export function getMissionsTripsJson() {
    return missionsTripsJson.map(item => {
        const icon = AppIcon[item.icon as keyof typeof AppIcon];
        return {
            id: item.id,
            title: item.title,
            details: item.details,
            startDate: item.startDate ? new Date(item.startDate) : undefined,
            endDate: item.endDate ? new Date(item.endDate) : undefined,
            location: item.location,
            icon: icon,
        };
    });
}

export function getBeaconTemplatesFromJson() {
    return beaconTemplatesJson.map(item => {
        const type: BeaconType = item.type as BeaconType;
        const icon = AppIcon[item.icon as keyof typeof AppIcon];
        return {
            id: item.id,
            name: item.name,
            message: item.message,
            icon: icon,
            type: type
        };
    });
}

export function getPreferencesFromJson() {
    return preferencesJson.map(item => {
        return {

        };
    });
}

export function getPromptsFromJson() {
    return promptsJson.map(item => {
        const type: PromptType = item.type as PromptType;
        return {
            id: item.id,
            userId: item.userId,
            question: item.question,
            response: item.response,
            type: type
        };
    });
}

export function getStoriesFromJson() {
    return storiesJson.map(item => {
        const type: StoryType = item.type as StoryType;
        const icon = AppIcon[item.icon as keyof typeof AppIcon];
        return {
            id: item.id,
            userId: item.userId,
            type: type,
            title: item.title,
            icon: icon,
            useTextTint: item.useTextTint
        };
    });
}

export function getStoryActivitiesFromJson() {
    return storyActivitiesJson.map(item => {
        return {
            id: item.id,
            note: item.note,
            date: item.date ? new Date(item.date) : undefined,
            userId: item.userId,
            storyId: item.storyId,
            openedChapters: item.openedChapters,
            totalChapters: item.totalChapters
        };
    });
}

export function getUsersFromJson() {
    return usersJson.map(item => {
        const icon = AvatarIcon[item.icon as keyof typeof AvatarIcon];
        const role: Role = item.type as Role;
        return {
            id: item.id,
            name: item.name,
            email: item.email,
            role: role,
            createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
            icon: icon
        };
    });
}