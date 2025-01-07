import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, type ViewProps, TouchableOpacity, Button, TextInput, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { AppText, TextType } from '../common/AppText';
import Beacon, { EnhancedBeacon } from '@/models/beacon';
import { AppIcon, FadeDirection, RefreshSpec } from '@/enums/enums';
import { getAppTimeAgoText } from '@/utils/appUtils';
import { mapGlobalBeaconTypeToIcon } from "@/utils/iconUtils";
import { mapGlobalBeaconTypeToDetailsText } from "@/utils/textUtils";
import { mapGlobalBeaconTypeToTitleText } from "@/utils/textUtils";
import { mapBeaconTypeToTitleText } from "@/utils/textUtils";
import { mapBeaconTypeToIcon } from "@/utils/iconUtils";
import { mapBeaconTagToDetailsText } from "@/utils/textUtils";
import { mapBeaconTagToTitleText } from "@/utils/textUtils";
import { mapOneCategoryToIcon } from "@/utils/iconUtils";
import { mapOneCategoryToTitle } from "@/utils/textUtils";
import { mapOneStageToIcon } from "@/utils/iconUtils";
import { mapOneStageToTitle } from "@/utils/textUtils";
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
import LoadingLayout from '../common/LoadingLayout';
import { halfScreenWidth, screenHeight, screenWidth } from '@/constants/Dimensions';

export type IBeaconDetails = ViewProps & {
    incomingCursorIdx: number;
    completedCursorIdx: number;
    completedBeacons: EnhancedBeacon[];
    incomingBeacons: EnhancedBeacon[];
    activeBeacons: Beacon[];

    executor: User;
    beaconActivities: BeaconActivity[];

    setActiveBeaconId?: Function;
    refreshData: Function;
    setAppError: Function;
};

