import MissionsTrip from "@/models/missionsTrip";
import { Action } from "../actions";

export const AddMissionsTrip = (item: MissionsTrip) => ({
    type: Action.AddMissionsTrip,
    payload: item,
});
