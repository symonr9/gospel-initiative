import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    ones: [],
    actionSteps: []
};

export function onesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ones, actionSteps } = action.payload;
            return update(state, {
                $set: {
                    ones: ones || [],
                    actionSteps: actionSteps || []
                }
            });
        case Action.AddOne:
            const { one } = action.payload;
            return update(state, {
                ones: { $push: [one] }
            });
        default:
            return state;
    }
};