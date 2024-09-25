import { Page } from "@/enums/enums";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    page: Page.ShareChrist,
    tabIndex: 0,

    userId: null,
    authToken: null,
};

export function appReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.OpenPage:
            return update(state, {
                $set: {
                    ...state,
                    page: action.payload,
                }
            });
        case Action.LoadLocalData:
            const { userId, authToken } = action.payload;
            return update(state, {
                $set: {
                    ...state,
                    userId,
                    authToken
                }
            });
        case Action.UpdateTabIndex:
            return update(state, {
                $set: {
                    ...state,
                    tabIndex: action.payload,
                }
            });
        default:
            return state;
    }
};