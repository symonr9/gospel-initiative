import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from "./reducers/usersReducer";
import { errorsReducer } from './reducers/errorsReducer';
import { beaconsReducer } from './reducers/beaconsReducer';
import { onesReducer } from './reducers/onesReducer';
import { storiesReducer } from './reducers/storiesReducer';
import { promptsReducer } from './reducers/promptsReducer';
import { appReducer } from './reducers/appReducer';
import { preferencesReducer } from './reducers/preferencesReducer';
import { activitiesReducer } from './reducers/activitiesReducer';
import { localMinistriesReducer } from './reducers/localMinistriesReducer';
import { missionsTripsReducer } from './reducers/missionsTripsReducer';

const store = configureStore({
    reducer: {
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
    }
});

export default store;
