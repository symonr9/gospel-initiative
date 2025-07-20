import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    beaconActivities: [],
    storyActivities: []
};

export function activitiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadBeaconData:
        case Action.LoadServerData:
            const { activeBeacons, expiredBeacons, storyActivities } = action.payload;
            const activeBeaconActivities = activeBeacons?.flatMap((beacon: any) => beacon.activities ? beacon.activities : []) || null;
            const expiredBeaconActivities = expiredBeacons?.flatMap((beacon: any) => beacon.activities ? beacon.activities : []) || null;
            const needsUpdate = activeBeaconActivities && expiredBeaconActivities;
            const beaconActivities = needsUpdate ? activeBeaconActivities.concat(expiredBeaconActivities) : state.beaconActivities;
            return update(state, {
                $set: {
                    beaconActivities: beaconActivities || state.beaconActivities,
                    storyActivities: storyActivities || state.storyActivities
                }
            });
        case Action.ClearAllData:
            return initialState;
        default:
            return state;
    }
}
