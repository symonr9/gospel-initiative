import One from "@/models/one";
import { getAvatarIconKey } from "@/utils/appUtils";
import { makeRequest, performCreateOrUpdateRequest } from "./Requests";
import { ActionStepType } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import Christian from "@/models/christian";
import GospelStep from "@/models/gospelStep";
import OneNote from "@/models/oneNote";

export const createOne = async (one: One, controller?: AbortController): Promise<One | any> => {
    const preparedOne = {
        ...one,
        iconKey: getAvatarIconKey(one.icon)
    };
    return performCreateOrUpdateRequest(true, preparedOne, 'ones', controller);
};

export const updateOne = async (one: One, controller?: AbortController): Promise<One | any> => {
    const preparedOne = {
        ...one,
        iconKey: getAvatarIconKey(one.icon)
    };
    return performCreateOrUpdateRequest(false, preparedOne, 'ones', controller);
};

export const createChristian = async (christian: Christian, controller?: AbortController): Promise<Christian | any> => {
    const preparedChristian = {
        ...christian,
        iconKey: getAvatarIconKey(christian.icon)
    };
    return performCreateOrUpdateRequest(true, preparedChristian, 'christians', controller);
}

export const updateChristian = async (christian: Christian, controller?: AbortController): Promise<Christian | any> => {
    const preparedChristian = {
        ...christian,
        iconKey: getAvatarIconKey(christian.icon)
    };
    return performCreateOrUpdateRequest(false, preparedChristian, 'christians', controller);
};

export const createGospelStep = async (gospelStep: GospelStep, controller?: AbortController): Promise<GospelStep | any> => {
    return performCreateOrUpdateRequest(true, gospelStep, 'gospelSteps', controller);
}

export const updateGospelStep = async (gospelStep: GospelStep, controller?: AbortController): Promise<GospelStep | any> => {
    return performCreateOrUpdateRequest(false, gospelStep, 'gospelSteps', controller);
};

export const createOneNote = async (oneNote: OneNote, controller?: AbortController): Promise<OneNote | any> => {
    return performCreateOrUpdateRequest(true, oneNote, 'oneNotes', controller);
}

export const updateOneNote = async (oneNote: OneNote, controller?: AbortController): Promise<OneNote | any> => {
    return performCreateOrUpdateRequest(false, oneNote, 'oneNotes', controller);
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