import { createSelector } from 'reselect';

import ActionStep from "@/models/actionStep";
import One from "@/models/one";

export const selectAllOnes = (state: any): One[] => state.ones.ones;

// Ones
export const selectOneById = (state: any, id: string): One | undefined =>
    selectAllOnes(state).find(one => one.id === id);

export const selectOnesByUserId = (state: any, userId: string): One[] =>
    selectAllOnes(state).filter(one => one.userId === userId);

export const selectFirstOneByUserId = createSelector(
    [selectOnesByUserId],
    (ones) => ones.length > 0 ? ones[0] : undefined
);
