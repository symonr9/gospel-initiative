import Beacon from "@/models/beacon";
import { Action } from "../actions";
import BeaconForm from "@/models/beaconForm";

export const setSelectedTemplateId = (item: string) => ({
    type: Action.SetSelectedBeaconId,
    payload: item,
});

export const setBeaconForm = (item: BeaconForm) => ({
    type: Action.SetBeaconForm,
    payload: item
});