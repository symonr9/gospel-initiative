import Beacon from "@/models/beacon";
import { Action } from "../actions";
import BeaconForm from "@/models/beaconForm";

export const setSelectedTemplateId = (item: string) => ({
    type: Action.SetSelectedBeaconId,
    payload: item,
});

export const setBeaconActiveUntil = (id: string, date: Date | undefined) => ({
    type: Action.SetBeaconActiveUntil,
    payload: { id, date },
});

export const updateBeacon = (item: Beacon) => ({
    type: Action.UpdateBeacon,
    payload: item,
});

export const addBeacon = (item: Beacon) => ({
    type: Action.AddBeacon,
    payload: item,
});

export const setBeaconForm = (item: BeaconForm) => ({
    type: Action.SetBeaconForm,
    payload: item
});