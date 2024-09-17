import React from 'react';
import { ListCard } from '../common/ListCard';
import MissionsTrip from '@/models/missionsTrip';

export type IMissionsTripCard = {
  missionsTrip: MissionsTrip;
  activeItemId: string | null;
  setActiveItemId: Function;
};

export function MissionsTripCard({ missionsTrip, activeItemId, setActiveItemId }: IMissionsTripCard) {
  return (
    <ListCard title={missionsTrip.title}
              details={missionsTrip.details}
              icon={missionsTrip.icon}
              hide={activeItemId !== null}
              onClick={() => setActiveItemId(missionsTrip.id)}/>
  );
}
