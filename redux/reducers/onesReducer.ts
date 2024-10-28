import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    selectedOne: null,
    ones: [],
    oneFacts: [],
    oneForm: null
};

export function onesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ones, oneFacts } = action.payload;
            return update(state, {
                $set: {
                    selectedOne: ones ? ones[0] : null,
                    ones: ones || [],
                    oneFacts: oneFacts || [],
                    oneForm: null,
                }
            });
        case Action.SetSelectedOne:
            return update(state, {
                selectedOne: { $set: action.payload }
            });
        case Action.AddOne:
            return update(state, {
                ones: { $push: [action.payload] }
            });
        case Action.EditOne:
            return update(state, {
                ones: {
                    $apply: (ones) => ones.map((one) =>
                        one.id === action.payload.id ? { ...one, ...action.payload } : one
                    )
                }
            });
        case Action.AddActionStep:
            return update(state, {
                ones: {
                    $apply: (ones) => ones.map((one) =>
                        one.id === action.payload.oneId 
                            ? { 
                                ...one, 
                                actionSteps: [...one.actionSteps, action.payload] 
                            } : one
                    )
                }
            });
        case Action.EditActionSteps:
            return update(state, {
                ones: {
                    $apply: (ones) => ones.map((one) => {
                        if (one.id !== action.payload.oneId) {
                            return one;
                        }

                        const updatedActionSteps = [...one.actionSteps]
                            .filter(actionStep => actionStep.oneId !== action.payload.oneId) // Remove current action steps for this oneId
                            .concat(action.payload.actionSteps);

                        return {
                            ...one,
                            actionSteps: updatedActionSteps
                        };
                    })
                }
            });
        case Action.AddOneFact:
            return update(state, {
                oneFacts: { $push: [action.payload] }
            });
        case Action.SetOneForm:
            return update(state, {
                oneForm: { $set: action.payload }
            });
        default:
            return state;
    }
};