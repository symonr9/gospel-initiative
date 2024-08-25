import { createSelector } from 'reselect';
import OneFact from '@/models/oneFact';
import { Priority, OneFactType } from '@/enums/enums';

export const selectAllOneFacts = (state: any): OneFact[] => state.ones.oneFacts;

export const selectOneFactById = (id: string) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts: OneFact[]) => oneFacts.find((oneFact) => oneFact.id === id)
  );

export const selectOneFactsByOneId = (oneId: string) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts) => oneFacts.filter((fact) => fact.oneId === oneId)
  );

export const selectOneFactsByPriority = (priority: Priority) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts: OneFact[]) => oneFacts.filter((oneFact) => oneFact.priority === priority)
  );

export const selectOneFactsByType = (type: OneFactType) =>
  createSelector(
    [selectAllOneFacts],
    (oneFacts: OneFact[]) => oneFacts.filter((oneFact) => oneFact.type === type)
  );
