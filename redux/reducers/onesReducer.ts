import One from "@/models/one";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    selectedOneId: null,
    ones: [],
    oneForm: null
};

export function onesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ones } = action.payload;
            return update(state, {
                selectedOneId: { $set: state.selectedOneId || (ones?.length > 0 ? ones[0].id : null) },
                ones: { $set: ones || state.ones }
            });
        case Action.SetSelectedOneId:
            return update(state, {
                selectedOneId: { $set: action.payload }
            });
        case Action.SetOneForm:
            return update(state, {
                oneForm: { $set: action.payload }
            });
        default:
            return state;
    }
};