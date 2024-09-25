import One from "@/models/one";
import { Action } from "../actions";
import ActionStep from "@/models/actionStep";
import OneFact from "@/models/oneFact";
import OneForm from "@/models/oneForm";

export const addOne = (item: One) => ({
    type: Action.AddOne,
    payload: item,
});

export const editOne = (item: One) => ({
    type: Action.EditOne,
    payload: item
});

export const setSelectedOne = (item: One) => ({
    type: Action.SetSelectedOne,
    payload: item,
});

export const addActionStep = (item: ActionStep) => ({
    type: Action.AddActionStep,
    payload: item,
});

export const editActionSteps = (actionSteps: ActionStep[], oneId: string) => ({
    type: Action.EditActionSteps,
    payload: { actionSteps, oneId },
});

export const AddOneFact = (item: OneFact) => ({
    type: Action.AddOneFact,
    payload: item,
});

export const setOneForm = (item: OneForm) => ({
    type: Action.SetOneForm,
    payload: item
})
