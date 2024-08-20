import { Action, ActionPackage } from "../Actions";

const initialState = {
    name: "",
    users: []
};

export function usersReducer(state = {}, action: ActionPackage) {
    switch (action.type) {
        case Action.AddUser:
            return action;
        default:
            return state;
    }
};