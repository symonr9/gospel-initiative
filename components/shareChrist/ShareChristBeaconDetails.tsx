import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { AppIcon, BeaconType } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText, getDaysPrayedForText, mapStageToText, mapStageToIcon } from '@/utils/appUtils';

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
                <AppText type={TextType.Title}>
                    None Selected
                </AppText>
            </View>
        );
    }

    const beacon = getBeacon(incomingCursorIdx, completedCursorIdx, completedBeacons, incomingBeacons);
    if (!beacon) {
        return (
            <View>
                <AppText type={TextType.Title}>
                    Whaaa something went wrong
                </AppText>
            </View>
        )
    }

    console.log("BEACON: ", beacon);

    const { name, message, user, one, settings, activeUntil, type } = beacon;
    if (!user || !one || !settings || !activeUntil) {
        console.error("Missing props for beacon...");
        return <></>;
    }

    const titleText = getTitleText(beacon);
    if (!titleText) {
        return <></>;
    }

    const rows = [(
        <View style={styles.section}>
            <View style={styles.row}>
                <View>
                    <AppText type={TextType.Body}>Notes:</AppText>
                    <AppText type={TextType.Italic}>{message}</AppText>
                </View>
            </View>
        </View>
    )];

    if (one.prayingSince) {
        rows.push(
            <View style={styles.section}>
            <View style={styles.row}>
                <View>
                    <AppText type={TextType.Body}>{user.name} has...</AppText>
                    <AppText type={TextType.BodyBold}>{getDaysPrayedForText(one.prayingSince)}</AppText>
                </View>
            </View>
        </View>
        );
    }

    const stagePrefix = settings.shareOneName ? `${one.name}...` : `Their One is...`;
    rows.push(
        <View style={styles.section}>
            <View style={styles.row}>
                <Image source={mapStageToIcon(one.stage)} style={styles.icon} />
                <View style={styles.column}>
                    <AppText type={TextType.Body}>{stagePrefix}</AppText>
                    <AppText type={TextType.BodyBold}>{mapStageToText(one.stage)}</AppText>
                </View>
            </View>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <Image source={user.icon} style={styles.profileIcon} />            
                    <Image source={one.icon} style={styles.profileIcon} />
                </View>
                <AppText type={TextType.Title} style={{textAlign: 'center'}}>{titleText}</AppText>
            </View>

            {rows.map((row) => row)}

            <View style={styles.section}>
                <AppText type={TextType.Body}>Active Until:</AppText>
                <AppText type={TextType.BodyBold}>
                    {getAppTimeAgoText(activeUntil)}
                </AppText>
                <AppText type={TextType.Default}>
                    {formatDateTime(activeUntil)}
                </AppText>
            </View>
        </View>
    );
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

function getTitleText(beacon: EnhancedBeacon): string | undefined {
    const { name, message, user, one, settings, activeUntil, type } = beacon;
    if (!user || !one || !settings || !activeUntil) {
        return undefined;
    }

    let text;
    if (type === BeaconType.Meeting) {
        text = `${user.name} is meeting with `;
        if (settings.shareOneName) {
            text += `${one.name}.`;
        } else {
            text += `their One.`;
        }
    }

    return text;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    section: {
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
    },
    profileIcon: {
        width: 64,
        height: 64,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },
})