import { AvatarIcon, OneStage, OneCategory, Priority, BeaconType, ActionStepType, Role, StoryChapterType, StoryChapterTag, AppIcon } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import Beacon from "@/models/beacon";
import BeaconActivity from "@/models/beaconActivity";
import One from "@/models/one";
import StoryChapter from "@/models/storyChapter";
import User from "@/models/user";
import { getData, postData } from "@/utils/apiUtils";
import { generateRandomId, getAppIconKey, getAvatarIconKey, mapStoryChapterTypeToAppIcon, shouldKeepChapter } from "@/utils/appUtils";

export const fetchActiveBeacons = async (userId: string) => {
    try {
        const response = await getData(`/beacons/active`, {
            headers: {
                user_id: userId
            }
        });
        console.log("fetchActiveBeacons: ", response);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        const beacons = [];
        for (let beacon of response.data) {
            beacons.push(
                new Beacon(
                    beacon.id,
                    beacon.name,
                    beacon.message,
                    beacon.oneId,
                    beacon.priority as Priority,
                    beacon.userId,
                    beacon.type as BeaconType,
                    beacon.activeUntil ? new Date(beacon.activeUntil) : undefined,
                    beacon.shareOwnName,
                    beacon.activities
                )
            );
        }

        return beacons;
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

    return [];
};

export const createUser = async () => {
    const response = await postData(`/users/create`, {
    });

    if (!response) {
        return { error: 'Failed to contact server.' };
    } else if (response.data.error) {
        return { error: response.data.error };
    } else if (response.status !== 200) {
        return { error: `Response returned error: ${response.status}` };
    }

    return response.data;
}

export const fetchServerSettings = async (userId: string) => {
    const response = await getData(`/users/settings/${userId}`, {
        headers: {
            user_id: userId
        }
    });
    
    console.log("fetchServerSettings: ", response);

    if (!response) {
        return { error: 'Failed to contact server.' };
    } else if (response.data.error) {
        return { error: response.data.error };
    } else if (response.status !== 200) {
        return { error: `Response returned error: ${response.status}` };
    }

    return response.data;
}

export const fetchServerData = async (userId: string) => {
    try {
        const response = await getData(`/users/data/${userId}`, {
            headers: {
                user_id: userId
            }
        });

        console.log("fetchServerData: ", response);
        
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
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
                        step.targetDate ? new Date(step.targetDate) : undefined,
                        step.type as ActionStepType
                    )
                );
            }
        }

        const myStoryChapters = [];
        for (let chapter of serverData.chapters) {
            myStoryChapters.push(
                new StoryChapter(
                    chapter.id,
                    chapter.storyId,
                    chapter.type as StoryChapterType,
                    chapter.title,
                    chapter.content,
                    chapter.questions ? chapter.questions.split(',') : [],
                    AppIcon[chapter.icon as keyof typeof AppIcon],
                    chapter.order,
                    chapter.tags ? chapter.tags.split(',').map((item: any) => parseInt(item)) : [],
                    chapter.names ? chapter.names.split(',') : [],
                    chapter.quality,
                    chapter.userId,
                    shouldKeepChapter(chapter.quality)
                )
            );
        }

        return {
            user,
            ones,
            actionSteps,
            myStoryChapters
        };
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

    return {};
};

