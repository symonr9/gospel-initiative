import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Modal, type ViewProps, TouchableOpacity, Button, TextInput, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { AppText, TextType } from '../common/AppText';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { AppIcon, BeaconType, FadeDirection } from '@/enums/enums';
import { formatDateTime, getAppTimeAgoText, getDaysPrayedForText, mapStageToText, mapStageToIcon, mapBeaconTypeToTitleText, mapBeaconTypeToAppIcon } from '@/utils/appUtils';
import { AnimatedCount } from '../common/AnimatedCount';
import SimpleIconButton from '../common/SimpleIconButton';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { AnimatedElement } from '../common/AnimatedElement';
import { addNoteToActivity, addBeaconActivity } from '@/redux/actions';
import User from '@/models/user';
import BeaconActivity from '@/models/beaconActivity';
import { PageRow } from '../common/PageRow';
import { ActivityNoteOptions } from '@/constants/Strings';
import { AnimatedCard } from '../common/AnimatedCard';
import { PageColumn } from '../common/PageColumn';
import ScrollLayout from '../common/ScrollLayout';

export type IShareChristBeaconDetails = ViewProps & {
    incomingCursorIdx: number;
    completedCursorIdx: number;
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];

    executor: User;
    beaconActivities: BeaconActivity[];

    addNoteToActivity: Function;
    addBeaconActivity: Function;
};

