import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    stories: [],
};

export function storiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { stories } = action.payload;
            return update(state, {
                $set: {
                    stories: stories || [],
                }
            });
        case Action.AddStory:
            return update(state, {
                stories: { $push: [action.payload] }
            });
        default:
            return state;
    }
};