import { ActionStepType, AppIcon, AvatarIcon, OneFactType, OneStage, BeaconType, PromptType, StoryChapterType, StoryType, OneCategory, OneNoteType, GospelStepType, BeaconTag, Priority } from "@/enums/enums";
import One from "@/models/one";
import { mapOneFactTypeToAppIcon, shouldKeepChapter } from "./appUtils";
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
const onesFactsJson = require('../data/one-facts.json');
const beaconTemplatesJson = require('../data/beacon-templates.json');
const preferencesJson = require('../data/preferences.json');
const promptsJson = require('../data/prompts.json');
const storiesJson = require('../data/stories.json');
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
        item.gospelChecklist ? item.gospelChecklist.split(',').map(Number) : [],
        item.hidden,
        item.userId,
        getActionStepsFromJson(item.actionSteps),
        getOneNotesFromJson(item.oneNotes),
        getGospelStepsFromJson(item.gospelSteps),
        getChristiansFromJson(item.christians)
    ));
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
        item.notes,
        item.nextSteps,
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
    return new User(
        item.id,
        item.name,
        item.email,
        item.type as Role,
        AvatarIcon[item.icon as keyof typeof AvatarIcon],
        item.createdAt,
    );
}

export function getStoryChaptersFromJson(json: any[]) {
    return json.map((item) => getStoryChapterFromJson(item));
}

export function getStoryChapterFromJson(item: any) {
    return new StoryChapter(
        item.id,
        item.storyId,
        item.type as StoryChapterType,
        item.title,
        item.content,
        item.questions ? item.questions.split(',') : [],
        AppIcon[item.icon as keyof typeof AppIcon],
        item.order,
        item.tags ? item.tags.split(',').map(Number) : [],
        item.names ? item.names.split(',') : [],
        item.quality,
        item.userId,
        shouldKeepChapter(item.quality),
        item.originalPrompt
    );
};

export function getBeaconsFromJson(json: any[]) {
    return json.map(item => {
        const type: BeaconType = item.type as BeaconType;
        return {
            id: item.id,
            name: item.name,
            message: item.message,
            userId: item.userId,
            oneId: item.oneId,
            priority: item.priority,
            type: type,
            activeUntil: item.activeUntil ? new Date(item.activeUntil) : undefined,
            shareOwnName: item.shareOwnName
        }
    });
}

export function getBeaconFromJson(item: any) {
    return new Beacon(
        item.id,
        item.name,
        item.message,
        item.oneId,
        item.priority as Priority,
        item.userId,
        item.type as BeaconType,
        item.activeUntil ? new Date(item.activeUntil) : undefined,
        item.shareOwnName,
        getBeaconActivitiesFromJson(item.activities || []),
        item.tags ? item.tags.split(',').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as BeaconTag) : []
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
        item.beaconId
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

export function getOneFactsFromJson() {
    return onesFactsJson.map(item => {
        const type: OneFactType = item.type as OneFactType;
        return {
            id: item.id,
            notes: item.notes,
            priority: item.priority,
            type: item.type,
            oneId: item.oneId,
            icon: mapOneFactTypeToAppIcon(type)
        }
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
            icon: icon
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