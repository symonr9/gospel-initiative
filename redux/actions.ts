import LocalEvent from "@/models/localEvent";
import LocalMinistry from "@/models/localMinistry";
import MissionsTrip from "@/models/missionsTrip";
import One from "@/models/one";
import Prayer from "@/models/prayer";
import Story from "@/models/story";

export enum Action {
    AddPrayer = "ADD_PRAYER",
    AddOne = "ADD_ONE",
    AddStory = "ADD_STORY",
    AddLocalEvent = "ADD_LOCAL_EVENT",
    AddLocalMinistry = "ADD_LOCAL_MINISTRY",
    AddMissionsTrip = "ADD_MISSIONS_TRIP",

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

export const addOne = (item: One) => ({
    type: Action.AddOne,
    payload: item,
});

export const addPrayer = (item: Prayer) => ({
    type: Action.AddPrayer,
    payload: item,
});

export const addStory = (item: Story) => ({
    type: Action.AddStory,
    payload: item,
});

export const AddLocalEvent = (item: LocalEvent) => ({
    type: Action.AddLocalEvent,
    payload: item,
});

export const AddLocalMinistry = (item: LocalMinistry) => ({
    type: Action.AddLocalMinistry,
    payload: item,
});

export const AddMissionsTrip = (item: MissionsTrip) => ({
    type: Action.AddMissionsTrip,
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