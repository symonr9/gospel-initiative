import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    executor: null,
    users: [],
    isSetupForNotifications: false,
};

export function usersReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { executor, users } = action.payload;
            return update(state, {
                $set: {
                    executor: executor || state.executor,
                    users: users || state.users,
                    isSetupForNotifications: executor?.isSetupForNotifications || state.isSetupForNotifications,
                }
            });
        case Action.SetIsSetupForNotifications:
            return update(state, {
                $set: {
                    ...state,
                    isSetupForNotifications: true,
                }
            });
        case Action.ClearAllData:
            return initialState;
        default:
            return state;
    }
};