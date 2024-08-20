import { Action, ActionPackage } from "../actions";

const initialState = {
    prayers: []
};

export function prayersReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.AddPrayer:
            return action;
        default:
            return state;
    }
};