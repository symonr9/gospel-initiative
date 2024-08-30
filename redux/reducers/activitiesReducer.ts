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
        default:
            return state;
    }
};