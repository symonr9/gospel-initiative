import React from 'react';
import { ListCard } from '../common/ListCard';
import LocalMinistry from '@/models/localMinistry';

export type ILocalMinistryCard = {
  localMinistry: LocalMinistry;
  activeItemId: string | null;
  setActiveItemId: Function;
};

export function LocalMinistryCard({ localMinistry, activeItemId, setActiveItemId }: ILocalMinistryCard) {
  return (
    <ListCard title={localMinistry.title}
              details={localMinistry.details}
              icon={localMinistry.icon}
              hide={activeItemId !== null}
              onClick={() => setActiveItemId(localMinistry.id)}/>
  );
}
