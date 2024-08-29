import { createSelector } from 'reselect';

import User from "@/models/user";
import { selectActionStepsByOneId, selectFirstOneByUserId } from './oneSelectors';

export const selectExecutor = (state: any): User => state.users.executor;
export const selectAllUsers = (state: any): User[] => state.users.users;

export const selectUserById = (state: any, id: string): User | undefined =>
    selectAllUsers(state).find(user => user.id === id);

export const selectFirstOneAndActionStepsByUserId = createSelector(
    [selectFirstOneByUserId, (state, userId) => state],
    (firstOne, state) => {
      if (!firstOne) {
        return { firstOne: undefined, actionSteps: [] };
      }
  
      const actionSteps = selectActionStepsByOneId(state, firstOne.id);
      return { firstOne, actionSteps };
    }
  );