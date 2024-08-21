import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    prayers: []
};

export function prayersReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { prayers } = action.payload;
            return update(state, {
                $set: {
                    prayers: prayers || []
                }
            });
        case Action.AddPrayer:
            return update(state, {
                prayers: { $push: [action.payload] }
            });
        default:
            return state;
    }
};