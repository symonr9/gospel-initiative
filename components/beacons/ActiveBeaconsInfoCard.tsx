import React, { useEffect, useState } from 'react';
import { Animated, GestureResponderEvent, View, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { AnimatedCount } from '../common/AnimatedCount';
import Beacon from '@/models/beacon';

export type IActiveBeaconsInfoCard = ViewProps & {
    activeBeacons: Beacon[];
}

export function ActiveBeaconsInfoCard({ activeBeacons,
    style = {},
}: IActiveBeaconsInfoCard) {
    const count = activeBeacons.length;
    if (count === 0) {
        return <></>;
    }

    const label = count === 1 ? 'Active Beacon' : 'Active Beacons';
    
    return (
        <AnimatedCount count={count} 
                       label={label}
                       customStyles={{ countText: { left: 19, top: 12 }}}/>
    );
}

const styles = StyleSheet.create({
    count: {
        flex: 1,
        padding: 8,
        marginBottom: 4,
        marginTop: 8,
    },
    icon: {
        width: 38,
        height: 38,
        marginBottom: 12,
    },
});