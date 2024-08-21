import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    missionsTrips: [],
};

export function missionsTripsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { missionsTrips } = action.payload;
            return update(state, {
                $set: {
                    missionsTrips: missionsTrips || [],
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