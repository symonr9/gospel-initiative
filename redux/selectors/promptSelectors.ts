import Prompt from '@/models/prompt';
import { createSelector } from 'reselect';

export const selectAllPrompts = (state: any): Prompt[] => state.prompts.prompts;

export const selectPromptsByUserId = (state: any, userId: string): Prompt[] =>
    selectAllPrompts(state).filter(prompt => prompt.userId === userId);

export const selectFirstPromptByUserId = createSelector(
    [selectPromptsByUserId],
    (prompts) => prompts.length > 0 ? prompts[0] : undefined
);