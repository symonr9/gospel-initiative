import { Page } from "@/enums/enums";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    page: Page.ShareChrist,
    tabIndex: 0,
    shouldRefreshData: false,
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
        case Action.RefreshData:
            return update(state, {
                $set: {
                    ...state,
                    shouldRefreshData: !state.shouldRefreshData,
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