import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    missionsTrips: [],
    missionsTripLeaders: [],
};

export function missionsTripsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { missionsTrips, missionsTripLeaders } = action.payload;
            return update(state, {
                $set: {
                    missionsTrips: missionsTrips || [],
                    missionsTripLeaders: missionsTripLeaders,
                }
            });
        case Action.AddMissionsTrip:
            return update(state, {
                missionsTrips: { $push: [action.payload] }
            });
        default:
            return state;
    }
};