import { combineReducers } from 'redux';
import { usersReducer } from "./users";
import { errorsReducer } from './errors';
import { prayersReducer } from './prayers';
import { onesReducer } from './ones';

export const rootReducer = combineReducers({
    users: usersReducer,
    errors: errorsReducer,
    prayers: prayersReducer,
    ones: onesReducer
});