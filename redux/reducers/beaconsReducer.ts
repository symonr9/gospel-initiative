import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    activeBeacons: [],
    expiredBeacons: [],
    beaconTemplates: [],

    selectedPrayerId: null,
    selectedTemplateId: null,
    beaconForm: null,
};

export function beaconsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadBeaconData:
        case Action.LoadServerData:
            const { activeBeacons, expiredBeacons, beaconTemplates } = action.payload;
            return update(state, {
                $set: {
                    activeBeacons: activeBeacons || state.activeBeacons,
                    expiredBeacons: expiredBeacons || state.expiredBeacons,
                    beaconTemplates: beaconTemplates || state.beaconTemplates,
                    selectedTemplateId: state.selectedTemplateId,
                    selectedPrayerId: state.selectedPrayerId,
                    beaconForm: state.beaconForm,
                }
            });
        case Action.SetSelectedBeaconTemplateId:
            return update(state, {
                selectedTemplateId: { $set: action.payload }
            });
        case Action.SetSelectedBeaconPrayerId:
            return update(state, {
                selectedPrayerId: { $set: action.payload }
            });
        case Action.SetBeaconForm:
            return update(state, {
                beaconForm: { $set: action.payload }
            });
        default:
            return state;
    }
};