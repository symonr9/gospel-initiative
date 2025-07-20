import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    prompts: [],
};

export function promptsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { prompts } = action.payload;
            return update(state, {
                $set: {
                    prompts: prompts || state.prompts,
                }
            });
        case Action.ClearAllData:
            return initialState;
        default:
            return state;
    }
};