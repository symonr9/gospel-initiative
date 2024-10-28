import { AvatarIcon, OneStage, OneCategory, Priority, BeaconType, ActionStepType, Role, StoryChapterType, StoryChapterTag, AppIcon, BeaconTag } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import Beacon from "@/models/beacon";
import BeaconActivity from "@/models/beaconActivity";
import One from "@/models/one";
import StoryChapter from "@/models/storyChapter";
import User from "@/models/user";
import { getData, postData } from "@/utils/apiUtils";
import { generateRandomId, getAppIconKey, getAvatarIconKey, mapStoryChapterTypeToAppIcon, shouldKeepChapter } from "@/utils/appUtils";
import { getLocalAccessToken, getLocalRefreshToken, getLocalUserId, isSecureStorageAvailable, saveToSecureStorage, saveToStorage } from "@/utils/storageUtils";

export const fetchBeacons = async (active: Boolean = true) => {
    try {
        const response = await makeRequest(`/beacons/${active ? 'active' : 'expired'}`);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        return response.data.map((beacon: any) => {
            const activities = beacon.activities.map((item: any) => {
                let activity = new BeaconActivity(
                    item.id,
                    item.note,
                    item.date,
                    item.userId,
                    item.beaconId
                );
                activity.username = item.username || "";
                return activity;
            });

            const item = new Beacon(
                beacon.id,
                beacon.name,
                beacon.message,
                beacon.oneId,
                beacon.priority as Priority,
                beacon.userId,
                beacon.type as BeaconType,
                beacon.activeUntil ? new Date(beacon.activeUntil) : undefined,
                beacon.shareOwnName,
                activities,                
                beacon.tags ? beacon.tags.split(',').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as BeaconTag) : [],
            );

            item.userName = beacon.user.name;
            item.userIcon = AvatarIcon[beacon.user.icon as keyof typeof AvatarIcon];
            
            item.oneName = beacon.one.name;
            item.oneIcon = AvatarIcon[beacon.one.icon as keyof typeof AvatarIcon];
            item.oneStage = beacon.one.stage as OneStage;
            
            return item;
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

    return [];
};

export const createUser = async () => {
    // Plain postData, no makeRequest() here
    const response = await postData(`/users/create`, {});
    if (!response) {
        return { error: 'Failed to contact server.' };
    } else if (response.data.error) {
        return { error: response.data.error };
    } else if (response.status !== 200) {
        return { error: `Response returned error: ${response.status}` };
    }

    const { user, accessToken, refreshToken } = response.data;
    if (!user || !user.id || !accessToken || !refreshToken) {
        return { error: 'Failed to retrieve expected data from server.' };
    }

    saveToStorage("userId", user.id);

    const isSecureAvailable = await isSecureStorageAvailable();
    if (isSecureAvailable) {
        saveToSecureStorage("accessToken", accessToken);
        saveToSecureStorage("refreshToken", refreshToken);
    } else {
        saveToStorage("accessToken", accessToken);
        saveToStorage("refreshToken", refreshToken);
    }

    return {};
}

export const fetchServerSettings = async () => {
    try {
        const response = await makeRequest(`/users/settings`);
        console.log("fetchServerSettings: ", response);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }
        return response.data;
    } catch (error) {
        console.error('Error retrieving settings:', error);
        return { error: error };
    }
}

export const fetchServerData = async (): Promise<any> => {
    try {
        const response = await makeRequest(`/users/data`);
        console.log("fetchServerData: ", response);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.error) {
            return { error: response.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        return parseServerData(response.data);
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

    return {};
};

const parseServerData = (serverData: any) => {
    const user = new User(
        serverData.id,
        serverData.name,
        serverData.email,
        serverData.type as Role,
        AvatarIcon[serverData.icon as keyof typeof AvatarIcon],
        serverData.createdAt,
    );

    const ones = serverData.ones.map((one: any) => new One(
        one.id,
        one.name,
        AvatarIcon[one.icon as keyof typeof AvatarIcon],
        one.stage as OneStage,
        one.category as OneCategory,
        one.prayingSince,
        one.gospelChecklist ? one.gospelChecklist.split(',').map(Number) : [],
        one.hidden,
        serverData.id,
    ));

    const actionSteps = serverData.ones.flatMap((one: any) =>
        one.actionSteps.map((step: any) => new ActionStep(
            step.id,
            step.notes,
            step.oneId,
            step.isComplete,
            step.targetDate ? new Date(step.targetDate) : undefined,
            step.type as ActionStepType
        ))
    );

    const myStoryChapters = serverData.chapters.map((chapter: any) => new StoryChapter(
        chapter.id,
        chapter.storyId,
        chapter.type as StoryChapterType,
        chapter.title,
        chapter.content,
        chapter.questions ? chapter.questions.split(',') : [],
        AppIcon[chapter.icon as keyof typeof AppIcon],
        chapter.order,
        chapter.tags ? chapter.tags.split(',').map(Number) : [],
        chapter.names ? chapter.names.split(',') : [],
        chapter.quality,
        chapter.userId,
        shouldKeepChapter(chapter.quality)
    ));

    return {
        user,
        ones,
        actionSteps,
        myStoryChapters,
    };
};

export const partition = async (question: string, userResponse: string, controller?: AbortController) => {
    const userId = await getLocalUserId();
    if (!userId || !question || !userResponse) {
        console.error('Missing required parameters: userId or question or userResponse.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await makeRequest(`/stories/partition`, 'POST', { question, userResponse }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
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
            item.tags ? item.tags.split(',').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as StoryChapterTag) : [],
            item.names ? item.names.split(',') : [],
            item.quality,
            userId,
            false
        ));
    } catch (error: any) {
        console.error('Error partition():', error.message || error);
        return { error: error.message || 'An error occurred while partitioning data.' };
    }
};

export const createChapters = async (chapterArray: StoryChapter[] | null, controller?: AbortController) => {
    if (!chapterArray) {
        console.error('Missing required parameters: chapterArray.');
        return { error: 'Invalid parameters.' };
    }

    const preparedChapterArray = chapterArray.map((chapter) => ({ ...chapter, iconKey: getAppIconKey(chapter.icon) }));

    try {
        const response = await makeRequest(`/stories/create`, 'POST', { chapterArray: preparedChapterArray }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        return response.data;
    } catch (error: any) {
        console.error('Error addingChapters():', error.message || error);
        return { error: error.message || 'An error occurred while adding chapters.' };
    }
}

export const updateChapter = async (chapter: StoryChapter, controller?: AbortController) => {
    if (!chapter) {
        console.error('Missing required parameters: chapter.');
        return { error: 'Invalid parameters.' };
    }

    const preparedChapter = { ...chapter, iconKey: getAppIconKey(chapter.icon) };

    try {
        const response = await makeRequest(`/stories/update`, 'POST', { chapter: preparedChapter }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        return response.data;
    } catch (error: any) {
        console.error('Error updateChapter():', error.message || error);
        return { error: error.message || 'An error occurred while updating chapter.' };
    }
}

export const deleteChapter = async (chapter: StoryChapter, controller?: AbortController) => {
    if (!chapter) {
        console.error('Missing required parameters: chapter.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await makeRequest(`/stories/delete`, 'POST', { chapter }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        return response.data;
    } catch (error: any) {
        console.error('Error deleteChapter():', error.message || error);
        return { error: error.message || 'An error occurred while deleting chapter.' };
    }
}

export const createOne = async (one: One, controller?: AbortController): Promise<One | any> => {
    return performOneRequest(true, one, controller);
}

export const updateOne = async (one: One, controller?: AbortController): Promise<One | any> => {
    return performOneRequest(false, one, controller);
}

export const performOneRequest = async (adding: boolean, one: One, controller?: AbortController): Promise<One | any> => {
    const userId = await getLocalUserId();
    if (!userId || !one) {
        console.error('Missing required parameters: userId, one.');
        return { error: 'Invalid parameters.' };
    }

    const preparedOne = {
        ...one,
        iconKey: getAvatarIconKey(one.icon)
    };

    try {
        const response = await makeRequest(`/ones/${adding ? 'create' : 'update'}`, 'POST', { one: preparedOne }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        const one = response.data;

        return new One(
            one.id,
            one.name,
            AvatarIcon[one.icon as keyof typeof AvatarIcon],
            one.stage as OneStage,
            one.category as OneCategory,
            one.prayingSince,
            one.gospelChecklist ? one.gospelChecklist.split(',').map((item: any) => parseInt(item)) : [],
            one.hidden,
            userId,
        );
    } catch (error: any) {
        console.error('Error adding/editing one:', error.message || error);
        return { error: error.message || 'An error occurred while adding/editing one.' };
    }
};

export const updateActionSteps = async (actionSteps: ActionStep[], oneId: string, controller?: AbortController): Promise<ActionStep[] | any> => {
    if (!actionSteps || !oneId) {
        console.error('Missing required parameters: actionSteps, oneId.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await makeRequest(`/ones/action-steps/update`, 'POST', { actionSteps, oneId }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        const newSteps = [];
        for (let step of response.data) {
            newSteps.push(
                new ActionStep(
                    step.id,
                    step.notes,
                    step.oneId,
                    step.isComplete,
                    step.targetDate ? new Date(step.targetDate) : undefined,
                    step.type as ActionStepType
                )
            );
        }

        return newSteps;
    } catch (error: any) {
        console.error('Error updating action steps:', error.message || error);
        return { error: error.message || 'An error occurred while updating action steps.' };
    }
};

export const createBeacon = async (beacon: Beacon, controller?: AbortController): Promise<Beacon | any> => {
    if (!beacon) {
        console.error('Missing required parameters: beacon.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await makeRequest(`/beacons/create`, 'POST', { beacon }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        const beaconResponse = response.data;

        return new Beacon(
            beaconResponse.id,
            beaconResponse.name,
            beaconResponse.notes,
            beaconResponse.oneId,
            beaconResponse.priority as Priority,
            beaconResponse.userId,
            beaconResponse.type as BeaconType,
            beaconResponse.activeUntil ? new Date(beaconResponse.activeUntil) : undefined,
            beaconResponse.shareOwnName,
            [],
            beaconResponse.tags ? beaconResponse.tags.split(',').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as BeaconTag) : [],
        );
    } catch (error: any) {
        console.error('Error creating beacon:', error.message || error);
        return { error: error.message || 'An error occurred while creating beacon.' };
    }
};

export const createBeaconActivity = async (activity: BeaconActivity, controller?: AbortController): Promise<One | any> => {
    return performBeaconActivityRequest(true, activity, controller);
}

export const updateBeaconActivity = async (activity: BeaconActivity, controller?: AbortController): Promise<One | any> => {
    return performBeaconActivityRequest(false, activity, controller);
}

export const performBeaconActivityRequest = async (adding: boolean, activity: BeaconActivity, controller?: AbortController): Promise<One | any> => {
    if (!activity) {
        console.error('Missing required parameters: activity.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await makeRequest(`/beacons/activity/${adding ? 'create' : 'update'}`,
            'POST', { activity }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        const data = response.data;

        return new BeaconActivity(
            data.id,
            data.note,
            new Date(data.date),
            data.userId,
            data.beaconId,
        );
    } catch (error: any) {
        console.error('Error adding/editing beacon activity:', error.message || error);
        return { error: error.message || 'An error occurred while adding/editing beacon activity.' };
    }
};

export const deactivateBeacon = async (beacon: Beacon, controller?: AbortController): Promise<One | any> => {
    if (!beacon) {
        console.error('Missing required parameters: beacon.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await makeRequest(`/beacons/deactivate`,
            'POST', { beacon }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }
        
        return response.data;
    } catch (error: any) {
        console.error('Error deleting beacon:', error.message || error);
        return { error: error.message || 'An error occurred while deleting beacon.' };
    }
};

export const refreshAccessToken = async () => {
    const userId = await getLocalUserId();
    const currentRefreshToken = await getLocalRefreshToken();
    if (!userId || !currentRefreshToken) {
        return { error: 'Invalid configuration.' };
    }

    const response = await postData(`/auth/refresh`, {}, {
        headers: {
            user_id: userId,
            refresh_token: currentRefreshToken
        },
    });

    if (!response) {
        return { error: 'Failed to contact server.' };
    } else if (response.data.error) {
        return { error: response.data.error };
    } else if (response.status !== 200) {
        return { error: `Response returned error: ${response.status}` };
    }

    const { accessToken, refreshToken } = response.data;

    const isSecureAvailable = await isSecureStorageAvailable();
    if (isSecureAvailable) {
        saveToSecureStorage("accessToken", accessToken);
        if (refreshToken) {
            saveToSecureStorage("refreshToken", refreshToken);
        }
    } else {
        saveToStorage("accessToken", accessToken);
        if (refreshToken) {
            saveToStorage("refreshToken", refreshToken);
        }
    }

    return {};
}

const makeRequest = async (url: string, method: string = 'GET', body: any = null, controller?: AbortController): Promise<any> => {
    const userId = await getLocalUserId();
    const authToken = await getLocalAccessToken();
    if (!userId || !authToken) {
        return { data: { error: 'Invalid configuration.' } };
    }

    const headers = {
        user_id: userId,
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
        signal: controller?.signal,
        ...(body && { body: JSON.stringify(body) }),
    };

    const response = await (method === 'POST' ? postData(url, body, options) : getData(url, options));

    if (response && response.status === 403) {
        const refreshResult = await refreshAccessToken();
        if (refreshResult.error) {
            return { data: { error: `Failed to refresh access token: ${refreshResult.error}` } };
        }

        const newAuthToken = await getLocalAccessToken();
        headers.Authorization = `Bearer ${newAuthToken}`;
        return await (method === 'POST'
            ? postData(url, body, { ...options, headers })
            : getData(url, { ...options, headers }));
    }

    return response;
};
