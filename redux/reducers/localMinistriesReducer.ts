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
                    localMinistries: localMinistries || [],
                    localEvents: localEvents || [],
                    localMinistryLeaders: localMinistryLeaders || []
                }
            });
        case Action.AddLocalMinistry:
            return update(state, {
                localMinistries: { $push: [action.payload] }
            });
        case Action.AddLocalEvent:
            return update(state, {
                localEvents: { $push: [action.payload] }
            });
        default:
            return state;
    }
};