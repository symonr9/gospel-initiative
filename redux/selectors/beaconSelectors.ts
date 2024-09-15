import { createSelector } from 'reselect';

import { isBeaconActive } from "@/utils/appUtils";
import { selectAllUsers, selectExecutor, selectUserById } from "./userSelectors";
import { selectAllOnes, selectOneById } from './oneSelectors';
import { selectAllBeaconActivities } from './activitySelectors';
import BeaconActivity from '@/models/beaconActivity';
import Beacon from '@/models/beacon';
import BeaconTemplate from '@/models/beaconTemplate';
import One from '@/models/one';
import User from '@/models/user';

export const selectAllBeacons = (state: any): Beacon[] => state.beacons.beacons;
export const selectAllBeaconTemplates = (state: any): BeaconTemplate[] => state.beacons.beaconTemplates;

export const selectBeaconsByUserId = (userId: string) =>
    createSelector(
        [selectAllBeacons],
        (beacons) => beacons
            .filter((beacon) => beacon.userId === userId)
            .sort((a, b) => b.priority - a.priority)
    );

export const selectBeaconsByOneId = (oneId: string) =>
    createSelector(
        [selectAllBeacons],
        (beacons) => beacons
            .filter((beacon) => beacon.oneId === oneId)
            .sort((a, b) => b.priority - a.priority)
    );

export const selectActiveBeaconsByOneId = (oneId: string) =>
    createSelector(
        [selectAllBeacons],
        (beacons) => beacons
            .filter((beacon) => {
                return beacon.oneId === oneId && isBeaconActive(beacon)
            })
            .sort((a, b) => new Date(b.activeUntil).getTime() - new Date(a.activeUntil).getTime())
    );

export const selectActiveBeaconsByUserId = (userId: string) =>
    createSelector(
        [selectAllBeacons],
        (beacons) => beacons
            .filter((beacon) => {
                return beacon.userId === userId && isBeaconActive(beacon)
            })
            .sort((a, b) => new Date(b.activeUntil).getTime() - new Date(a.activeUntil).getTime())
    );


export const selectAllActiveBeacons = (state: any): Beacon[] =>
    selectAllBeacons(state).filter(beacon => isBeaconActive(beacon));

export const selectBeaconById = (state: any, id: string): Beacon | undefined =>
    selectAllBeacons(state).find(beacon => beacon.id === id);

export const selectBeaconDetailsById = (state: any, id: string) => {
    const beacon = selectBeaconById(state, id);

    if (!beacon) {
        return null; // or return an empty object, depending on your needs
    }

    const user = selectUserById(state, beacon.userId);
    const one = beacon.oneId ? selectOneById(state, beacon.oneId) : null;

    return {
        prayerBeacon: beacon,
        user,
        one,
    };
};

export const selectActiveBeaconsWithActivities = (oneId: string | undefined) =>
    createSelector(
        [selectAllBeacons, selectExecutor, selectAllBeaconActivities, selectAllUsers],
        (beacons, executor, beaconActivities, users) => {
            return beacons
                .filter((beacon: any) => beacon.userId === executor.id && beacon.oneId === oneId && isBeaconActive(beacon))
                .map((beacon: any) => {
                    const activities = beaconActivities
                        .filter((activity) => activity.beaconId === beacon.id)
                        .map((activity) => {
                            const user = users.find((user) => user.id === activity.userId) || null;
                            return {
                                ...activity,
                                user
                            };
                        })
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    return {
                        ...beacon,
                        activities
                    };
                });
        });

/**
 * Smartly partitions all prayer beacons to all where the executor has created a beaconActivity for and
 * all that have not done so. Two arrays. The one, user, and the subsequent activities for a given beacon
 * are all appended into an enhanced object.
 */
export const selectPartitionedActiveEnhancedBeacons = createSelector(
    [selectAllBeacons, selectAllOnes, selectAllUsers, selectAllBeaconActivities, selectExecutor],
    (beacons, ones, users, beaconActivities, executor): any => {
        const partitionedBeacons = beacons
            .filter((beacon: Beacon) => isBeaconActive(beacon))
            .map((beacon: Beacon) => {
                const one = beacon.oneId ? ones.find((one: One) => one.id === beacon.oneId) : null;
                const user = beacon.userId ? users.find((user: User) => user.id === beacon.userId) : null;
                const activitiesForBeacon = beaconActivities
                    .filter((activity) => activity.beaconId === beacon.id)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                const hasExecutorActivity = activitiesForBeacon.some(
                    (activity) => activity.userId === executor.id
                );

                const partitionedActivities = activitiesForBeacon.reduce(
                    (acc: any, activity: BeaconActivity) => {
                        if (activity.userId === executor.id) {
                            acc.withExecutor.push(activity);
                        } else {
                            acc.withoutExecutor.push(activity);
                        }
                        return acc;
                    },
                    { withExecutor: [], withoutExecutor: [] }
                );

                return {
                    ...beacon,
                    one,
                    user,
                    incomingActivities: partitionedActivities.withoutExecutor,
                    completedActivities: partitionedActivities.withExecutor,
                    hasExecutorActivity,
                };
            });

        const completedBeacons = partitionedBeacons.filter((beacon) => beacon.hasExecutorActivity);
        const incomingBeacons = partitionedBeacons.filter((beacon) => !beacon.hasExecutorActivity);
        return {
            completedBeacons,
            incomingBeacons,
        };
    }
);