import One from "@/models/one";
import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    selectedOneId: null,
    ones: [],
    oneNoteTypeFilters: [],
    oneNoteTextFilter: "",
    oneForm: null
};

export function onesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { ones } = action.payload;
            return update(state, {
                selectedOneId: { $set: state.selectedOneId || (ones?.length > 0 ? ones[0].id : null) },
                ones: { $set: ones || state.ones },
                oneNoteTypeFilters: { $set: state.oneNoteTypeFilters },
                oneNoteTextFilter: { $set: state.oneNoteTextFilter },
            });
        case Action.SetSelectedOneId:
            return update(state, {
                selectedOneId: { $set: action.payload }
            });
        case Action.SetOneForm:
            return update(state, {
                oneForm: { $set: action.payload }
            });
        case Action.UpdateOneNoteFilters:
            const { oneNoteTypeFilters, oneNoteTextFilter } = action.payload;
            return update(state, {
                oneNoteTypeFilters: {
                    $set: oneNoteTypeFilters || state.oneNoteTypeFilters
                },
                oneNoteTextFilter: {
                    $set: oneNoteTextFilter
                },
            });
        default:
            return state;
    }
};