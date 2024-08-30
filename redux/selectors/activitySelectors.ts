import BeaconActivity from '@/models/beaconActivity';
import MinistryActivity from '@/models/ministryActivity';
import { createSelector } from 'reselect';

export const selectAllBeaconActivities = (state: any): BeaconActivity[] => state.activities.beaconActivities;
export const selectAllMinistryActivities = (state: any): MinistryActivity[] => state.activities.ministryActivities;

export const selectBeaconActivitiesById = (beaconId: string) =>
    createSelector(
        [selectAllBeaconActivities],
        (activities) => activities
            .filter((activity) => activity.beaconId === beaconId)
            // Most Recent
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
