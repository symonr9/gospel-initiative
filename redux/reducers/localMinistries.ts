import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    localEvents: [],
    ministries: [],
};

export function localMinistriesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ministries, localEvents } = action.payload;
            return update(state, {
                $set: {
                    ministries: ministries || [],
                    localEvents: localEvents || []
                }
            });
        case Action.AddLocalMinistry:
            return update(state, {
                ministries: { $push: [action.payload] }
            });
        case Action.AddLocalEvent:
            return update(state, {
                localEvents: { $push: [action.payload] }
            });
        default:
            return state;
    }
};