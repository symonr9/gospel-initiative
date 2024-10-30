import { Priority, BeaconType, BeaconTag, AvatarIcon, OneStage } from "@/enums/enums";
import Beacon from "@/models/beacon";
import BeaconActivity from "@/models/beaconActivity";
import { makeRequest } from "./Requests";
import One from "@/models/one";
import { getBeaconActivityFromJson, getBeaconFromJson } from "@/utils/jsonFunctions";

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

        return response.data.map((item: any) => {
            const beacon = getBeaconFromJson(item);

            beacon.userName = item.user.name;
            beacon.userIcon = AvatarIcon[item.user.icon as keyof typeof AvatarIcon];
            beacon.oneName = item.one.name;
            beacon.oneIcon = AvatarIcon[item.one.icon as keyof typeof AvatarIcon];
            beacon.oneStage = item.one.stage as OneStage;

            return beacon;
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
    }

    return [];
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

        return getBeaconFromJson(response.data);
    } catch (error: any) {
        console.error('Error creating beacon:', error.message || error);
        return { error: error.message || 'An error occurred while creating beacon.' };
    }
};

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
        
        return getBeaconActivityFromJson(response.data);
    } catch (error: any) {
        console.error('Error adding/editing beacon activity:', error.message || error);
        return { error: error.message || 'An error occurred while adding/editing beacon activity.' };
    }
};

export const createBeaconActivity = async (activity: BeaconActivity, controller?: AbortController): Promise<One | any> => {
    return performBeaconActivityRequest(true, activity, controller);
};

export const updateBeaconActivity = async (activity: BeaconActivity, controller?: AbortController): Promise<One | any> => {
    return performBeaconActivityRequest(false, activity, controller);
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

