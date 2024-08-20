
export enum Action {
    AddUser,
    AddPrayer,

    SetAppError,
    ClearAppError
};

export class ActionPackage {
    type: Action;
    payload: any;

    constructor(type: Action, payload: any) {
        this.type = type;
        this.payload = payload;
    }
}

export const addUser = (item: User) => ({
    type: Action.AddUser,
    payload: item,
});

export const addPrayer = (item: object) => ({
    type: Action.AddUser,
    payload: item,
});

export const setAppError = (msg: string, subMsg: string | "") => ({
    type: Action.SetAppError,
    payload: { msg, subMsg }    
});

export const clearAppError = () => ({
    type: Action.ClearAppError,
    payload: null
});