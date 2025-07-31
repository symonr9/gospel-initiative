import { StoryChapterType, StoryChapterTag } from "@/enums/enums";
import StoryChapter from "@/models/storyChapter";
import { generateRandomId, getAppIconKey } from "@/utils/appUtils";
import { mapStoryChapterTypeToIcon } from "@/utils/iconUtils";
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
        } else if (response.data && response.data instanceof String) {
            return { error: response.data };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        return response.data.map((item: any) => new StoryChapter(
            generateRandomId(9),
            "myTestimony",
            item.category as StoryChapterType,
            item.title,
            item.details,
            item.questions,
            mapStoryChapterTypeToIcon(item.category as StoryChapterType),
            1,
            item.tags ? item.tags.split(',').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as StoryChapterTag) : [],
            item.names ? item.names.split(',') : [],
            item.quality,
            userId,
            false,
            question,
            item.lastModified ? new Date(item.lastModified) : undefined,
            item.created ? new Date(item.created) : undefined
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
    
    const preparedChapterArray = chapterArray.map((chapter) => ({
        ...chapter,
        icon: getAppIconKey(chapter.icon)
    }));
    
    return await processChapterRequest(`/stories/create`, { chapterArray: preparedChapterArray }, controller);
};

export const updateChapter = async (chapter: StoryChapter, controller?: AbortController) => {
    if (!chapter) {
        console.error('Missing required parameters: chapter.');
        return { error: 'Invalid parameters.' };
    }

    const preparedChapter = {
        ...chapter,
        icon: getAppIconKey(chapter.icon)
    };

    return await processChapterRequest(`/stories/update`, { chapter: preparedChapter }, controller);
};

export const deleteChapter = async (chapter: StoryChapter, controller?: AbortController) => {
    if (!chapter) {
        console.error('Missing required parameters: chapter.');
        return { error: 'Invalid parameters.' };
    }
    return await processChapterRequest(`/stories/delete`, { chapter }, controller);
};

const processChapterRequest = async (url: string, data: any, controller?: AbortController) => {
    try {
        const response = await makeRequest(url, 'POST', data, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.data && response.data instanceof String) {
            return { error: response.data };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }
        return response.data;
    } catch (error: any) {
        console.error(`Error in ${url}:`, error.message || error);
        return { error: error.message || 'An error occurred during the request.' };
    }
};