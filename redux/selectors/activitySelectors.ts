import BeaconActivity from '@/models/beaconActivity';
import MinistryActivity from '@/models/ministryActivity';
import StoryActivity from '@/models/storyActivity';
import { createSelector } from 'reselect';
import { selectExecutor } from './userSelectors';

export const selectAllBeaconActivities = (state: any): BeaconActivity[] => state.activities.beaconActivities;
export const selectAllMinistryActivities = (state: any): MinistryActivity[] => state.activities.ministryActivities;
export const selectAllStoryActivities = (state: any): StoryActivity[] => state.activities.storyActivities;

export const selectBeaconActivitiesById = (beaconId: string) =>
    createSelector(
        [selectAllBeaconActivities],
        (activities) => activities
            .filter((activity) => activity.beaconId === beaconId)
            // Most Recent
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );

export const selectAllMinistryActivitiesByExecutor = createSelector(
    [selectAllMinistryActivities, selectExecutor],
    (ministryActivities: MinistryActivity[], executor) => {
        if (!executor) 
            return { eventActivities: [], ministryActivities: [], missionsTripActivities: [] };

        const filteredActivities = ministryActivities.filter((activity) => activity.userId === executor.id);

        const eventActivities = filteredActivities.filter((activity) => !!activity.localEventId);
        const ministryActivitiesGroup = filteredActivities.filter((activity) => !!activity.localMinistryId);
        const missionsTripActivities = filteredActivities.filter((activity) => !!activity.missionsTripId);

        return {
            eventActivities,
            ministryActivities: ministryActivitiesGroup,
            missionsTripActivities,
        };
    }
);