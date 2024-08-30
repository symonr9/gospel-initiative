import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { EnhancedBeacon } from '@/models/beacon';

export type IShareChristBeaconDetails = ViewProps & {
    incomingCursorIdx: number | null;
    completedCursorIdx: number | null;
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];
};

export function ShareChristBeaconDetails({ incomingCursorIdx, completedCursorIdx,
    completedBeacons, incomingBeacons
 }: IShareChristBeaconDetails) {

    if (incomingCursorIdx === null && completedCursorIdx === null) {
        return (
            <View>
                <ThemedText type={ThemedTextType.Title}>
                    None Selected
                </ThemedText>
            </View>
        );
    }

    const beacon = getBeacon(incomingCursorIdx, completedCursorIdx, completedBeacons, incomingBeacons);
    if (!beacon) {
        return (
            <View>
                <ThemedText type={ThemedTextType.Title}>
                    Whaaa something went wrong
                </ThemedText>
            </View>
        )
    }

    console.log("BEACON: ", beacon);



    return (
        <View style={[styles.container]}>

        </View>
    )
}

function getBeacon(incomingCursorIdx: number | null, completedCursorIdx: number | null,
    completedBeacons: EnhancedBeacon[], incomingBeacons: EnhancedBeacon[]
): EnhancedBeacon | null {
    if (incomingCursorIdx !== null) {
        return incomingBeacons[incomingCursorIdx] || null;
    }
    if (completedCursorIdx !== null) {
        return completedBeacons[completedCursorIdx] || null;
    }
    return null;    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})