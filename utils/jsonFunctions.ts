import { ActionStepType, AppIcon, AvatarIcon, OneFactType, OneStage, PrayerBeaconType, PrayerType, StoryChapterType } from "@/enums/enums";
import One from "@/models/one";
import { mapOneFactTypeToAppIcon } from "./appUtils";


const actionStepsJson = require('../data/action-steps.json');
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

const prayersJson = require('../data/prayers.json');
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

const onesData = require('../data/ones.json');
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
            false
        );
    });
}

const onesFactsJson = require('../data/one-facts.json');
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

const storiesJson = require('../data/stories.json');
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

const storyChaptersJson = require('../data/story-chapters.json');
export function getStoryChaptersFromJson() {
    return storyChaptersJson.map(item => {  
        const chapterType = StoryChapterType[item.chapterType as keyof typeof StoryChapterType];
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

const prayerBeaconsJson = require('../data/prayer-beacons.json');
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
            settingsId: item.settingsId
        }
    });
}

const prayerBeaconSettingsJson = require('../data/prayer-beacon-settings.json');
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