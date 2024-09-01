import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing, type ViewProps, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';

import { AppText, TextType } from '../common/AppText';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { AppIcon, BeaconType, FadeDirection } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText, getDaysPrayedForText, mapStageToText, mapStageToIcon, mapBeaconTypeToTitleText, mapBeaconTypeToAppIcon } from '@/utils/appUtils';
import { AnimatedCount } from '../common/AnimatedCount';
import SimpleIconButton from '../common/SimpleIconButton';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { AnimatedElement } from '../common/AnimatedElement';
import { prayForBeacon } from '@/redux/actions';
import User from '@/models/user';
import BeaconActivity from '@/models/beaconActivity';
import { PageRow } from '../common/PageRow';

export type IShareChristBeaconDetails = ViewProps & {
    incomingCursorIdx: number | null;
    completedCursorIdx: number | null;
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];

    executor: User;
    beaconActivities: BeaconActivity[];

    prayForBeacon: Function;
};

function ShareChristBeaconDetails({ incomingCursorIdx, completedCursorIdx,
    completedBeacons, incomingBeacons, executor, prayForBeacon, beaconActivities }: IShareChristBeaconDetails) {

    const beacon = getBeacon(incomingCursorIdx, completedCursorIdx, completedBeacons, incomingBeacons);
    if (!beacon || (incomingCursorIdx === null && completedCursorIdx === null)) {
        const hasCompleted = completedBeacons.find((beacon) => beacon.userId === executor.id) !== undefined
            && incomingBeacons.find((beacon) => beacon.userId === executor.id) === undefined;
        if (hasCompleted) {
            return (
                <View style={[styles.center, styles.column]}>
                    <AnimatedHeader title='All Beacons Completed!'
                        subtitle='Please check back later for new beacons.' />
                </View>
            );
        }

        return (
            <View style={[styles.center, styles.column]}>
                <AnimatedHeader title='Prayer Beacons'
                    subtitle='Select a beacon below to begin.' />
            </View>
        );
    }

    const { message, user, one, activeUntil, completedActivities } = beacon;
    if (!user || !one || !activeUntil || !completedActivities) {
        console.error("Missing props for beacon...");
        return <></>;
    }

    const hasUserAlreadyPrayed = beaconActivities.find((activity) => activity.userId === executor.id && activity.beaconId === beacon.id) !== undefined;

    const titleText = getTitleText(beacon);
    if (!titleText) {
        console.error("missing title...");
        return <></>;
    }

    const rows = [];

    if (message) {
        rows.push(
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.notesSection}>
                        <AppText type={TextType.Body}>Notes:</AppText>
                        <AppText type={TextType.DefaultSemiBold}>{message}</AppText>
                    </View>
                </View>
            </View>
        );
    }

    if (one.prayingSince) {
        const prayingSincePrefix = beacon.shareOwnName ? user.name : 'The user';
        rows.push(
            <View style={styles.section}>
                <View style={styles.row}>
                    <View>
                        <AppText type={TextType.Body}>{prayingSincePrefix} has...</AppText>
                        <AppText type={TextType.DefaultSemiBold}>{getDaysPrayedForText(one.prayingSince)}</AppText>
                    </View>
                </View>
            </View>
        );
    }

    const stagePrefix = beacon.shareOneName ? `${one.name}...` : `Their One is...`;
    rows.push(
        <View style={styles.section}>
            <PageRow spaceBetween>
                <View style={styles.row}>
                    <Image source={mapStageToIcon(one.stage)} style={styles.icon} />
                    <View style={styles.column}>
                        <AppText type={TextType.Body}>{stagePrefix}</AppText>
                        <AppText type={TextType.DefaultSemiBold}>{mapStageToText(one.stage)}</AppText>
                    </View>
                </View>
                <View style={[styles.column, { marginTop: 0 }]}>
                    <AnimatedCount count={completedActivities.length}
                        customStyles={{ container: { justifyContent: 'center', alignItems: 'center', } }}
                        label={'Completed Prayers'} />
                </View>
            </PageRow>
            <View>
            </View>
        </View>
    );

    const onMessageClick = () => {
        
    };

    const onPrayClick = () => {
        if (hasUserAlreadyPrayed) {
            return;
        }

        prayForBeacon(
            BeaconActivity.createBeaconActivity(
                "Note",
                executor,
                beacon
            )
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.timeAgo}>
                    <AppText type={TextType.Italic}>
                        {getAppTimeAgoText(activeUntil)}
                    </AppText>
                </View>

                <View style={[styles.row, { gap: 12 }]}>
                    <AnimatedElement element={
                        <Image source={user.icon} style={styles.profileIcon} />
                    } delay={300} direction={FadeDirection.Left}/>
                    <AnimatedElement element={
                        <Image source={mapBeaconTypeToAppIcon(beacon.type)} 
                               style={[styles.profileIcon, { width: 42, height: 42 }]} />
                    } delay={900} direction={FadeDirection.Up}/>
                    <AnimatedElement element={
                        <Image source={one.icon} style={styles.profileIcon} />
                    } delay={600} direction={FadeDirection.Right}/>
                </View>
                <AnimatedHeader title={beacon.name}
                    subtitle={titleText}
                    delay={600}
                    style={{ textAlign: 'center' }} />
            </View>

            <AnimatedElement element={
                rows.map((row, index) => (
                    <View key={index}>{row}</View>
                ))
            } delay={800} style={styles.detailsContainer} />

            <View style={styles.buttonRow}>
                <Animated.View style={[styles.lighthouseContainer]}>
                    <Image source={AppIcon.LightHouse} style={styles.lightHouse} />
                </Animated.View>

                <SimpleIconButton iconSrc={AppIcon.Mail}
                    title={'Message'}
                    onClick={onMessageClick}
                    customStyles={customPrayButtonStyles} />
                <SimpleIconButton iconSrc={AppIcon.Prayer}
                    title={'Pray'}
                    disabled={hasUserAlreadyPrayed}
                    onClick={onPrayClick}
                    customStyles={customPrayButtonStyles} />
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
    const { user, one, activeUntil, type, shareOneName, shareOwnName } = beacon;
    if (!user || !one || !activeUntil) {
        return undefined;
    }

    return mapBeaconTypeToTitleText(type, shareOneName, shareOwnName, user, one);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
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
        alignItems: 'center'
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
        width: 60,
        height: 60,
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },
    detailsContainer: {
        height: 300,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    lighthouseContainer: {
        position: 'absolute',
        bottom: 30,
        right: 320,
        height: 80,
        width: 80,
    },
    lightHouse: {
        width: 120,
        height: 120,
        opacity: 0.5,
    },
    notesSection: {
        width: '100%',
        maxHeight: 120,
        backgroundColor: 'whitesmoke',
        padding: 8,
        borderRadius: 4,
        overflow: 'scroll',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    timeAgo: {
        alignSelf: 'flex-end'
    }
});

const customPrayButtonStyles = {
    container: {
        alignSelf: 'flex-end',
        marginStart: 16
    }
}

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    beaconActivities: state.activities.beaconActivities,
});

const mapDispatchToProps = {
    prayForBeacon
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconDetails);
