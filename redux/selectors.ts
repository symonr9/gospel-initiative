import { createSelector } from 'reselect';
import OneFact from '@/models/oneFact';
import ActionStep from '@/models/actionStep';
import PrayerBeacon from '@/models/prayerBeacon';
import One from '@/models/one';
import Meeting from '@/models/meeting';
import PrayerBeaconSettings from '@/models/prayerBeaconSettings';
import User from '@/models/user';

export const selectAllUsers = (state: any): User[] => state.users.users;
export const selectAllOnes = (state: any): One[] => state.ones.ones;
export const selectAllOneFacts = (state: any): OneFact[] => state.ones.oneFacts;
export const selectAllActionSteps = (state: any): ActionStep[] => state.ones.actionSteps;
export const selectAllMeetings = (state: any): Meeting[] => state.ones.meetings;
export const selectAllPrayerBeacons = (state: any): PrayerBeacon[] => state.prayers.prayerBeacons;
export const selectAllPrayerBeaconSettings = (state: any): PrayerBeaconSettings[] => state.prayers.prayerBeaconSettings;

export const selectOneFactsByOneId = (oneId: string) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts) => oneFacts
      .filter((fact) => fact.oneId === oneId)
      .sort((a, b) => b.priority - a.priority)
  );


export const selectActionStepsByOneId = (oneId: string) =>
  createSelector(
    [selectAllActionSteps],
    (actionSteps) => actionSteps.filter((actionStep) => actionStep.oneId === oneId)
  );


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

  // Selector to find a specific PrayerBeacon by ID
export const selectPrayerBeaconById = (state: any, id: string): PrayerBeacon | undefined =>
  selectAllPrayerBeacons(state).find(beacon => beacon.id === id);

// Selector to find a specific User by ID
export const selectUserById = (state: any, id: string): User | undefined =>
  selectAllUsers(state).find(user => user.id === id);

// Selector to find a specific One by ID
export const selectOneById = (state: any, id: string): One | undefined =>
  selectAllOnes(state).find(one => one.id === id);

// Selector to find a specific Meeting by ID
export const selectMeetingById = (state: any, id: string): Meeting | undefined =>
  selectAllMeetings(state).find(meeting => meeting.id === id);

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