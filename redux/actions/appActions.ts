import { Page } from "@/enums/enums";
import { Action } from "../actions";

export const loadServerData = (data: any) => {
    return {
        type: Action.LoadServerData,
        payload: data,
    }
};

export const loadLocalData = (data: any) => {
    return {
        type: Action.LoadLocalData,
        payload: data,
    }
};

export const loadPreferences = (data: any) => {
    return {
        type: Action.LoadPreferences,
        payload: data,
    }
};

export const openPage = (item: Page) => ({
    type: Action.OpenPage,
    payload: item,
});

export const updateTabIndex = (item: number) => ({
    type: Action.UpdateTabIndex,
    payload: item,
});

export const setAppError = (error: Error) => ({
    type: Action.SetAppError,
    payload: error
});

export const clearAppError = () => ({
    type: Action.ClearAppError,
    payload: null
});