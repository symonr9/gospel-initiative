import { Page, RefreshSpec } from "@/enums/enums";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    page: Page.ShareChrist,
    refreshSpec: RefreshSpec.None,
    homeDailies: {
        actionSteps: false,
        gospelChecklist: false,
        oneBeaconSent: false,
        prayedForBeacons: false,
        storyPracticed: false,
    },
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
                    refreshSpec: action.payload === state.refreshSpec ? {...action.payload} : action.payload,
                }
            });
        case Action.SetHomeDailies: 
            return update(state, {
                $set: {
                    ...state,
                    homeDailies: action.payload,
                }
            });
        default:
            return state;
    }
};