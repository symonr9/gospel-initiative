import One from "@/models/one";
import { Action } from "../actions";
import ActionStep from "@/models/actionStep";
import OneForm from "@/models/oneForm";
import { OneNoteType } from "@/enums/enums";

export const setSelectedOneId = (item: string | null) => ({
    type: Action.SetSelectedOneId,
    payload: item,
});

export const setOneForm = (item: OneForm) => ({
    type: Action.SetOneForm,
    payload: item
})

export const updateOneNotesFilters = (oneNoteTypeFilters: OneNoteType[], oneNoteTextFilter: string ) => ({
    type: Action.UpdateOneNoteFilters,
    payload: { oneNoteTypeFilters, oneNoteTextFilter },
});