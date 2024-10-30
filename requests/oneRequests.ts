import One from "@/models/one";
import { getAvatarIconKey } from "@/utils/appUtils";
import { getOneFromJson } from "@/utils/jsonFunctions";
import { getLocalUserId } from "@/utils/storageUtils";
import { makeRequest } from "./Requests";
import { ActionStepType } from "@/enums/enums";
import ActionStep from "@/models/actionStep";

export const createOne = async (one: One, controller?: AbortController): Promise<One | any> => {
    return performOneRequest(true, one, controller);
};

export const updateOne = async (one: One, controller?: AbortController): Promise<One | any> => {
    return performOneRequest(false, one, controller);
};

const performOneRequest = async (adding: boolean, one: One, controller?: AbortController): Promise<One | any> => {
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

        return getOneFromJson(response.data);
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
