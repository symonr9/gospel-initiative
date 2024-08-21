import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    executor: null,
    users: []
};

export function usersReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { executor, users } = action.payload;
            return update(state, {
                $set: {
                    executor: executor || null,
                    users: users || [],
                }
            });
        default:
            return state;
    }
};