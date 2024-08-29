import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    error: null,
};

export function errorsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.SetAppError:            
            const { error } = action.payload;
            return update(state, {
				$set: {
					error: error
				}
			});
        case Action.ClearAppError:
			return initialState;
        default:
            return state;
    }
};