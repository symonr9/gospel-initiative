import { getData, postData } from "@/utils/apiUtils";
import { getLocalAccessToken, getLocalUserId } from "@/utils/storageUtils";
import { refreshAccessToken } from "./userRequests";

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
