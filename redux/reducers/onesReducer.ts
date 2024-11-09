import One from "@/models/one";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    selectedOne: null,
    ones: [],
    oneFacts: [],
    oneForm: null
};

const decideSelectedOne = (state: any, ones: any) => {
    if (!state.selectedOne && ones) {
        return ones[0]; // Load first by default;
    }

    const newOne = ones.find((one: One) => one.id === state.selectedOne.id) || null;
    if (newOne) {
        return newOne;
    }

    return state.selectedOne;
}

export function onesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ones, oneFacts } = action.payload;

            return update(state, {
                $set: {
                    selectedOne: decideSelectedOne(state, ones),
                    ones: ones || state.ones,
                    oneFacts: oneFacts || state.oneFacts,
                    oneForm: state.oneForm,
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