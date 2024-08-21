import One from "@/models/one";
import Prayer from "@/models/prayer";
import User from "@/models/user";

export enum Action {
    AddUser = "ADD_USER",
    AddPrayer = "ADD_PRAYER",
    AddOne = "ADD_ONE",

    LoadServerData = "LOAD_SERVER_DATA",

    SetAppError = "SET_APP_ERROR",
    ClearAppError = "CLEAR_APP_ERROR"
};

export class ActionPackage {
    type: string;
    payload: any;

    constructor(type: Action, payload: any) {
        this.type = type;
        this.payload = payload;
    }
}

export const loadServerData = (data: any) => {
    return {
        type: Action.LoadServerData,
        payload: data,
    }
};

export const addUser = (item: User) => ({
    type: Action.AddUser,
    payload: item,
});

export const addOne = (item: One) => ({
    type: Action.AddOne,
    payload: item,
});

export const addPrayer = (item: Prayer) => ({
    type: Action.AddPrayer,
    payload: item,
});

export const setAppError = (error: Error) => ({
    type: Action.SetAppError,
    payload: { error }
});

export const clearAppError = () => ({
    type: Action.ClearAppError,
    payload: null
});