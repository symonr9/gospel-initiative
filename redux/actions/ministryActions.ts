import LocalEvent from "@/models/localEvent";
import LocalMinistry from "@/models/localMinistry";
import { Action } from "../actions";

export const AddLocalEvent = (item: LocalEvent) => ({
    type: Action.AddLocalEvent,
    payload: item,
});

export const AddLocalMinistry = (item: LocalMinistry) => ({
    type: Action.AddLocalMinistry,
    payload: item,
});