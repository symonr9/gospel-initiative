import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    beaconActivities: [],
    storyActivities: []
};

export function activitiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ministryActivities, beaconActivities, storyActivities } = action.payload;
            return update(state, {
                $set: {
                    ministryActivities: ministryActivities || [],
                    beaconActivities: beaconActivities || [],
                    storyActivities: storyActivities || []
                }
            });
        case Action.AddBeaconActivity:
            return update(state, {
                beaconActivities: { $push: [action.payload] }
            });
        case Action.AddStoryActivity:
            return update(state, {
                storyActivities: { $push: [action.payload] }
            });
        case Action.AddNoteToActivity: {
            const { activityId, note } = action.payload;

            const updateIfFound = (activities) => {
                const activityIndex = activities.findIndex(
                    (activity) => activity.id === activityId
                );
                if (activityIndex !== -1) {
                    return update(activities, {
                        [activityIndex]: {
                            note: { $set: note }
                        }
                    });
                }
                return null;
            };

            const updatedBeaconActivities = updateIfFound(state.beaconActivities);
            if (updatedBeaconActivities) {
                return {
                    ...state,
                    beaconActivities: updatedBeaconActivities
                };
            }

            const updatedStoryActivities = updateIfFound(state.storyActivities);
            if (updatedStoryActivities) {
                return {
                    ...state,
                    storyActivities: updatedStoryActivities
                };
            }

            const updatedMinistryActivities = updateIfFound(state.ministryActivities);
            if (updatedMinistryActivities) {
                return {
                    ...state,
                    ministryActivities: updatedMinistryActivities
                };
            }

            console.error("No matching activity found for activityId:", activityId);
            return state;
        }

        default:
            return state;
    }
}
