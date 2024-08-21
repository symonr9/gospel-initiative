import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    ones: []
};

export function onesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ones } = action.payload;
            return update(state, {
                $set: {
                    ones: ones || []
                }
            });
        case Action.AddOne:
            return action;
        default:
            return state;
    }
};