import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    prayers: [],
    prayerBeacons: []
};

export function prayersReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { prayers, prayerBeacons } = action.payload;
            return update(state, {
                $set: {
                    prayers: prayers || [],
                    prayerBeacons: prayerBeacons || []
                }
            });
        case Action.AddPrayer:
            return update(state, {
                prayers: { $push: [action.payload] }
            });
        case Action.AddPrayerBeacon:
            return update(state, {
                prayers: { $push: [action.payload] }
            });
        default:
            return state;
    }
};