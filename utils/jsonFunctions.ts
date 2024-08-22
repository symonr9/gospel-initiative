import { ActionStepType, AvatarIcon, OneStage, PrayerType } from "@/enums/enums";
import One from "@/models/one";


const actionStepsJson = require('../data/action-steps.json');
export function getActionStepsJson() {
    return actionStepsJson.map(item => {    
        const type = ActionStepType[item.type as keyof typeof ActionStepType];    
        return {
            id: item.id,
            name: item.name,
            isComplete: item.isComplete,
            targetDate: item.targetDate ? new Date(item.lastPrayedAt) : undefined,
            userId: item.userId,
            oneId: item.oneId,
            requests: [],
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
        const stage = OneStage[item.stage as keyof typeof OneStage];
        
        return new One(
            item.id,
            item.name,
            icon,
            stage,
            item.nextMeetingAt ? new Date(item.nextMeetingAt) : undefined,
            [],  // meetings (assuming you populate this later)
            [],  // prayers (assuming you populate this later)
            [],  // actionSteps (assuming you populate this later)
            [],  // facts (assuming you populate this later)
            new Date(item.prayingSince),
            false // hidden (set this based on your logic)
        );
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
        return {
            id: item.id,
            title: item.title,
            content: item.content,
            userId: item.userId,
            oneId: item.oneId || undefined,
            order: item.order,
        };
    });
}