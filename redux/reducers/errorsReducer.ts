import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    error: null,
};

export function errorsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.SetAppError:            
            return update(state, {
				$set: {
					error: action.payload
				}
			});
        case Action.ClearAppError:
			return initialState;
        default:
            return state;
    }
};