
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    preferences: null,
};

export function preferencesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { preferences } = action.payload;
            return update(state, {
                $set: {
                    preferences: preferences || state.preferences,
                }
            });
        case Action.LoadPreferences:
            return update(state, {
				$set: {
					preferences: action.payload
				}
			});
        default:
            return state;
    }
};