function BeaconDetails({ incomingCursorIdx, completedCursorIdx,
    completedBeacons, incomingBeacons, executor, refreshData,
    setActiveBeaconId, beaconActivities, setAppError, activeBeacons }: IBeaconDetails) {

    const beacon = getBeacon(incomingCursorIdx, completedCursorIdx, completedBeacons, incomingBeacons);
    const userActivityForBeacon = beaconActivities.find((activity) => activity.userId === executor.id && activity.beaconId === beacon?.id);
    const hasUserAlreadyPrayed = userActivityForBeacon !== undefined;

    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        if (!executor) {
            return;
        }

        progress.value = withTiming(0, { duration: 250 });
    }, [incomingCursorIdx, completedCursorIdx]);

    useEffect(() => {
        setLoading(false);
    }, [completedBeacons, incomingBeacons]);

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
                                const title = getSubtitleText(item) || 'Prayer';
                                const onClick = () => {
                                    if (setActiveBeaconId) {
                                        setActiveBeaconId(item.id);
                                    }
                                }
                                return (
                                    <SimpleGridCard iconSrc={item.userIcon}
                                        onClick={onClick}
                                        title={item.shareOwnName ? `Prayed for ${item.userName || 'a Beacon'}` : `Prayed for a friend`}
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
            console.error('Failed to get note.');
            return;
        }

        setLoading(true);

        const newActivity = {
            ...userActivityForBeacon,
            global: beacon.global,
            note: note
        };

        const response = await updateBeaconActivity(newActivity);
        if (response.error) {
            setLoading(false);
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
        setLoading(true);

        const newActivity = BeaconActivity.createBeaconActivity(
            "",
            executor,
            beacon
        );

        const response = await createBeaconActivity(newActivity);
        if (response.error) {
            setLoading(false);
            setAppError(new AppError('Error creating beacon activity: ', response.error));
            return;
        }

        refreshData(RefreshSpec.Beacons);
    };

    const beaconTagArray = beacon.tags ? beacon.tags.map((tag, index) => ({
        value: tag,
        title: mapBeaconTagToTitleText(tag),
        details: mapBeaconTagToDetailsText(tag),
    })) : [];

    const showName = beacon.userName && beacon.shareOwnName && !beacon.global;
    const userIcon = beacon.global ? null : beacon.userIcon;
    const oneIcon = beacon.oneIcon ? beacon.oneIcon : null;

    const icon = beacon.global ? mapGlobalBeaconTypeToIcon(beacon.globalType) : mapBeaconTypeToIcon(beacon.type);
    const title = beacon.global ? mapGlobalBeaconTypeToTitleText(beacon.globalType) : beacon.name;
    const subtitle = beacon.global ? mapGlobalBeaconTypeToDetailsText(beacon.globalType) : getSubtitleText(beacon);

    return (
        <ScrollLayout style={[styles.container, animatedStyle]}>
            <Modal
                transparent={true}
                animationType='slide'
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}>
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
                {
                    beacon.activeUntil && (
                        <View style={styles.timeAgo}>
                            <AppText type={TextType.Italic}>
                                Expires {getAppTimeAgoText(beacon.activeUntil)}
                            </AppText>
                        </View>
                    )
                }

                {
                    beacon.global && (
                        <View style={styles.timeAgo}>
                            <AppText type={TextType.Italic}>
                                Global Beacon
                            </AppText>
                        </View>
                    )
                }

                <PageRow style={[{ gap: 12, marginTop: 8 }]}>
                    {
                        userIcon && (
                            <AnimatedElement element={
                                <PageColumn>
                                    <Image source={userIcon} style={styles.profileIcon} />
                                    {
                                        showName && (
                                            <AppText type={TextType.Subtitle3}
                                                style={{ alignSelf: 'center' }}>
                                                {beacon.userName}
                                            </AppText>
                                        )
                                    }
                                </PageColumn>
                            } delay={300} direction={FadeDirection.Left} />
                        )
                    }

                    <AnimatedElement element={
                        <Image source={icon}
                            style={[styles.profileIcon, beacon.global ? { width: 60, height: 60 } : { width: 42, height: 42 }]} />
                    } delay={beacon.global ? 0 : 600} direction={FadeDirection.Up} />

                    {
                        oneIcon && (
                            <AnimatedElement element={
                                <PageColumn>
                                    <Image source={oneIcon} style={styles.profileIcon} />
                                    <AppText style={{ alignSelf: 'center' }}>
                                        Their One
                                    </AppText>
                                </PageColumn>
                            } delay={500} direction={FadeDirection.Right} />
                        )
                    }
                </PageRow>
                <AnimatedHeader title={title}
                    subtitle={subtitle}
                    delay={400}
                    style={{ textAlign: 'center' }} />
            </View>

            <PageRow spaceEvenly style={{ gap: 8, marginTop: 8 }}>
                <PageColumn style={{}}>
                    {
                        ((beacon.oneCategory && beacon.oneStage) || beacon.global) && (
                            <AnimatedElement element={
                                <PageRow spaceEvenly style={[{ gap: 8 }]}>
                                    {
                                        beacon.oneCategory && (
                                            <DetailsSection iconSrc={mapOneCategoryToIcon(beacon.oneCategory)}
                                                prefix={"Their One is a..."}
                                                title={mapOneCategoryToTitle(beacon.oneCategory)} />
                                        )
                                    }

                                    {
                                        (beacon.oneCategory && beacon.oneStage) && (
                                            <View style={{ backgroundColor: Colors.info, width: 2 }} />
                                        )
                                    }

                                    {
                                        beacon.oneStage && (
                                            <DetailsSection iconSrc={mapOneStageToIcon(beacon.oneStage)}
                                                prefix={"Their One is..."}
                                                title={mapOneStageToTitle(beacon.oneStage)} />
                                        )
                                    }

                                    {
                                        beacon.global && (
                                            <DetailsSection iconSrc={AppIcon.UserGroup}
                                                prefix={"Total who have prayed"}
                                                title={`${beacon.completedActivities?.length || 0}`} />
                                        )
                                    }
                                </PageRow>
                            } delay={300} style={styles.detailsContainer} />
                        )
                    }

                    {
                        loading && <LoadingLayout />
                    }

                    {
                        (!loading && hasUserAlreadyPrayed && userActivityForBeacon.note?.length > 0) && (
                            <PageColumn style={styles.myNoteForBeacon}>
                                <AppText type={TextType.Body}>
                                    Your Note:
                                </AppText>
                                <PageRow style={{ flexShrink: 1, width: halfScreenWidth }}>
                                    <AppText type={TextType.Default}>
                                        {userActivityForBeacon.note}
                                    </AppText>
                                </PageRow>
                            </PageColumn>
                        )
                    }

                    {
                        showBeaconTags && (
                            <AnimatedElement element={
                                <FlatList
                                    data={beaconTagArray}
                                    keyExtractor={(item) => item.value.toString()}
                                    renderItem={({ item }) => (
                                        <PageChip
                                            title={item.title}
                                            subtitle={item.details}
                                            style={{ marginBottom: 12, flexShrink: 1, width: halfScreenWidth }}
                                        />
                                    )}
                                />
                            } delay={200} direction={FadeDirection.Up} style={{ marginVertical: 12 }} />
                        )
                    }
                </PageColumn>

                <PageColumn style={{ gap: 12 }}>
                    {
                        beaconTagArray?.length > 0 && (
                            <SimpleIconButton iconSrc={AppIcon.Tag}
                                title={showBeaconTags ? 'Hide Tags' : 'Show Tags'}
                                onClick={() => setShowBeaconTags(val => !val)}
                                customStyles={customPrayButtonStyles} />
                        )
                    }

                    <SimpleIconButton iconSrc={AppIcon.Mail}
                        title={'Give Note'}
                        disabled={!hasUserAlreadyPrayed}
                        onClick={onNoteClick}
                        customStyles={customPrayButtonStyles} />
                    <SimpleIconButton iconSrc={AppIcon.Prayer}
                        title={'Pray'}
                        disabled={hasUserAlreadyPrayed}
                        onClick={onPrayClick}
                        customStyles={customPrayButtonStyles} />
                </PageColumn>
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

function getSubtitleText(beacon: EnhancedBeacon): string | undefined {
    if (beacon.global && beacon.globalType !== null) {
        return mapGlobalBeaconTypeToTitleText(beacon.globalType);
    }
    return mapBeaconTypeToTitleText(beacon.type, beacon.shareOwnName, beacon.userName);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: screenHeight - 420,
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
        height: screenHeight - 470,
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
        maxWidth: halfScreenWidth,
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
    activeBeacons: state.beacons.activeBeacons
});

const mapDispatchToProps = {
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconDetails);
