import { createSelector } from 'reselect';

import User from "@/models/user";

export const selectExecutor = (state: any): User => state.users.executor;
export const selectAllUsers = (state: any): User[] => state.users.users;

export const selectUserById = (state: any, id: string): User | undefined =>
    selectAllUsers(state).find(user => user.id === id);