import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    selectedOne: null,
    ones: [],
    actionSteps: [],
    oneFacts: []
};

export function onesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ones, actionSteps, oneFacts } = action.payload;
            return update(state, {
                $set: {
                    selectedOne: null,
                    ones: ones || [],
                    actionSteps: actionSteps || [],
                    oneFacts: oneFacts || [],
                }
            });
        case Action.SetSelectedOne:
            return update(state, {
                selectedOne: { $set: action.payload }
            });
        case Action.AddOne:
            const { one } = action.payload;
            return update(state, {
                ones: { $push: [one] }
            });
        case Action.AddActionStep:
            const { actionStep } = action.payload;
            return update(state, {
                actionSteps: { $push: [actionStep] }
            });
        case Action.AddOneFact:
            const { oneFact } = action.payload;
            return update(state, {
                oneFacts: { $push: [oneFact] }
            });
        default:
            return state;
    }
};