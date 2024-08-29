import { ActionStepType, ActivityType, AppIcon, AvatarIcon, OneFactType, OneStage, PrayerBeaconType, PrayerType, PromptType, StoryChapterType } from "@/enums/enums";
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
const prayerBeaconSettingsJson = require('../data/prayer-beacon-settings.json');
const prayerBeaconsJson = require('../data/prayer-beacons.json');
const prayerRequestsJson = require('../data/prayer-requests.json');
const prayersJson = require('../data/prayers.json');
const preferencesJson = require('../data/preferences.json');
const promptsJson = require('../data/prompts.json');
const storiesJson = require('../data/stories.json');
const storyChaptersJson = require('../data/story-chapters.json');
const usersJson = require('../data/users.json');
const activitiesJson = require('../data/activities.json');

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
        return {
            id: item.id,
            title: item.title,
            details: item.details        
        };
    });
}

export function getLocalMinistriesJson() {
    return localMinistriesJson.map(item => {
        return {
            id: item.id,
            title: item.title,
            details: item.details       
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
        return {
            id: item.id,
            title: item.title,
            details: item.details       
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
            item.nextMeetingAt ? new Date(item.nextMeetingAt) : undefined,
            item.prayingSince ? new Date(item.prayingSince) : undefined,
            false,
            item.userId
        );
    });
}

export function getPrayersFromJson() {
    return prayersJson.map(item => {    
        const type = PrayerType[item.type as keyof typeof PrayerType];    
        return {
            id: item.id,
            name: item.name,
            lastPrayedAt: item.lastPrayedAt ? new Date(item.lastPrayedAt) : undefined,
            userId: item.userId,
            oneId: item.oneId,
            requests: [],
            type: type
        };
    });
}

export function getPrayerBeaconsFromJson() {
    return prayerBeaconsJson.map(item => {        
        const type: PrayerBeaconType = item.type as PrayerBeaconType;

        return {
            id: item.id,
            name: item.name,
            message: item.message,
            userId: item.userId,
            oneId: item.oneId,
            meetingId: item.meetingId,
            responses: item.responses,
            targetDate: item.targetDate ? new Date(item.targetDate) : undefined,
            priority: item.priority,
            type: type,
            settingsId: item.settingsId,
            activeUntil: item.activeUntil ? new Date(item.activeUntil) : undefined,
        }
    });
}

export function getPrayerBeaconSettingsFromJson() {
    return prayerBeaconSettingsJson.map(item => {        
        return {
            id: item.id,
            name: item.name,
            userId: item.userId,
            shareOneName: item.shareOneName,
            shareOwnName: item.shareOwnName
        }
    });
}

export function getPrayerRequestsFromJson() {
    return prayerRequestsJson.map(item => {
        return {
            id: item.id,
            name: item.name,
            text: item.text,
            prayerId: item.prayerId,
            createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
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
        return {
            id: item.id,
            title: item.title,
            content: item.content,
            userId: item.userId,
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
            icon: icon,
            order: item.order
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

export function getActivitiesFromJson() {
    return activitiesJson.map(item => {
        const type: ActivityType = item.type as ActivityType;
        return {
            id: item.id,
            name: item.name,
            hours: item.hours,
            date: item.date ? new Date(item.date) : undefined,
            localEventId: item.localEventId,
            localMinistryId: item.localMinistryId,
            missionsTripId: item.missionsTripId,
            userId: item.userId,
            beaconId: item.beaconId,
            type: item.type
        };
    });
}