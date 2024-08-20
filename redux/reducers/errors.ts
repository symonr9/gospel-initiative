import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    appErrorMsg: "",
    appErrorSubMsg: ""
};

export function errorsReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.SetAppError:            
            const { msg, subMsg } = action.payload;
            return update(state, {
				$set: {
					appErrorMsg: msg,
					appErrorSubMsg: subMsg !== undefined ? subMsg : ""
				}
			});
        case Action.ClearAppError:
			return initialState;
        default:
            return state;
    }
};