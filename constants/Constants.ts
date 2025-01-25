import { BeaconTag } from "@/enums/enums";
import { mapBeaconTagToTitleText, mapBeaconTagToDetailsText } from "@/utils/textUtils";

export const MAX_DAILY_TASKS_NEEDED_TO_COMPLETE = 3;

export const MAX_LONG_TEXT_LENGTH = 1800;
export const MAX_NORMAL_TEXT_LENGTH = 255;
export const MAX_SHORT_TEXT_LENGTH = 12;

export const REFRESH_BEACONS_INTERVAL_SEC = 30;

export const beaconTagArray = Object.keys(BeaconTag)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: BeaconTag[key as keyof typeof BeaconTag],
        title: mapBeaconTagToTitleText(BeaconTag[key as keyof typeof BeaconTag]),
        details: mapBeaconTagToDetailsText(BeaconTag[key as keyof typeof BeaconTag]),
    }));
