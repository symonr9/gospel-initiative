import BeaconActivity from "@/models/beaconActivity";
import { Action } from "../actions";

export const addBeaconActivity = (item: BeaconActivity) => ({
    type: Action.AddBeaconActivity,
    payload: item
});

export const addStoryActivity = (item: BeaconActivity) => ({
    type: Action.AddStoryActivity,
    payload: item
});

export const addNoteToActivity = (activityId: string, note: string) => ({
    type: Action.AddNoteToActivity,
    payload: { activityId, note }
});
