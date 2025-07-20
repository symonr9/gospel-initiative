import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    localEvents: [],
    localMinistries: [],
    localMinistryLeaders: []
};

export function localMinistriesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { localMinistries, localEvents, localMinistryLeaders } = action.payload;
            return update(state, {
                $set: {
                    localMinistries: localMinistries || state.localMinistries,
                    localEvents: localEvents || state.localEvents,
                    localMinistryLeaders: localMinistryLeaders || state.localMinistryLeaders
                }
            });
        case Action.ClearAllData:
            return initialState;
        default:
            return state;
    }
};