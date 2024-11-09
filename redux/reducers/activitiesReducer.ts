import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    beaconActivities: [],
    storyActivities: []
};

export function activitiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { activeBeacons, expiredBeacons, storyActivities } = action.payload;

            const activeBeaconActivities = activeBeacons?.flatMap((beacon: any) => beacon.activities ? beacon.activities : []) || null;
            const expiredBeaconActivities = expiredBeacons?.flatMap((beacon: any) => beacon.activities ? beacon.activities : []) || null;
            const needsUpdate = activeBeaconActivities && expiredBeaconActivities;
            const beaconActivities = needsUpdate 
                ? activeBeaconActivities.concat(expiredBeaconActivities)
                : state.beaconActivities;
            
            return update(state, {
                $set: {
                    beaconActivities: beaconActivities,
                    storyActivities: storyActivities || state.storyActivities
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
