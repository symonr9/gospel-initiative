import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    activites: []
};

export function activitiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { activites } = action.payload;
            return update(state, {
                $set: {
                    activites: activites || []
                }
            });
        default:
            return state;
    }
};