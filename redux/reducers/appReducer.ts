import { LoveCityPageState, Page, ReachWorldPageState, ShareChristPageState } from "@/enums/enums";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    page: Page.ShareChrist,
    shareChristPageState: ShareChristPageState.Default,
    loveCityPageState: LoveCityPageState.Default,
    reachWorldPageState: ReachWorldPageState.Default,
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
        case Action.SetShareChristPageState:
            return update(state, {
                $set: {
                    ...state,
                    shareChristPageState: action.payload
                }
            });
        default:
            return state;
    }
};