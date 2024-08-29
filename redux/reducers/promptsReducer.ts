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
                    prompts: prompts || [],
                }
            });
        case Action.AddPrompt:
            return update(state, {
                prompts: { $push: [action.payload] }
            });
        default:
            return state;
    }
};