import { Priority, BeaconType, BeaconTag, AvatarIcon, OneStage } from "@/enums/enums";
import Beacon from "@/models/beacon";
import BeaconActivity from "@/models/beaconActivity";
import { makeRequest } from "./Requests";
import One from "@/models/one";

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

        return response.data.map((beacon: any) => {
            const activities = beacon.activities.map((item: any) => {
                let activity = new BeaconActivity(
                    item.id,
                    item.note,
                    item.date,
                    item.userId,
                    item.beaconId
                );
                activity.username = item.username || "";
                return activity;
            });

            const item = new Beacon(
                beacon.id,
                beacon.name,
                beacon.message,
                beacon.oneId,
                beacon.priority as Priority,
                beacon.userId,
                beacon.type as BeaconType,
                beacon.activeUntil ? new Date(beacon.activeUntil) : undefined,
                beacon.shareOwnName,
                activities,
                beacon.tags ? beacon.tags.split(',').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as BeaconTag) : []
            );

            item.userName = beacon.user.name;
            item.userIcon = AvatarIcon[beacon.user.icon as keyof typeof AvatarIcon];

            item.oneName = beacon.one.name;
            item.oneIcon = AvatarIcon[beacon.one.icon as keyof typeof AvatarIcon];
            item.oneStage = beacon.one.stage as OneStage;

            return item;
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
            [],
            beaconResponse.tags ? beaconResponse.tags.split(',').map((tag: string) => tag.trim()).map((tag: string) => parseInt(tag)).map((tag: number) => tag as BeaconTag) : []
        );
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

        const data = response.data;

        return new BeaconActivity(
            data.id,
            data.note,
            new Date(data.date),
            data.userId,
            data.beaconId
        );
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