function ShareChristBeaconDetails({ incomingCursorIdx, completedCursorIdx,
    completedBeacons, incomingBeacons, executor, addBeaconActivity, addNoteToActivity,
    beaconActivities }: IShareChristBeaconDetails) {

    const beacon = getBeacon(incomingCursorIdx, completedCursorIdx, completedBeacons, incomingBeacons);
    const userActivityForBeacon = beaconActivities.find((activity) => activity.userId === executor.id && activity.beaconId === beacon?.id);
    const hasUserAlreadyPrayed = userActivityForBeacon !== undefined;

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedNoteIdx, setSelectedNoteIdx] = useState(0);
    const [customNote, setCustomNote] = useState('');

    const progress = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['#FFF', 'lightgreen']
        );

        const opacity = hasUserAlreadyPrayed
            ? withTiming(1, { duration: 250 })
            : withTiming(0.5, { duration: 250 });

        return {
            backgroundColor,
            opacity,
        };
    });

    if (!beacon || (incomingCursorIdx === -1 && completedCursorIdx === -1)) {
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

                <PageRow spaceEvenly>
                    <AnimatedCard text={incomingBeacons.length}
                        direction={FadeDirection.Left}
                        label='To Pray for' />
                    <AnimatedCard text={completedBeacons.length}
                        direction={FadeDirection.Right}
                        label='Prayed for Today' />
                </PageRow>
            </View>
        );
    }

    const { message, user, one, activeUntil, completedActivities } = beacon;
    if (!user || !one || !activeUntil || !completedActivities) {
        console.error("Missing props for beacon...");
        return <></>;
    }

    const titleText = getTitleText(beacon);
    if (!titleText) {
        console.error("missing title...");
        return <></>;
    }

    const rows = [];

    if (message) {
        rows.push(
            <View style={[styles.section, styles.notesSection]}>
                <AppText type={TextType.Body}>Notes:</AppText>
                <AppText type={TextType.DefaultSemiBold}>{message}</AppText>
            </View>
        );
    }

    const stagePrefix = beacon.shareOneName ? `${one.name}...` : `Their One is...`;
    rows.push(
        <View style={styles.section}>
            <PageRow spaceEvenly>
                <View>
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

    const onNoteClick = () => {
        setModalVisible(true);
    };

    const onSaveClick = () => {
        setModalVisible(false);
        if (!hasUserAlreadyPrayed && !userActivityForBeacon) {
            return;
        }

        const note = (() => {
            if (customNote !== '')
                return customNote;
            if (selectedNoteIdx >= 0 && selectedNoteIdx < ActivityNoteOptions.length)
                return ActivityNoteOptions[selectedNoteIdx];
            return null;
        })();

        if (!note) {
            console.error('Failed to get note');
            return;
        }
        addNoteToActivity(userActivityForBeacon.id, note);
        setCustomNote('');
        setSelectedNoteIdx(0);
    };

    const onPrayClick = () => {
        if (hasUserAlreadyPrayed) {
            return;
        }

        progress.value = withTiming(1, { duration: 250 });

        addBeaconActivity(
            BeaconActivity.createBeaconActivity(
                "",
                executor,
                beacon
            )
        );
    };

    return (
        <View style={[styles.container, animatedStyle]}>
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <AppText type={TextType.DefaultSemiBold} style={styles.closeButtonText}>X</AppText>
                        </TouchableOpacity>

                        <AppText type={TextType.Body}>Select a note:</AppText>

                        <ScrollLayout style={{ height: 400 }}>
                            <View style={styles.defaultNoteOptionsDiv}>
                            {
                                    ActivityNoteOptions.map((value, idx) => (
                                        <TouchableOpacity onPress={() => setSelectedNoteIdx(idx)}>
                                            <View style={[styles.defaultNoteCard, selectedNoteIdx === idx && styles.selectedDefaultNoteCard]}>
                                                <AppText type={TextType.DefaultSemiBold}>
                                                    {value}
                                                </AppText>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </ScrollLayout>

                        {(ActivityNoteOptions[selectedNoteIdx] || '') === 'Custom' && (
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your custom note"
                                placeholderTextColor={'lightgray'}
                                value={customNote}
                                maxLength={80}
                                onChangeText={setCustomNote}
                            />
                        )}

                        <Button title="Save" onPress={onSaveClick} />
                    </View>
                </View>
            </Modal>

            <View style={[styles.header]}>
                <View style={styles.timeAgo}>
                    <AppText type={TextType.Italic}>
                        {getAppTimeAgoText(activeUntil)}
                    </AppText>
                </View>

                <PageRow style={[{ gap: 12 }]}>
                    <AnimatedElement element={
                        <Image source={user.icon} style={styles.profileIcon} />
                    } delay={300} direction={FadeDirection.Left} />
                    <AnimatedElement element={
                        <Image source={mapBeaconTypeToAppIcon(beacon.type)}
                            style={[styles.profileIcon, { width: 42, height: 42 }]} />
                    } delay={900} direction={FadeDirection.Up} />
                    <AnimatedElement element={
                        <Image source={one.icon} style={styles.profileIcon} />
                    } delay={600} direction={FadeDirection.Right} />
                </PageRow>
                <AnimatedHeader title={beacon.name}
                    subtitle={titleText}
                    delay={600}
                    style={{ textAlign: 'center' }} />
            </View>

            <AnimatedElement element={
                <PageColumn>
                    {
                        rows.map((row, index) => (
                            <View key={index}>{row}</View>
                        ))
                    }
                </PageColumn>

            } delay={800} style={styles.detailsContainer} />

            <View style={[styles.buttonRow]}>
                <Animated.View style={[styles.lighthouseContainer]}>
                    <Image source={AppIcon.LightHouse} style={styles.lightHouse} />
                </Animated.View>

                {
                    (hasUserAlreadyPrayed && userActivityForBeacon.note?.length > 0) && (
                        <View style={styles.myNoteForBeacon}>
                            <AppText type={TextType.Body}>
                                Your Note:
                            </AppText>
                            <AppText type={TextType.Italic}>
                                {userActivityForBeacon.note}
                            </AppText>
                        </View>
                    )
                }

                <SimpleIconButton iconSrc={AppIcon.Mail}
                    title={'Leave a Note'}
                    disabled={!hasUserAlreadyPrayed}
                    onClick={onNoteClick}
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

function getBeacon(incomingCursorIdx: number, completedCursorIdx: number,
    completedBeacons: EnhancedBeacon[], incomingBeacons: EnhancedBeacon[]
): EnhancedBeacon | null {
    if (incomingCursorIdx !== -1) {
        return incomingBeacons[incomingCursorIdx] || null;
    }
    if (completedCursorIdx !== -1) {
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

const { width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        margin: 12,
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
        alignItems: 'center',
    },
    section: {
        marginVertical: 4
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
        right: 380,
        height: 80,
        width: 80,
    },
    lightHouse: {
        width: 120,
        height: 120,
        opacity: 0.5,
    },
    notesSection: {
        maxHeight: 80,
        padding: 8,
    },
    timeAgo: {
        alignSelf: 'flex-end',
        marginEnd: 16,
        marginBottom: 12
    },
    modalContainer: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 18,
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    defaultNoteOptionsDiv: {
        padding: 8,
        marginHorizontal: 8,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    defaultNoteCard: {
        padding: 8,
        marginVertical: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    },
    selectedDefaultNoteCard: {
        backgroundColor: '#bbeccc'
    },
    myNoteForBeacon: {
        maxWidth: 180
    },
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
    addBeaconActivity,
    addNoteToActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristBeaconDetails);
