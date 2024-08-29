import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    prayers: [],
    prayerBeacons: [],
    prayerBeaconSettings: [],
    prayerRequests: [],

    selectedBeaconId: null,
};

export function prayersReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { prayers, prayerBeacons, prayerBeaconSettings,
                prayerRequests
            } = action.payload;
            return update(state, {
                $set: {
                    prayers: prayers || [],
                    prayerBeacons: prayerBeacons || [],
                    prayerBeaconSettings: prayerBeaconSettings || [],
                    prayerRequests: prayerRequests || [],
                    selectedBeaconId: null
                }
            });
        case Action.SetSelectedBeaconId:
            return update(state, {
                selectedBeaconId: { $set: action.payload }
            });
        case Action.SetBeaconActiveUntil:
            const { id, date } = action.payload;
            const setBeaconTypeIdx = state.prayerBeacons.findIndex(beacon => beacon.id === id);
            if (setBeaconTypeIdx !== -1) {
                return update(state, {
                    prayerBeacons: {
                        [setBeaconTypeIdx]: {
                            activeUntil: { $set: date }
                        }
                    }
                });
            }
            return state;
        case Action.UpdateBeacon:
            const updatedBeaconIdx = state.prayerBeacons.findIndex(beacon => beacon.id === action.payload.id);
            if (updatedBeaconIdx !== -1) {
                return update(state, {
                    prayerBeacons: {
                        [updatedBeaconIdx]: { $set: action.payload }
                    }
                });
            }
            return state;
        case Action.AddPrayer:
            return update(state, {
                prayers: { $push: [action.payload] }
            });
        case Action.AddPrayerBeacon:
            return update(state, {
                prayerBeacons: { $push: [action.payload] }
            });
        case Action.AddPrayerBeaconSettings:
            return update(state, {
                prayerBeaconSettings: { $push: [action.payload] }
            });
        case Action.AddPrayerRequest:
            return update(state, {
                prayerRequests: { $push: [action.payload] }
            });
        default:
            return state;
    }
};