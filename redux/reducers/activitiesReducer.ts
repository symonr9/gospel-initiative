import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    ministryActivities: [],
    beaconActivities: []
};

export function activitiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ministryActivities, beaconActivities } = action.payload;
            return update(state, {
                $set: {
                    ministryActivities: ministryActivities || [],
                    beaconActivities: beaconActivities || []
                }
            });
        case Action.PrayForBeacon:
            return update(state, {
                beaconActivities: { $push: [action.payload] }
            });
        case Action.AddNoteToActivity: 
            const { activityId, note } = action.payload;
            const activityIndex = state.beaconActivities.findIndex(
                (activity) => activity.id === activityId
            );
            if (activityIndex !== -1) {
                return update(state, {
                    beaconActivities: {
                        [activityIndex]: {
                            note: { $set: note }
                        }
                    }
                });
            } else {
                console.error("No matching activity found for beaconId and userId.");
                return state;
            }
        default:
            return state;
    }
};