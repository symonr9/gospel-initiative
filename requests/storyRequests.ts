import { StoryChapterType, StoryChapterTag } from "@/enums/enums";
import StoryChapter from "@/models/storyChapter";
import { generateRandomId, getAppIconKey, mapStoryChapterTypeToAppIcon } from "@/utils/appUtils";
import { getLocalUserId } from "@/utils/storageUtils";
import { makeRequest } from "./Requests";

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
            false,
            question
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
};

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
};

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
};

