import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    activeBeacons: [],
    expiredBeacons: [],
    beaconTemplates: [],

    selectedTemplateId: null,
    beaconForm: null
};

export function beaconsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { activeBeacons, expiredBeacons, beaconTemplates } = action.payload;
            return update(state, {
                $set: {
                    activeBeacons: activeBeacons || [],
                    expiredBeacons: expiredBeacons || [],
                    beaconTemplates: beaconTemplates || [],
                    selectedTemplateId: null,
                    beaconForm: null,
                }
            });
        case Action.SetSelectedBeaconId:
            return update(state, {
                selectedTemplateId: { $set: action.payload }
            });
        case Action.UpdateBeacon:
            const updatedBeaconIdx = state.activeBeacons.findIndex(beacon => beacon.id === action.payload.id);
            if (updatedBeaconIdx !== -1) {
                return update(state, {
                    activeBeacons: {
                        [updatedBeaconIdx]: { $set: action.payload }
                    }
                });
            }
            return state;
        case Action.AddBeacon:
            return update(state, {
                activeBeacons: { $push: [action.payload] }
            });
        case Action.SetBeaconForm:
            return update(state, {
                beaconForm: { $set: action.payload }
            });
        default:
            return state;
    }
};