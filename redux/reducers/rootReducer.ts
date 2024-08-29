import { combineReducers } from 'redux';
import { usersReducer } from "./usersReducer";
import { errorsReducer } from './errorsReducer';
import { prayersReducer } from './prayersReducer';
import { onesReducer } from './onesReducer';
import { storiesReducer } from './storiesReducer';
import { promptsReducer } from './promptsReducer';
import { appReducer } from './appReducer';
import { preferencesReducer } from './preferencesReducer';
import { activitiesReducer } from './activitiesReducer';

export const rootReducer = combineReducers({
    app: appReducer,
    users: usersReducer,
    errors: errorsReducer,
    prayers: prayersReducer,
    ones: onesReducer,
    stories: storiesReducer,
    prompts: promptsReducer,
    preferences: preferencesReducer,
    activities: activitiesReducer
});