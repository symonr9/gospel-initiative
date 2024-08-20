import { Action } from "../actions";

const initialState = {
    users: []
};

export function usersReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.AddUser:
            return action;
        default:
            return state;
    }
};