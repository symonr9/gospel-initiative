import { Page } from "@/enums/enums";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    page: Page.ShareChrist,
};

export function appReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.OpenPage:
            return update(state, {
				$set: {
					page: action.payload
				}
			});
        default:
            return state;
    }
};