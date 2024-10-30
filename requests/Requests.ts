import { getData, postData } from "@/utils/apiUtils";
import { getLocalAccessToken, getLocalUserId } from "@/utils/storageUtils";
import { refreshAccessToken } from "./userRequests";
import { AppIcon, AvatarIcon } from "@/enums/enums";
import { getAppIconKey, getAvatarIconKey } from "@/utils/appUtils";

export const makeRequest = async (url: string, method: string = 'GET', body: any = null, controller?: AbortController): Promise<any> => {
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

export const performCreateOrUpdateRequest = async (adding: boolean, entity: any, entityType: string, controller?: AbortController): Promise<any> => {
    const userId = await getLocalUserId();
    if (!userId || !entity) {
        console.error('Missing required parameters: userId, entity.');
        return { error: 'Invalid parameters.' };
    }

    try {
        const response = await makeRequest(`/${entityType}/${adding ? 'create' : 'update'}`, 'POST', 
            { [entityType.slice(0, -1)]: entity }, controller);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.status !== 200) {
            return { error: `Response returned error: ${response.status}` };
        }

        return response.data;
    } catch (error: any) {
        console.error(`Error adding/editing ${entityType.slice(0, -1)}:`, error.message || error);
        return { error: error.message || `An error occurred while adding/editing ${entityType.slice(0, -1)}.` };
    }
};
