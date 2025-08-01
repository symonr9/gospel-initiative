import { NewUserStep, Page, RefreshSpec } from "@/enums/enums";
import { Action } from "../actions";
import { OneLayoutType } from "@/components/ones/OnesLayout";
import { OnesLayoutNormalBodyType } from "@/components/ones/layout/OnesLayoutNormal";

export const loadServerData = (data: any) => {
    return {
        type: Action.LoadServerData,
        payload: data,
    }
};

export const loadPreferences = (data: any) => {
    return {
        type: Action.LoadPreferences,
        payload: data,
    }
};

export const setHomeDailies = (data: any) => {
    return {
        type: Action.SetHomeDailies,
        payload: data,
    }
};

export const openPage = (item: Page) => ({
    type: Action.OpenPage,
    payload: item,
});

export const setNewUserStep = (item: NewUserStep) => ({
    type: Action.SetNewUserStep,
    payload: item,
});

export const setShouldRefreshBeacons = (shouldRefresh: boolean) => ({
    type: Action.SetShouldRefreshBeacons,
    payload: shouldRefresh,
});

/**
 * By default, refresh all server data.
 */
export const refreshData = (item: RefreshSpec = RefreshSpec.None) => ({
    type: Action.RefreshData,
    payload: item
});

export const setAppError = (error: Error) => ({
    type: Action.SetAppError,
    payload: error
});

export const clearAppError = () => ({
    type: Action.ClearAppError,
    payload: null
});

export const setDataRefreshLoading = (data: any) => ({
    type: Action.SetDataRefreshLoading,
    payload: data
});

export const clearAllData = () => ({
    type: Action.ClearAllData,
    payload: null
})

export const setActiveOnesLayoutType = (type: OneLayoutType) => ({
    type: Action.SetActiveOnesLayoutType,
    payload: type
});

export const setActiveOnesLayoutNormalBodyType = (type: OnesLayoutNormalBodyType) => ({
    type: Action.SetActiveOnesLayoutNormalBodyType,
    payload: type
});