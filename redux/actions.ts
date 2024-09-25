export * from "./actions/userActions";
export * from "./actions/activityActions";
export * from "./actions/appActions";
export * from "./actions/beaconActions";
export * from "./actions/ministryActions";
export * from "./actions/missionsTripActions";
export * from "./actions/oneActions";
export * from "./actions/storyActions";

export enum Action {
    SetUserId = 'SET_USER_ID',
    SetAuthToken = 'SET_AUTH_TOKEN',
    RemoveUserData = 'REMOVE_USER_DATA',
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
    LoadLocalData = "LOAD_LOCAL_DATA",
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