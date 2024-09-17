import React from 'react';
import LocalEvent from '@/models/localEvent';
import { ListCard } from '../common/ListCard';

export type ILocalEventCard = {
  localEvent: LocalEvent;
  activeItemId: string | null;
  setActiveItemId: Function;
};

export function LocalEventCard({ localEvent, activeItemId, setActiveItemId }: ILocalEventCard) {
  return (
    <ListCard title={localEvent.title}
              icon={localEvent.icon}
              hide={activeItemId !== null}
              details={localEvent.details}
              onClick={() => setActiveItemId(localEvent.id)}/>
  );
}
