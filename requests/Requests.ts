import { AvatarIcon, OneStage, OneCategory, Priority, BeaconType, ActionStepType, Role, StoryChapterType, StoryChapterTag } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import Beacon from "@/models/beacon";
import BeaconActivity from "@/models/beaconActivity";
import One from "@/models/one";
import StoryChapter from "@/models/storyChapter";
import User from "@/models/user";
import { getData, postData } from "@/utils/apiUtils";
import { generateRandomId, mapStoryChapterTypeToAppIcon } from "@/utils/appUtils";
import { AxiosRequestConfig } from "axios";

export const fetchServerData = async (userId: string) => {
    try {
        const response = await getData(`/users/${userId}`);
        console.log("fetchServerData: ", response);
        if (response.status !== 200 || response.data.error) {
            return { error: response.data.error };
        }

        const serverData = response.data;

        const user = new User(
            serverData.id,
            serverData.name,
            serverData.email,
            serverData.type as Role,
            AvatarIcon[serverData.icon as keyof typeof AvatarIcon],
            serverData.createdAt,
        );

        const ones = [];
        const actionSteps = [];
        for (let one of serverData.ones) {
            ones.push(
                new One(
                    one.id,
                    one.name,
                    AvatarIcon[one.icon as keyof typeof AvatarIcon],
                    one.stage as OneStage,
                    one.category as OneCategory,
                    one.prayingSince,
                    one.gospelChecklist ? one.gospelChecklist.split(',').map((item: any) => parseInt(item)) : [],
                    one.hidden,
                    serverData.id,
                )
            );

            for (let step of one.actionSteps) {
                actionSteps.push(
                    new ActionStep(
                        step.id,
                        step.notes,
                        step.oneId,
                        step.isComplete,
                        step.targetDate,
                        step.type as ActionStepType
                    )
                );
            }
        }

        const beacons = [];
        for (let beacon of serverData.beacons) {
            beacons.push(
                new Beacon(
                    beacon.id,
                    beacon.name,
                    beacon.message,
                    beacon.oneId,
                    beacon.priority as Priority,
                    beacon.userId,
                    beacon.type as BeaconType,
                    beacon.activeUntil,
                    beacon.shareOwnName
                )
            );
        }

        const beaconActivities = [];
        for (let activity of serverData.beaconActivities) {
            beaconActivities.push(
                new BeaconActivity(
                    activity.id,
                    activity.note,
                    activity.date,
                    activity.userId,
                    activity.beaconId
                )
            );
        }

        return {
            user,
            ones,
            beacons,
            actionSteps,
            beaconActivities
        };
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

    return {};
};

export const partition = async (question: string, userResponse: string, userId: string, config?: AxiosRequestConfig) => {
    if (!question || !userResponse || !userId) {
        console.error('Missing required parameters: question, userResponse, or userId.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await postData(`/stories/partition/${userId}`, {
            question,
            userResponse
        }, config);

        if (response?.status !== 200 || response.data.error) {
            console.error("Error in response:", response.data.error || "Unknown error");
            return { error: response.data.error || 'Unknown error' };
        } else if (!response.data || !(response.data instanceof Array)) {
            return { error: 'Invalid data format...' };
        }

        return response.data.map((item: any) => new StoryChapter(
            generateRandomId(9),
            "myTestimony",
            item.category as StoryChapterType,
            item.title,
            item.details,
            item.questions,
            mapStoryChapterTypeToAppIcon(item.category as StoryChapterType),
            1,
            item.tags.map((tag: any) => tag as StoryChapterTag),
            item.names,
            item.quality,
            false
        ));
    } catch (error: any) {
        console.error('Error retrieving data:', error.message || error);
        return { error: error.message || 'An error occurred while fetching data.' };
    }
};