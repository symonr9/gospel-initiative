import { createSelector } from 'reselect';
import OneFact from '@/models/oneFact';
import ActionStep from '@/models/actionStep';

export const selectAllOneFacts = (state: any): OneFact[] => state.ones.oneFacts;

export const selectOneFactsByOneId = (oneId: string) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts) => oneFacts.filter((fact) => fact.oneId === oneId)
  );

export const selectAllActionSteps = (state: any): ActionStep[] => state.ones.actionSteps;

export const selectActionStepsByOneId = (oneId: string) =>
  createSelector(
    [selectAllActionSteps],
    (actionSteps) => actionSteps.filter((actionStep) => actionStep.oneId === oneId)
  );
