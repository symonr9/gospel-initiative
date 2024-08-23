
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';
import Preferences from "@/models/preferences";

const initialState = {
    preferences: Preferences,
};

export function preferencesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
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