import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, type ViewProps, TouchableOpacity, Button, TextInput, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { AppText, TextType } from '../common/AppText';
import { EnhancedBeacon } from '@/models/beacon';
import { AppIcon, FadeDirection, RefreshSpec } from '@/enums/enums';
import { getAppTimeAgoText, mapStageToText, mapStageToIcon, mapBeaconTypeToTitleText, mapBeaconTypeToAppIcon, mapBeaconTagToTitleText, mapBeaconTagToDetailsText } from '@/utils/appUtils';
import SimpleIconButton from '../common/SimpleIconButton';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { AnimatedElement } from '../common/AnimatedElement';
import { setAppError, refreshData } from '@/redux/actions';
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
import { SimpleGridCard } from '../common/SimpleGridCard';
import { formStyles, gridStyles, modalStyles } from '@/styles/Styles';
import { ButtonType, SimpleButton } from '../common/SimpleButton';
import { Colors } from '@/constants/Colors';
import { MAX_NORMAL_TEXT_LENGTH } from '@/constants/Constants';

export type IBeaconDetails = ViewProps & {
    incomingCursorIdx: number;
    completedCursorIdx: number;
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];

    executor: User;
    beaconActivities: BeaconActivity[];

    setActiveBeaconId?: Function;
    refreshData: Function;
    setAppError: Function;
};

