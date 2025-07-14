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
    RefreshData = "REFRESH_DATA",
    SetIsSetupForNotifications = "SET_IS_SETUP_FOR_NOTIFICATIONS",

    UpdateOneNoteFilters = "UPDATE_ONE_NOTE_FILTER",
    UpdateChaptersFilter = "UPDATE_CHAPTERS_FILTER",
    SetEditingChapterId = "UPDATE_EDITING_CHAPTER_ID",

    LoadServerData = "LOAD_SERVER_DATA",
    LoadBeaconData = "LOAD_BEACON_DATA",
    LoadPreferences = "LOAD_PREFERENCES",

    SetSelectedOneId = "SET_SELECTED_ONE_ID",

    SetSelectedBeaconTemplateId = "SET_SELECTED_BEACON_TEMPLATE_ID",
    SetSelectedBeaconPrayerId = "SET_SELECTED_BEACON_PRAYER_ID",
    
    SetBeaconForm = "SET_BEACON_FORM",
    AddBeaconActivity = "ADD_BEACON_ACTIVITY",
    AddStoryActivity = "ADD_STORY_ACTIVITY",
    AddNoteToActivity = "ADD_NOTE_TO_ACTIVITY",

    SetOneForm = "SET_ONE_FORM",

    SetNewUserStep = 'SET_NEW_USER_STEP',
    SetHomeDailies = 'SET_HOME_DAILIES',
    SetAppError = "SET_APP_ERROR",
    ClearAppError = "CLEAR_APP_ERROR",
    SetDataRefreshLoading = "SET_DATA_REFRESH_LOADING"
};

export class ActionPackage {
    type: string;
    payload: any;

    constructor(type: Action, payload: any) {
        this.type = type;
        this.payload = payload;
    }
}