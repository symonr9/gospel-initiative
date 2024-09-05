import LocalEvent from '@/models/localEvent';
import LocalMinistry from '@/models/localMinistry';
import { createSelector } from 'reselect';

export const selectAllLocalMinistries = (state: any): LocalMinistry[] => state.ministries.localMinistries;
export const selectAllLocalEvents = (state: any) : LocalEvent[] => state.ministries.localEvents;