function BeaconDetails({ incomingCursorIdx, completedCursorIdx,
    completedBeacons, incomingBeacons, executor, refreshData,
    setActiveBeaconId, beaconActivities, setAppError }: IBeaconDetails) {

    const beacon = getBeacon(incomingCursorIdx, completedCursorIdx, completedBeacons, incomingBeacons);
    const userActivityForBeacon = beaconActivities.find((activity) => activity.userId === executor.id && activity.beaconId === beacon?.id);
    const hasUserAlreadyPrayed = userActivityForBeacon !== undefined;

    const [isModalVisible, setModalVisible] = useState(false);
    const [showBeaconTags, setShowBeaconTags] = useState(true);
    const [selectedNoteIdx, setSelectedNoteIdx] = useState(0);
    const [customNote, setCustomNote] = useState('');

    const progress = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.white, Colors.success]
        );

        return {
            backgroundColor,
        };
    });

    if (!beacon || (incomingCursorIdx === -1 && completedCursorIdx === -1)) {
        const hasCompleted = incomingBeacons.length === 0;
        if (hasCompleted) {
            return (
                <View style={styles.container}>
                    <AnimatedHeader title='All Beacons Completed'
                        titleType={TextType.Subtitle3}
                        subtitle='Please check back later for new beacons.' />

                    <PageColumn style={{ height: 400 }}>
                        <FlatList
                            data={completedBeacons}
                            renderItem={({ item }) => {
                                const title = getTitleText(item) || 'Prayer';
                                const onClick = () => {
                                    if (setActiveBeaconId) {
                                        setActiveBeaconId(item.id);
                                    }
                                }
                                return (
                                    <SimpleGridCard iconSrc={item.userIcon}
                                        onClick={onClick}
                                        title={item.shareOwnName ? `Prayed for ${item.userName}` : `Prayed for a friend`}
                                        subtitle={title} />
                                );
                            }}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={gridStyles.itemList}
                        />
                    </PageColumn>
                </View>
            );
        }

        // Needed for styling.
        return (
            <View style={styles.invisibleContainer}>
                <Image source={AppIcon.Prayer}
                    tintColor={Colors.light.darkAlternative}
                    style={{
                        marginVertical: 8,
                        height: 120,
                        width: 120,
                        alignSelf: 'center',
                    }} />
            </View>
        );
    }

    const { message, userName, userIcon, oneName, oneIcon, oneStage, activeUntil, tags, completedActivities, shareOwnName } = beacon;
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
        <PageRow spaceEvenly style={[{}]}>
            <DetailsSection iconSrc={mapStageToIcon(oneStage)}
                prefix={"Their One is..."}
                title={mapStageToText(oneStage)} />
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

        refreshData(RefreshSpec.Beacons);
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

        refreshData(RefreshSpec.Beacons);
    };

    const beaconTagArray = tags ? tags
        .map((tag, index) => ({
            value: tag,
            title: mapBeaconTagToTitleText(tag),
            details: mapBeaconTagToDetailsText(tag),
        })) : [];

    return (
        <ScrollLayout style={[styles.container, animatedStyle]}>
            <Modal
                transparent={true}
                animationType='slide'
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <AppText type={TextType.Subtitle}>Select a note:</AppText>

                        {(ActivityNoteOptions[selectedNoteIdx] || '') === 'Custom' && (
                            <TextInput
                                style={formStyles.textInput}
                                placeholder={`Enter custom note... (Max Chars: ${MAX_NORMAL_TEXT_LENGTH})`}
                                placeholderTextColor={'lightgray'}
                                value={customNote}
                                maxLength={MAX_NORMAL_TEXT_LENGTH}
                                onChangeText={setCustomNote}
                            />
                        )}

                        <ScrollLayout style={{ height: 300 }}>
                            <View style={styles.defaultNoteOptionsDiv}>
                                {
                                    ActivityNoteOptions.map((value, idx) => (
                                        <TouchableOpacity onPress={() => setSelectedNoteIdx(idx)}>
                                            <View style={[gridStyles.itemCard, selectedNoteIdx === idx && gridStyles.selected]}>
                                                <AppText type={TextType.Default}>
                                                    {value}
                                                </AppText>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </ScrollLayout>

                        <PageRow center style={{ gap: 64 }}>
                            <SimpleButton text={'Close'}
                                onPress={() => setModalVisible(false)}
                                type={ButtonType.Close} />
                            <SimpleButton text={'Save'}
                                onPress={onSaveClick}
                                type={ButtonType.Save} />
                        </PageRow>
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
                        <PageColumn>
                            <Image source={userIcon} style={styles.profileIcon} />
                            {
                                shareOwnName && (
                                    <AppText type={TextType.Subtitle3}
                                        style={{ alignSelf: 'center' }}>
                                        {userName}
                                    </AppText>
                                )
                            }
                        </PageColumn>
                    } delay={300} direction={FadeDirection.Left} />
                    <AnimatedElement element={
                        <Image source={mapBeaconTypeToAppIcon(beacon.type)}
                            style={[styles.profileIcon, { width: 42, height: 42 }]} />
                    } delay={900} direction={FadeDirection.Up} />
                    <AnimatedElement element={
                        <PageColumn>
                            <Image source={oneIcon} style={styles.profileIcon} />
                            <AppText style={{ alignSelf: 'center' }}>
                                Their One
                            </AppText>
                        </PageColumn>
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
                        rows.map((row, index) => (row))
                    }
                </PageColumn>

            } delay={800} style={styles.detailsContainer} />


            {
                (hasUserAlreadyPrayed && userActivityForBeacon.note?.length > 0) && (
                    <PageColumn style={styles.myNoteForBeacon}>
                        <AppText type={TextType.Body}>
                            Your Note:
                        </AppText>
                        <AppText type={TextType.Default}>
                            {userActivityForBeacon.note}
                        </AppText>
                    </PageColumn>
                )
            }

            {
                showBeaconTags && (
                    <AnimatedElement element={
                        <PageColumn style={{ maxHeight: 130 }}>
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
                        </PageColumn>
                    } delay={200} direction={FadeDirection.Up} style={{ marginVertical: 12 }} />
                )
            }

            <PageRow spaceEvenly style={{ marginBottom: 8 }}>
                {
                    beaconTagArray?.length > 0 && (
                        <SimpleIconButton iconSrc={AppIcon.Tag}
                            title={showBeaconTags ? 'Hide Tags' : 'Show Tags'}
                            onClick={() => setShowBeaconTags(val => !val)}
                            customStyles={customPrayButtonStyles} />
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
        </ScrollLayout>
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 370,
        flexDirection: 'column',
        padding: 12,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 10
    },
    invisibleContainer: {
        height: 310,
        padding: 12,
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
        marginVertical: 8,
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
    timeAgo: {
        alignSelf: 'flex-end',
        marginEnd: 16,
        marginBottom: 4
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
    defaultNoteOptionsDiv: {
        padding: 8,
        marginHorizontal: 8,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    myNoteForBeacon: {
        maxWidth: 350,
        flexShrink: 1,
        marginTop: 6,
        marginBottom: 12
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
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconDetails);
