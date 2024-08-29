import { createSelector } from 'reselect';

import PrayerBeacon from "@/models/prayerBeacon";
import PrayerBeaconSettings from "@/models/prayerBeaconSettings";
import { isBeaconActive } from "@/utils/appUtils";
import { selectAllUsers, selectUserById } from "./userSelectors";
import { selectAllOnes, selectMeetingById, selectOneById } from './oneSelectors';


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

export const selectAllActivePrayerBeaconsEnhanced = createSelector(
    [selectAllPrayerBeacons, selectAllOnes, selectAllUsers],
    (prayerBeacons, ones, users) => {
        return prayerBeacons
            .filter((beacon: any) => isBeaconActive(beacon))
            .map((beacon: any) => {
                const one = beacon.oneId ? ones.find((one: any) => one.id === beacon.oneId) : null;
                const user = beacon.userId ? users.find((user: any) => user.id === beacon.userId) : null;
                return {
                    ...beacon,
                    one,
                    user
                };
            });
    }
);