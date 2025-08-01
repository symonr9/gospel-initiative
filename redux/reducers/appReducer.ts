import { NewUserStep, Page, RefreshSpec } from "@/enums/enums";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';
import { OneLayoutType } from "@/components/ones/OnesLayout";
import { OnesLayoutNormalBodyType } from "@/components/ones/layout/OnesLayoutNormal";

const initialState = {
    dataRefreshLoading: false,
    page: Page.ShareChrist,
    refreshSpec: RefreshSpec.None,
    newUserStep: NewUserStep.Loading,
    shouldRefreshBeacons: false,
    activeOnesLayoutType: OneLayoutType.Loading,
    activeOnesLayoutNormalBodyType: OnesLayoutNormalBodyType.Base,
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
        case Action.LoadServerData:
            return update(state, {
                $set: {
                    ...state,
                    activeOnesLayoutType: OneLayoutType.Normal,
                }
            });
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
                    refreshSpec: action.payload,
                }
            });
        case Action.SetHomeDailies:
            return update(state, {
                $set: {
                    ...state,
                    homeDailies: action.payload,
                }
            });
        case Action.SetNewUserStep:
            return update(state, {
                $set: {
                    ...state,
                    newUserStep: action.payload,
                }
            });
        case Action.SetShouldRefreshBeacons:
            return update(state, {
                $set: {
                    ...state,
                    shouldRefreshBeacons: action.payload,
                }
            });
        case Action.SetDataRefreshLoading:
            return update(state, {
                $set: {
                    ...state,
                    dataRefreshLoading: action.payload,
                }
            });
        case Action.SetActiveOnesLayoutType:
            return update(state, {
                $set: {
                    ...state,
                    activeOnesLayoutType: action.payload,
                }
            });
        case Action.SetActiveOnesLayoutNormalBodyType:
            return update(state, {
                $set: {
                    ...state,
                    activeOnesLayoutNormalBodyType: action.payload,
                }
            });
        case Action.ClearAllData:
            return initialState;
        default:
            return state;
    }
};