import { combineReducers } from 'redux';
import { usersReducer } from "./users";
import { errorsReducer } from './errors';
import { prayersReducer } from './prayers';

export const rootReducer = combineReducers({
    usersReducer,
    errorsReducer,
    prayersReducer
});