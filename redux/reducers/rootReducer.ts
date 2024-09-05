import { combineReducers } from 'redux';
import { usersReducer } from "./usersReducer";
import { errorsReducer } from './errorsReducer';
import { beaconsReducer } from './beaconsReducer';
import { onesReducer } from './onesReducer';
import { storiesReducer } from './storiesReducer';
import { promptsReducer } from './promptsReducer';
import { appReducer } from './appReducer';
import { preferencesReducer } from './preferencesReducer';
import { activitiesReducer } from './activitiesReducer';
import { localMinistriesReducer } from './localMinistriesReducer';
import { missionsTripsReducer } from './missionsTripsReducer';

export const rootReducer = combineReducers({
    app: appReducer,
    users: usersReducer,
    errors: errorsReducer,
    beacons: beaconsReducer,
    ones: onesReducer,
    stories: storiesReducer,
    prompts: promptsReducer,
    preferences: preferencesReducer,
    activities: activitiesReducer,
    ministries: localMinistriesReducer,
    missionsTrips: missionsTripsReducer
});