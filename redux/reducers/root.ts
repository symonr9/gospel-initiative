import { combineReducers } from 'redux';
import { usersReducer } from "./users";
import { errorsReducer } from './errors';
import { prayersReducer } from './prayers';
import { onesReducer } from './ones';
import { storiesReducer } from './stories';
import { promptsReducer } from './prompts';
import { appReducer } from './app';
import { preferencesReducer } from './preferences';

export const rootReducer = combineReducers({
    app: appReducer,
    users: usersReducer,
    errors: errorsReducer,
    prayers: prayersReducer,
    ones: onesReducer,
    stories: storiesReducer,
    prompts: promptsReducer,
    preferences: preferencesReducer
});