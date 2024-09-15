import { createSelector } from 'reselect';

import ActionStep from "@/models/actionStep";
import One from "@/models/one";
import OneFact from "@/models/oneFact";

export const selectAllOnes = (state: any): One[] => state.ones.ones;
export const selectAllOneFacts = (state: any): OneFact[] => state.ones.oneFacts;
export const selectAllActionSteps = (state: any): ActionStep[] => state.ones.actionSteps;

// Ones
export const selectOneById = (state: any, id: string): One | undefined =>
    selectAllOnes(state).find(one => one.id === id);

export const selectOnesByUserId = (state: any, userId: string): One[] =>
    selectAllOnes(state).filter(one => one.userId === userId);

export const selectFirstOneByUserId = createSelector(
    [selectOnesByUserId],
    (ones) => ones.length > 0 ? ones[0] : undefined
);


// One Facts

export const selectOneFactsByOneId = (oneId: string) =>
    createSelector(
        [selectAllOneFacts],
        (oneFacts) => oneFacts
            .filter((fact) => fact.oneId === oneId)
            .sort((a, b) => b.priority - a.priority)
    );

// Action Steps 

export const selectActionStepsByOneId = (state: any, oneId: string | undefined): ActionStep[] =>
    selectAllActionSteps(state).filter(actionStep => actionStep.oneId === oneId);
  