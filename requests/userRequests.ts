import { postData } from "@/utils/apiUtils";
import { saveToStorage, isSecureStorageAvailable, saveToSecureStorage, getLocalRefreshToken, getLocalUserId } from "@/utils/storageUtils";
import { makeRequest } from "./Requests";
import { getUserFromJson, getOnesFromJson, getStoryChaptersFromJson, getBeaconsFromJson } from "@/utils/jsonFunctions";
import { NewUserStep, RefreshSpec } from "@/enums/enums";

export const createUserAndSaveToLocalStorage = async () => {
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
    saveToStorage("newUserStep", NewUserStep.FirstStep);

    const isSecureAvailable = await isSecureStorageAvailable();
    if (isSecureAvailable) {
        saveToSecureStorage("accessToken", accessToken);
        saveToSecureStorage("refreshToken", refreshToken);
    } else {
        saveToStorage("accessToken", accessToken);
        saveToStorage("refreshToken", refreshToken);
    }

    return {};
};

export const fetchServerData = async (refreshSpec: RefreshSpec): Promise<any> => {
    try {
        const response = await makeRequest(getServerDataEndpoint(refreshSpec));
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

export const parseServerData = (serverData: any) => {
    const user = serverData.user ? getUserFromJson(serverData.user) : null;
    const ones = serverData.ones ? getOnesFromJson(serverData.ones) : null;
    const myStoryChapters = serverData.chapters ? getStoryChaptersFromJson(serverData.chapters) : null;
    const activeBeacons = serverData.activeBeacons ? getBeaconsFromJson(serverData.activeBeacons) : null;
    const expiredBeacons = serverData.expiredBeacons ? getBeaconsFromJson(serverData.expiredBeacons) : null;
    return {
        user,
        ones,
        myStoryChapters,
        activeBeacons,
        expiredBeacons
    };
};

const getServerDataEndpoint = (spec: RefreshSpec) : string => {
    switch(spec) {
        case RefreshSpec.User:
            return `/users/data/user`;
        case RefreshSpec.Ones:
            return `/users/data/ones`;
        case RefreshSpec.Stories:
            return `/users/data/stories`;
        case RefreshSpec.Beacons:
            return `/users/data/beacons`;
        case RefreshSpec.All:
        default:
            return `/users/data/all`;
    }
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
};

