import { createSelector } from 'reselect';
import OneFact from '@/models/oneFact';
import ActionStep from '@/models/actionStep';
import PrayerBeacon from '@/models/prayerBeacon';
import One from '@/models/one';
import Meeting from '@/models/meeting';
import PrayerBeaconSettings from '@/models/prayerBeaconSettings';
import User from '@/models/user';
import { PrayerBeaconType } from '@/enums/enums';
import Prompt from '@/models/prompt';
import Prayer from '@/models/prayer';
import { isBeaconActive } from '@/utils/appUtils';

export const selectExecutor = (state: any): User => state.users.executor;
export const selectAllUsers = (state: any): User[] => state.users.users;
export const selectAllOnes = (state: any): One[] => state.ones.ones;
export const selectAllOneFacts = (state: any): OneFact[] => state.ones.oneFacts;
export const selectAllActionSteps = (state: any): ActionStep[] => state.ones.actionSteps;
export const selectAllMeetings = (state: any): Meeting[] => state.ones.meetings;
export const selectAllPrayerBeacons = (state: any): PrayerBeacon[] => state.prayers.prayerBeacons;
export const selectAllPrayerBeaconSettings = (state: any): PrayerBeaconSettings[] => state.prayers.prayerBeaconSettings;
export const selectAllPrompts = (state: any): Prompt[] => state.prompts.prompts;

// One Facts

export const selectOneFactsByOneId = (oneId: string) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts) => oneFacts
      .filter((fact) => fact.oneId === oneId)
      .sort((a, b) => b.priority - a.priority)
  );


// Action Steps 

export const selectActionStepsByOneId = (state: any, oneId: string): ActionStep[] =>
  selectAllActionSteps(state).filter(actionStep => actionStep.oneId === oneId);


// Prayer beacons 

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
        console.log("bdf: ", beacon);
        return beacon.oneId === oneId && isBeaconActive(beacon)})
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

// Users
export const selectUserById = (state: any, id: string): User | undefined =>
  selectAllUsers(state).find(user => user.id === id);


// One
export const selectOneById = (state: any, id: string): One | undefined =>
  selectAllOnes(state).find(one => one.id === id);

export const selectOnesByUserId = (state: any, userId: string): One[] =>
  selectAllOnes(state).filter(one => one.userId === userId);

export const selectFirstOneByUserId = createSelector(
  [selectOnesByUserId],
  (ones) => ones.length > 0 ? ones[0] : undefined
);

// Meetings

export const selectMeetingById = (state: any, id: string): Meeting | undefined =>
  selectAllMeetings(state).find(meeting => meeting.id === id);

// Prompts

export const selectPromptsByUserId = (state: any, userId: string): Prompt[] =>
  selectAllPrompts(state).filter(prompt => prompt.userId === userId);

export const selectFirstPromptByUserId = createSelector(
  [selectPromptsByUserId],
  (prompts) => prompts.length > 0 ? prompts[0] : undefined
);

// Mixed

export const selectFirstOneAndActionStepsByUserId = createSelector(
  [selectFirstOneByUserId, (state, userId) => state],
  (firstOne, state) => {
    if (!firstOne) {
      return { firstOne: undefined, actionSteps: [] };
    }

    const actionSteps = selectActionStepsByOneId(state, firstOne.id);
    return { firstOne, actionSteps };
  }
);