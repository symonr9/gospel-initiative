import { Action, ActionPackage } from "../Actions";

const initialState = {
    name: "",
    prayers: []
};

export function prayersReducer(state = {}, action: ActionPackage) {
    switch (action.type) {
        case Action.AddPrayer:
            return action;
        default:
            return state;
    }
};