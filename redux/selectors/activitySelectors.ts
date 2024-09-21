import BeaconActivity from '@/models/beaconActivity';
import StoryActivity from '@/models/storyActivity';
import { createSelector } from 'reselect';
import { selectExecutor } from './userSelectors';

export const selectAllBeaconActivities = (state: any): BeaconActivity[] => state.activities.beaconActivities;
export const selectAllStoryActivities = (state: any): StoryActivity[] => state.activities.storyActivities;

export const selectBeaconActivitiesById = (beaconId: string) =>
    createSelector(
        [selectAllBeaconActivities],
        (activities) => activities
            .filter((activity) => activity.beaconId === beaconId)
            // Most Recent
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );