import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing, type ViewProps, Dimensions } from 'react-native';
import { Image } from 'expo-image';

import { AppText, TextType } from '../common/AppText';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { AppIcon, BeaconType } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText, getDaysPrayedForText, mapStageToText, mapStageToIcon } from '@/utils/appUtils';
import { ActiveBeaconsInfoCard } from '../beacons/ActiveBeaconsInfoCard';
import { AnimatedCount } from '../common/AnimatedCount';
import SimpleIconButton from '../common/SimpleIconButton';
import { AnimatedBanner } from '../common/AnimatedBanner';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { AnimatedElement } from '../common/AnimatedElement';

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
            <View style={styles.center}>
                <AppText type={TextType.Title}>
                    None Selected
                </AppText>
            </View>
        );
    }

    const beacon = getBeacon(incomingCursorIdx, completedCursorIdx, completedBeacons, incomingBeacons);
    if (!beacon) {
        return (
            <View style={styles.center}>
                <AppText type={TextType.Title}>
                    Whaaa something went wrong
                </AppText>
            </View>
        )
    }

    console.log("BEACON: ", beacon);

    const { name, message, user, one, settings, activeUntil, completedActivities } = beacon;
    if (!user || !one || !settings || !activeUntil || !completedActivities) {
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
                <View style={[styles.column, { marginTop: 0 }]}>
                    <AnimatedCount count={completedActivities.length} label={'Completed Prayers'}/>
                </View>
            </View>
            <View>
            </View>
        </View>
    );


    rows.push(
        <View style={styles.section}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <AppText type={TextType.DefaultSemiBold}>
                        {getAppTimeAgoText(activeUntil)}
                    </AppText>
                    <AppText type={TextType.Body}>
                        {formatDateTime(activeUntil)}
                    </AppText>
                </View>
            </View>
        </View>
    );

    // rows.push(

    // );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <AnimatedElement element={
                        <Image source={user.icon} style={styles.profileIcon} />
                    } delay={200}/>
                    <AnimatedElement element={
                        <Image source={one.icon} style={styles.profileIcon} />
                    } delay={400}/>
                </View>
                <AnimatedHeader title={titleText} delay={600} style={{ textAlign: 'center' }}/>
            </View>

            <AnimatedElement element={
                rows.map((row, index) => (
                    <View key={index}>{row}</View>
                ))
            } delay={800}/>

            <View style={styles.buttonRow}>
                <SimpleIconButton iconSrc={AppIcon.Mail} title={'Message'} customStyles={customPrayButtonStyles}/>
                <SimpleIconButton iconSrc={AppIcon.Prayer} title={'Pray'} customStyles={customPrayButtonStyles}/>
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
    const { user, one, settings, activeUntil, type } = beacon;
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
        display: 'flex',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
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
        marginBottom: 8,
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
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
});

const customPrayButtonStyles = {
    container: {
        alignSelf: 'flex-end',
        marginStart: 16
    }
}