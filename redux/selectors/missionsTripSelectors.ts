import MissionsTrip from "@/models/missionsTrip";
import { createSelector } from 'reselect';



export const selectAllMissionsTrips = (state: any): MissionsTrip[] => state.missionsTrips.missionsTrips;