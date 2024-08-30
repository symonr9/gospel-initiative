import { createSelector } from 'reselect';

import PrayerBeacon from "@/models/prayerBeacon";
import PrayerBeaconSettings from "@/models/prayerBeaconSettings";
import { isBeaconActive } from "@/utils/appUtils";
import { selectAllUsers, selectExecutor, selectUserById } from "./userSelectors";
import { selectAllOnes, selectMeetingById, selectOneById } from './oneSelectors';
import { selectAllBeaconActivities, selectBeaconActivitiesById } from './activitySelectors';
import BeaconActivity from '@/models/beaconActivity';


export const selectAllPrayerBeacons = (state: any): PrayerBeacon[] => state.prayers.prayerBeacons;
export const selectAllPrayerBeaconSettings = (state: any): PrayerBeaconSettings[] => state.prayers.prayerBeaconSettings;


export const selectPrayerBeaconsByUserId = (userId: string) =>
    createSelector(
        [selectAllPrayerBeacons],
        (beacons) => beacons
            .filter((beacon) => beacon.userId === userId)
            .sort((a, b) => b.priority - a.priority)
    );

export const selectPrayerBeaconsByOneId = (oneId: string) =>
    createSelector(
        [selectAllPrayerBeacons],
        (beacons) => beacons
            .filter((beacon) => beacon.oneId === oneId)
            .sort((a, b) => b.priority - a.priority)
    );

export const selectActivePrayerBeaconsByOneId = (oneId: string) =>
    createSelector(
        [selectAllPrayerBeacons],
        (beacons) => beacons
            .filter((beacon) => {
                return beacon.oneId === oneId && isBeaconActive(beacon)
            })
            .sort((a, b) => b.priority - a.priority)
    );

export const selectAllActivePrayerBeacons = (state: any): PrayerBeacon[] =>
    selectAllPrayerBeacons(state).filter(beacon => isBeaconActive(beacon));

export const selectPrayerBeaconById = (state: any, id: string): PrayerBeacon | undefined =>
    selectAllPrayerBeacons(state).find(beacon => beacon.id === id);

export const selectPrayerBeaconSettingsById = (state: any, id: string): PrayerBeaconSettings | undefined =>
    selectAllPrayerBeaconSettings(state).find(settings => settings.id === id);

export const selectPrayerBeaconDetailsById = (state: any, id: string) => {
    const prayerBeacon = selectPrayerBeaconById(state, id);

    if (!prayerBeacon) {
        return null; // or return an empty object, depending on your needs
    }

    const user = selectUserById(state, prayerBeacon.userId);
    const one = prayerBeacon.oneId ? selectOneById(state, prayerBeacon.oneId) : null;
    const meeting = prayerBeacon.meetingId ? selectMeetingById(state, prayerBeacon.meetingId) : null;
    const settings = selectPrayerBeaconSettingsById(state, prayerBeacon.settingsId);

    return {
        prayerBeacon,
        user,
        one,
        meeting,
        settings
    };
};


/**
 * Smartly partitions all prayer beacons to all where the executor has created a beaconActivity for and
 * all that have not done so. Two arrays. The one, user, and the subsequent activities for a given beacon
 * are all appended into an enhanced object.
 */
export const selectPartitionedActiveEnhancedPrayerBeacons = createSelector(
    [selectAllPrayerBeacons, selectAllOnes, selectAllUsers, selectAllBeaconActivities, selectExecutor],
    (prayerBeacons, ones, users, beaconActivities, executor) => {
        const partitionedBeacons = prayerBeacons
            .filter((beacon: any) => isBeaconActive(beacon))
            .map((beacon: any) => {
                const one = beacon.oneId ? ones.find((one: any) => one.id === beacon.oneId) : null;
                const user = beacon.userId ? users.find((user: any) => user.id === beacon.userId) : null;
                const activitiesForBeacon = beaconActivities
                    .filter((activity) => activity.beaconId === beacon.id)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                const hasExecutorActivity = activitiesForBeacon.some(
                    (activity) => activity.userId === executor.id
                );

                const partitionedActivities = activitiesForBeacon.reduce(
                    (acc, activity: BeaconActivity) => {
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