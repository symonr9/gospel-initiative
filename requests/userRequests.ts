import { postData } from "@/utils/apiUtils";
import { saveToStorage, isSecureStorageAvailable, saveToSecureStorage, getLocalRefreshToken, getLocalUserId, setLocalNewUserStep } from "@/utils/storageUtils";
import { makeRequest, performRequest, RequestType } from "./Requests";
import { getUserFromJson, getOnesFromJson, getStoryChaptersFromJson, getBeaconsFromJson } from "@/utils/jsonFunctions";
import { NewUserStep, RefreshSpec } from "@/enums/enums";
import User from "@/models/user";
import { getAvatarIconKey } from "@/utils/appUtils";

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
    setLocalNewUserStep(NewUserStep.Splash);

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

export const updateUser = async (user: User, controller?: AbortController) => {
    const preparedUser = {
        ...user,
        icon: getAvatarIconKey(user.icon)
    };
    return performRequest(RequestType.Update, preparedUser, '/users', 'user', controller);
}

export const fetchServerData = async (refreshSpec: RefreshSpec): Promise<any> => {
    try {
        const endpoint = getServerDataEndpoint(refreshSpec);
        const response = await makeRequest(endpoint);
        if (!response) {
            return { error: 'Failed to contact server.' };
        } else if (response.data.error) {
            return { error: response.data.error };
        } else if (response.error) {
            return { error: response.error };
        } else if (response.data && response.data instanceof String) {
            return { error: response.data };
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

