import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    beacons: [],
    beaconLogs: [],
    beaconTemplates: [],

    selectedTemplateId: null,
    beaconForm: null
};

export function beaconsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { beacons, beaconTemplates, beaconLogs, beaconActivities
            } = action.payload;
            return update(state, {
                $set: {
                    beacons: beacons || [],
                    beaconLogs: beaconLogs || [],
                    beaconTemplates: beaconTemplates || [],
                    selectedTemplateId: null
                }
            });
        case Action.SetSelectedBeaconId:
            return update(state, {
                selectedTemplateId: { $set: action.payload }
            });
        case Action.SetBeaconActiveUntil:
            const { id, date } = action.payload;
            const setBeaconTypeIdx = state.beacons.findIndex(beacon => beacon.id === id);
            if (setBeaconTypeIdx !== -1) {
                return update(state, {
                    beacons: {
                        [setBeaconTypeIdx]: {
                            activeUntil: { $set: date }
                        }
                    }
                });
            }
            return state;
        case Action.UpdateBeacon:
            const updatedBeaconIdx = state.beacons.findIndex(beacon => beacon.id === action.payload.id);
            if (updatedBeaconIdx !== -1) {
                return update(state, {
                    beacons: {
                        [updatedBeaconIdx]: { $set: action.payload }
                    }
                });
            }
            return state;
        case Action.AddBeacon:
            return update(state, {
                beacons: { $push: [action.payload] }
            });
        case Action.SetBeaconForm:
            return update(state, {
                beaconForm: { $set: action.payload }
            });
        default:
            return state;
    }
};