export const partition = async (question: string, userResponse: string, userId: string, controller?: AbortController) => {
    if (!question || !userResponse || !userId) {
        console.error('Missing required parameters: question, userResponse, or userId.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await postData(`/stories/partition`, {
            question,
            userResponse
        }, {
            headers: {
                user_id: userId
            },
            signal: controller?.signal,
            timeout: 10000 
        });

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

export const createChapters = async (chapterArray: StoryChapter[] | null, userId: string, controller?: AbortController) => {
    if (!chapterArray || !userId) {
        console.error('Missing required parameters: chapterArray, userId.');
        return { error: 'Invalid parameters.' };
    }

    const preparedChapterArray = chapterArray.map((chapter) => ({...chapter, iconKey: getAppIconKey(chapter.icon)}));

    try {
        const response = await postData(`/stories/create`, {
            chapterArray: preparedChapterArray
        }, {
            headers: {
                user_id: userId
            },
            signal: controller?.signal,
        });

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

export const updateChapter = async (chapter: StoryChapter, userId: string, controller?: AbortController) => {
    if (!chapter || !userId) {
        console.error('Missing required parameters: chapter, userId.');
        return { error: 'Invalid parameters.' };
    }

    const preparedChapter = {...chapter, iconKey: getAppIconKey(chapter.icon)};

    try {
        const response = await postData(`/stories/update`, {
            chapter: preparedChapter
        }, {
            headers: {
                user_id: userId
            },
            signal: controller?.signal,
        });

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

export const deleteChapter = async (chapter: StoryChapter, userId: string, controller?: AbortController) => {
    if (!chapter || !userId) {
        console.error('Missing required parameters: chapter, userId.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await postData(`/stories/delete`, {
            chapter
        }, {
            headers: {
                user_id: userId
            },
            signal: controller?.signal,
        });

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

export const createOne = async (one: One, userId: string, controller?: AbortController): Promise<One | any> => {
    return performOneRequest(true, one, userId, controller);
}

export const updateOne = async (one: One, userId: string, controller?: AbortController): Promise<One | any> => {
    return performOneRequest(false, one, userId, controller);
}

export const performOneRequest = async (adding: boolean, one: One, userId: string, controller?: AbortController): Promise<One | any> => {
    if (!one || !userId) {
        console.error('Missing required parameters: one, userId.');
        return { error: 'Invalid parameters.' };
    }

    const preparedOne = {
        ...one,
        iconKey: getAvatarIconKey(one.icon)
    };

    try {
        const response = await postData(`/ones/${adding ? 'create' : 'update'}`, {
            one: preparedOne
        }, {
            headers: {
                user_id: userId
            },
            signal: controller ? controller.signal : undefined,
        });

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

export const updateActionSteps = async (actionSteps: ActionStep[], oneId: string, userId: string, controller?: AbortController): Promise<ActionStep[] | any> => {
    if (!actionSteps || !oneId || !userId) {
        console.error('Missing required parameters: actionSteps, oneId, userId.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await postData(`/ones/action-steps/update`, {
            actionSteps,
            oneId
        }, {
            headers: {
                user_id: userId
            },
            signal: controller ? controller.signal : undefined,
        });

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

export const createBeacon = async (beacon: Beacon, userId: string, controller?: AbortController): Promise<Beacon | any> => {
    if (!beacon || !userId) {
        console.error('Missing required parameters: beacon, userId.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await postData(`/beacons/create`, {
            beacon
        }, {
            headers: {
                user_id: userId
            },
            signal: controller ? controller.signal : undefined,
        });

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
            []
        );
    } catch (error: any) {
        console.error('Error creating beacon:', error.message || error);
        return { error: error.message || 'An error occurred while creating beacon.' };
    }
};

export const createBeaconActivity = async (activity: BeaconActivity, userId: string, controller?: AbortController): Promise<One | any> => {
    return performBeaconActivityRequest(true, activity, userId, controller);
}

export const updateBeaconActivity = async (activity: BeaconActivity, userId: string, controller?: AbortController): Promise<One | any> => {
    return performBeaconActivityRequest(false, activity, userId, controller);
}

export const performBeaconActivityRequest = async (adding: boolean, activity: BeaconActivity, userId: string, controller?: AbortController): Promise<One | any> => {
    if (!activity || !userId) {
        console.error('Missing required parameters: activity, userId.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await postData(`/beacons/activity/${adding ? 'create' : 'update'}`, {
            activity
        }, {
            headers: {
                user_id: userId
            },
            signal: controller ? controller.signal : undefined,
        });

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