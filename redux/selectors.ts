import { createSelector } from 'reselect';
import OneFact from '@/models/oneFact';
import ActionStep from '@/models/actionStep';
import PrayerBeacon from '@/models/prayerBeacon';

export const selectAllOneFacts = (state: any): OneFact[] => state.ones.oneFacts;

export const selectOneFactsByOneId = (oneId: string) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts) => oneFacts
      .filter((fact) => fact.oneId === oneId)
      .sort((a, b) => b.priority - a.priority)
  );

export const selectAllActionSteps = (state: any): ActionStep[] => state.ones.actionSteps;

export const selectActionStepsByOneId = (oneId: string) =>
  createSelector(
    [selectAllActionSteps],
    (actionSteps) => actionSteps.filter((actionStep) => actionStep.oneId === oneId)
  );

export const selectAllPrayerBeacons = (state: any): PrayerBeacon[] => state.prayers.prayerBeacons;

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