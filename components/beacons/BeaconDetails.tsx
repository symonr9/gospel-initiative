import React, { useState } from 'react';
import { StyleSheet, View, Modal, type ViewProps, TouchableOpacity, Button, TextInput, Dimensions, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { AppText, TextType } from '../common/AppText';
import { EnhancedBeacon } from '@/models/beacon';
import { AppIcon, FadeDirection } from '@/enums/enums';
import { getAppTimeAgoText, mapStageToText, mapStageToIcon, mapBeaconTypeToTitleText, mapBeaconTypeToAppIcon, mapBeaconTagToTitleText, mapBeaconTagToDetailsText } from '@/utils/appUtils';
import SimpleIconButton from '../common/SimpleIconButton';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { AnimatedElement } from '../common/AnimatedElement';
import { addNoteToActivity, addBeaconActivity, setAppError } from '@/redux/actions';
import User from '@/models/user';
import BeaconActivity from '@/models/beaconActivity';
import { PageRow } from '../common/PageRow';
import { ActivityNoteOptions } from '@/constants/Strings';
import { PageColumn } from '../common/PageColumn';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import { updateBeaconActivity } from "@/requests/beaconRequests";
import { createBeaconActivity } from "@/requests/beaconRequests";
import { PageChip } from '../common/PageChip';
import AppError from '@/models/error';

export type IBeaconDetails = ViewProps & {
    incomingCursorIdx: number;
    completedCursorIdx: number;
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];

    executor: User;
    beaconActivities: BeaconActivity[];

    addNoteToActivity: Function;
    addBeaconActivity: Function;
    setAppError: Function;
};

function BeaconDetails({ incomingCursorIdx, completedCursorIdx,
    completedBeacons, incomingBeacons, executor, addBeaconActivity, addNoteToActivity,
    beaconActivities, setAppError }: IBeaconDetails) {

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
        const hasCompleted = incomingBeacons.length === 0;
        if (hasCompleted) {
            return (
                <View style={[]}>
                    <AnimatedHeader title='All Beacons Completed!'
                        subtitle='Please check back later for new beacons.' />
                </View>
            );
        }

        // Needed for styling.
        return (
            <View></View>
        );
    }

    const { message, userName, userIcon, oneName, oneIcon, oneStage, activeUntil, tags, completedActivities } = beacon;
    if (!userName || !userIcon || !oneName || !oneIcon || !oneStage || !activeUntil || !completedActivities) {
        console.error("Missing props for beacon...");
        return <></>;
    }

    const titleText = getTitleText(beacon);
    if (!titleText) {
        console.error("missing title...");
        return <></>;
    }

    const rows = [];
    rows.push(
        <PageRow spaceEvenly style={[styles.section, {}]}>
            <DetailsSection iconSrc={mapStageToIcon(oneStage)} 
                        prefix={"Their One is..."}
                        style={{ marginRight: 24 }}
                        title={mapStageToText(oneStage)} />

            <DetailsSection iconSrc={AppIcon.UserGroup} 
                            prefix={"Completed Prayers"} 
                            title={completedActivities.length} />
        </PageRow>
    );

    const onNoteClick = () => {
        setModalVisible(true);
    };

    const onSaveClick = async () => {
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

        const newActivity = {
            ...userActivityForBeacon,
            note: note
        };

        const response = await updateBeaconActivity(newActivity);
        if (response.error) {
            setAppError(new AppError('Error updating beacon activity: ', response.error));
            return;
        }

        addNoteToActivity(response.id, response.note);
        setCustomNote('');
        setSelectedNoteIdx(0);
    };

    const onPrayClick = async () => {
        if (hasUserAlreadyPrayed) {
            return;
        }

        progress.value = withTiming(1, { duration: 250 });

        const newActivity = BeaconActivity.createBeaconActivity(
            "",
            executor,
            beacon
        );

        const response = await createBeaconActivity(newActivity);
        if (response.error) {
            setAppError(new AppError('Error creating beacon activity: ', response.error));
            return;
        }

        addBeaconActivity(response);
    };

    const beaconTagArray = tags ? tags
        .map((tag, index) => ({
            value: tag,
            title: mapBeaconTagToTitleText(tag),
            details: mapBeaconTagToDetailsText(tag),
        })) : [];

    return (
        <View style={[styles.container, animatedStyle]}>
            <Modal
                transparent={true}
                animationType='slide'
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
                        Expires {getAppTimeAgoText(activeUntil)}
                    </AppText>
                </View>

                <PageRow style={[{ gap: 12 }]}>
                    <AnimatedElement element={
                        <Image source={userIcon} style={styles.profileIcon} />
                    } delay={300} direction={FadeDirection.Left} />
                    <AnimatedElement element={
                        <Image source={mapBeaconTypeToAppIcon(beacon.type)}
                            style={[styles.profileIcon, { width: 42, height: 42 }]} />
                    } delay={900} direction={FadeDirection.Up} />
                    <AnimatedElement element={
                        <Image source={oneIcon} style={styles.profileIcon} />
                    } delay={600} direction={FadeDirection.Right} />
                </PageRow>
                <AnimatedHeader title={beacon.name}
                    subtitle={titleText}
                    delay={600}
                    style={{ textAlign: 'center' }} />
                
                {
                    beaconTagArray.length > 0 && (
                            <AnimatedElement element={
                                <ScrollLayout style={{ maxHeight: 150 }}>
                                <FlatList
                                    data={beaconTagArray}
                                    keyExtractor={(item) => item.value.toString()}
                                    renderItem={({ item }) => (
                                        <PageChip
                                            title={item.title}
                                            subtitle={item.details}
                                            style={{ marginBottom: 12 }}
                                        />
                                    )}
                                />
                            </ScrollLayout>
                        } delay={900} direction={FadeDirection.Up} style={{ marginVertical: 12 }}/>
                    )
                }
            </View>

            <AnimatedElement element={
                <PageColumn>
                    {
                        rows.map((row, index) => (row))
                    }
                </PageColumn>

            } delay={800} style={styles.detailsContainer} />

            <PageRow spaceEvenly>
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
            </PageRow>
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
    const { userName, oneName, activeUntil, type, shareOwnName } = beacon;
    if (!userName || !oneName || !activeUntil) {
        return undefined;
    }

    return mapBeaconTypeToTitleText(type, shareOwnName, userName, oneName);
}

const { width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 40
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
        marginVertical: 12,
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

    }
}

const mapStateToProps = (state: any) => ({
    executor: state.users.executor,
    beaconActivities: state.activities.beaconActivities,
});

const mapDispatchToProps = {
    addBeaconActivity,
    addNoteToActivity,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconDetails);
