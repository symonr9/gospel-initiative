import { ActionStepType, AppIcon, AvatarIcon, BeaconLogTag, OneFactType, OneStage, BeaconType, PromptType, StoryChapterType, StoryType } from "@/enums/enums";
import One from "@/models/one";
import { mapOneFactTypeToAppIcon } from "./appUtils";
import { JournalEntryType } from "@/enums/enums";
import { LeaderType } from "@/enums/enums";
import { MeetingTag } from "@/enums/enums";
import { Role } from "@/enums/enums";

const actionStepsJson = require('../data/action-steps.json');
const journalEntriesJson = require('../data/journal-entries.json');
const leadersJson = require('../data/leaders.json');
const localEventsJson = require('../data/local-events.json');
const localMinistriesJson = require('../data/local-ministries.json');
const meetingsJson = require('../data/meetings.json');
const missionsTripsJson = require('../data/missions-trips.json');
const onesFactsJson = require('../data/one-facts.json');
const onesData = require('../data/ones.json');
const beaconsJson = require('../data/beacons.json');
const beaconTemplatesJson = require('../data/beacon-templates.json');
const preferencesJson = require('../data/preferences.json');
const promptsJson = require('../data/prompts.json');
const storiesJson = require('../data/stories.json');
const storyChaptersJson = require('../data/story-chapters.json');
const storyActivitiesJson = require('../data/story-activities.json');
const usersJson = require('../data/users.json');
const ministryActivitiesJson = require('../data/ministry-activities.json');
const beaconActivitiesJson = require('../data/beacon-activities.json');
const beaconLogsJson = require('../data/beacon-logs.json');

export function getActionStepsJson() {
    return actionStepsJson.map(item => {
        const type: ActionStepType = item.type as ActionStepType;
        return {
            id: item.id,
            notes: item.notes,
            oneId: item.oneId,
            isComplete: item.isComplete,
            targetDate: item.targetDate ? new Date(item.targetDate) : undefined,
            type: type
        };
    });
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
            icon: icon     
        };
    });
}

export function getMeetingsJson() {
    return meetingsJson.map(item => {
        const location: Location = item.type as Location;
        const tags: MeetingTag[] = item.tags.map((tag) => MeetingTag[tag as keyof typeof MeetingTag]);

        return {
            id: item.id,
            meetingDate: item.meetingDate ? new Date(item.meetingDate) : undefined,
            notes: item.notes,
            oneId: item.oneId,
            tags: tags,
            location: location
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
            icon: icon,
        };
    });
}

export function getOnesFromJson() {
    return onesData.map(item => {
        const icon = AvatarIcon[item.icon as keyof typeof AvatarIcon];
        const stage: OneStage = item.stage as OneStage;
        
        return new One(
            item.id,
            item.name,
            icon,
            stage,
            item.prayingSince ? new Date(item.prayingSince) : undefined,
            false,
            item.userId
        );
    });
}

export function getBeaconsFromJson() {
    return beaconsJson.map(item => {        
        const type: BeaconType = item.type as BeaconType;
        return {
            id: item.id,
            name: item.name,
            message: item.message,
            userId: item.userId,
            oneId: item.oneId,
            meetingId: item.meetingId,
            priority: item.priority,
            type: type,
            activeUntil: item.activeUntil ? new Date(item.activeUntil) : undefined,
            shareOneName: item.shareOneName,
            shareOwnName: item.shareOwnName
        }
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

export function getStoryChaptersFromJson() {
    return storyChaptersJson.map(item => {  
        const chapterType: StoryChapterType = item.chapterType as StoryChapterType;
        const icon = AppIcon[item.icon as keyof typeof AppIcon];

        return {
            id: item.id,
            storyId: item.storyId,
            chapterType: chapterType,
            title: item.title,
            content: item.content,
            questions: item.questions,
            icon: icon,
            order: item.order
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

export function getMinistryActivitiesFromJson() {
    return ministryActivitiesJson.map(item => {
        return {
            id: item.id,
            note: item.note,
            hours: item.hours,
            date: item.date ? new Date(item.date) : undefined,
            localEventId: item.localEventId,
            localMinistryId: item.localMinistryId,
            missionsTripId: item.missionsTripId,
            userId: item.userId
        };
    });
}

export function getBeaconActivitiesFromJson() {
    return beaconActivitiesJson.map(item => {
        return {
            id: item.id,
            note: item.note,
            date: item.date ? new Date(item.date) : undefined,
            userId: item.userId,
            beaconId: item.beaconId
        };
    });
}


export function getBeaconLogsFromJson() {
    return beaconLogsJson.map(item => {
        const tags: BeaconLogTag[] = item.tags?.map((tagValue: number) => tagValue as BeaconLogTag) || [];
        return {
            id: item.id,
            note: item.note,
            date: item.date ? new Date(item.date) : undefined,
            userId: item.userId,
            beaconId: item.beaconId,
            tags: tags
        };
    });
}