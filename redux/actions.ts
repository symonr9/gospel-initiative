import { Page } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import Beacon from "@/models/beacon";
import BeaconActivity from "@/models/beaconActivity";
import BeaconForm from "@/models/beaconForm";
import LocalEvent from "@/models/localEvent";
import LocalMinistry from "@/models/localMinistry";
import MissionsTrip from "@/models/missionsTrip";
import One from "@/models/one";
import OneFact from "@/models/oneFact";
import OneForm from "@/models/oneForm";
import Story from "@/models/story";
import StoryChapter from "@/models/storyChapter";

export enum Action {
    OpenPage = "OPEN_PAGE",

    AddBeacon = "ADD_BEACON",
    AddOne = "ADD_ONE",
    EditOne = "EDIT_ONE",
    AddStory = "ADD_STORY",
    AddLocalEvent = "ADD_LOCAL_EVENT",
    AddLocalMinistry = "ADD_LOCAL_MINISTRY",
    AddMissionsTrip = "ADD_MISSIONS_TRIP",
    AddPrompt = "ADD_PROMPT",
    AddOneFact = "ADD_ONE_FACT",
    AddStoryChapter = "ADD_STORY_CHAPTER",
    AddActionStep = "ADD_ACTION_STEP",
    EditActionSteps = "EDIT_ACTION_STEPS",

    LoadServerData = "LOAD_SERVER_DATA",
    LoadPreferences = "LOAD_PREFERENCES",
    UpdateTabIndex = "UPDATE_TAB_INDEX",

    SetSelectedOne = "SET_SELECTED_ONE",
    SetSelectedBeaconId = "SET_SELECTED_BEACON_ID",
    UpdateBeacon = "UPDATE_BEACON",
    SetBeaconActiveUntil = "SET_BEACON_ACTIVE_UNTIL",

    SetBeaconForm = "SET_BEACON_FORM",
    AddBeaconActivity = "ADD_BEACON_ACTIVITY",
    AddStoryActivity = "ADD_STORY_ACTIVITY",
    AddNoteToActivity = "ADD_NOTE_TO_ACTIVITY",

    SetOneForm = "SET_ONE_FORM",

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

export const addOne = (item: One) => ({
    type: Action.AddOne,
    payload: item,
});

export const editOne = (item: One) => ({
    type: Action.EditOne,
    payload: item
});

export const setSelectedOne = (item: One) => ({
    type: Action.SetSelectedOne,
    payload: item,
});

export const setSelectedTemplateId = (item: string) => ({
    type: Action.SetSelectedBeaconId,
    payload: item,
});

export const setBeaconActiveUntil = (id: string, date: Date | undefined) => ({
    type: Action.SetBeaconActiveUntil,
    payload: { id, date },
});

export const updateBeacon = (item: Beacon) => ({
    type: Action.UpdateBeacon,
    payload: item,
});

export const addBeacon = (item: Beacon) => ({
    type: Action.AddBeacon,
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

export const addActionStep = (item: ActionStep) => ({
    type: Action.AddActionStep,
    payload: item,
});

export const editActionSteps = (actionSteps: ActionStep[], oneId: string) => ({
    type: Action.EditActionSteps,
    payload: { actionSteps, oneId },
});

export const AddOneFact = (item: OneFact) => ({
    type: Action.AddOneFact,
    payload: item,
});

export const updateTabIndex = (item: number) => ({
    type: Action.UpdateTabIndex,
    payload: item,
});

export const AddStoryChapters = (item: StoryChapter) => ({
    type: Action.AddStoryChapter,
    payload: item,
});

export const setBeaconForm = (item: BeaconForm) => ({
    type: Action.SetBeaconForm,
    payload: item
});

export const addBeaconActivity = (item: BeaconActivity) => ({
    type: Action.AddBeaconActivity,
    payload: item
});

export const addStoryActivity = (item: BeaconActivity) => ({
    type: Action.AddStoryActivity,
    payload: item
});

export const addNoteToActivity = (activityId: string, note: string) => ({
    type: Action.AddNoteToActivity,
    payload: { activityId, note }
});

export const setOneForm = (item: OneForm) => ({
    type: Action.SetOneForm,
    payload: item
})

export const setAppError = (error: Error) => ({
    type: Action.SetAppError,
    payload: { error }
});

export const clearAppError = () => ({
    type: Action.ClearAppError,
    payload: null
});