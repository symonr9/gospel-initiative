import Beacon from "@/models/beacon";
import { Action } from "../actions";
import BeaconForm from "@/models/beaconForm";

export const setSelectedTemplateId = (item: string) => ({
    type: Action.SetSelectedBeaconTemplateId,
    payload: item,
});

export const setSelectedPrayerId = (item: string) => ({
    type: Action.SetSelectedBeaconPrayerId,
    payload: item,
});

export const setBeaconForm = (item: BeaconForm) => ({
    type: Action.SetBeaconForm,
    payload: item
});

export const loadBeaconData = (data: any) => {
    return {
        type: Action.LoadBeaconData,
        payload: data,
    }
};