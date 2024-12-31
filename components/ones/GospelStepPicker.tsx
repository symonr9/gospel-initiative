import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View, ViewProps } from 'react-native';
import { refreshData, setAppError } from '@/redux/actions/appActions';
import { Image } from 'expo-image';
import One from '@/models/one';
import User from '@/models/user';
import GospelStep from '@/models/gospelStep';
import { calculatePercent, calculatePercentByTotals, getSelectedOne } from '@/utils/appUtils';
import { mapGospelStepTypeToIcon } from "@/utils/iconUtils";
import { mapGospelStepTypeToDetails } from "@/utils/textUtils";
import { mapGospelStepTypeToTitle } from "@/utils/textUtils";
import { GospelStepCard } from './GospelStepCard';
import AppError from '@/models/error';
import { updateGospelStep } from '@/requests/oneRequests';
import { AppIcon, GospelStepLayoutType, GospelStepType, RefreshSpec } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { AppText, TextType } from '../common/AppText';
import { SimpleConfetti } from '../common/SimpleConfetti';
import { formStyles, gridStyles, modalStyles } from '@/styles/Styles';
import { PageRow } from '../common/PageRow';
import * as Progress from 'react-native-progress';
import { SimpleButton, ButtonType } from '../common/SimpleButton';
import { SimpleKeyboardAvoidingView } from '../common/SimpleKeyboardAvoidingView';
import { MAX_LONG_TEXT_LENGTH } from '@/constants/Constants';
import { SimpleCard } from '../common/SimpleCard';


const gettingStartedSection = [GospelStepType.SpiritualConversations, GospelStepType.GospelConversations, GospelStepType.GodsExistence];
export const coreGospelMessageSection = [GospelStepType.GodsLoveForThem, GospelStepType.SeparationFromGod, GospelStepType.JesusLifeDeath, GospelStepType.SalvationByGraceThroughFaith];
const salvationSection = [GospelStepType.SalvationMoment];
const spiritualPracticesSection = [GospelStepType.Bible, GospelStepType.Prayer, GospelStepType.Worship, GospelStepType.Repentance];
const doctrineSection = [GospelStepType.Creation, GospelStepType.Heaven, GospelStepType.Trinity, GospelStepType.HolySpirit, GospelStepType.Prophets];
const nextStepsSection = [GospelStepType.Baptism, GospelStepType.Community, GospelStepType.Disciple, GospelStepType.DiscipleOthers];

const sectionThresholds = {
    existenceOfGod: true,
    coreGospelMessage: coreGospelMessageSection.length * 5,
    salvation: true,
    spiritualPractices: spiritualPracticesSection.length * 5,
    doctrine: doctrineSection.length * 5,
    nextSteps: 1,
};

export const getThreshold = (step: GospelStep) => {
    if (step.layoutType === GospelStepLayoutType.Binary) {
        return 1;
    } else if (step.layoutType === GospelStepLayoutType.Scale) {
        return 5;
    }
    return 0;
};

export type IGospelStepPicker = ViewProps & {
    selectedOneId: string | null;
    ones: One[];
    refreshData: Function;
    setAppError: Function;
};

// Only one copy of type can exist for each Gospel Step at a time.
const getGospelStepByType = (type: GospelStepType, gospelSteps: GospelStep[], selectedOneId: string | null): GospelStep => {
    return gospelSteps.find((step) => step.type === type)
        || GospelStep.createDefault(selectedOneId || "", type);
}

function GospelStepPicker({ selectedOneId, ones, refreshData, setAppError }: IGospelStepPicker) {
    const [selectedStepType, setSelectedStepType] = useState<GospelStepType | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [formNotes, setFormNotes] = useState<string | null>(null);
    const [formNextSteps, setFormNextSteps] = useState<string | null>(null);

    const [hasReadNotice1, setHasReadNotice1] = useState(false);
    const [hasReadNotice2, setHasReadNotice2] = useState(false);

    const [showGettingStartedSection, setShowGettingStartedSection] = useState(false);
    const [showCoreGospelMessageSection, setShowCoreGospelMessageSection] = useState(false);
    const [showSalvationSection, setShowSalvationSection] = useState(false);
    const [showSpiritualPracticesSection, setShowSpiritualPracticesSection] = useState(false);
    const [showDoctrineSection, setShowDoctrineSection] = useState(false);
    const [showNextStepsSection, setShowNextStepsSection] = useState(false);

    const selectedOne = getSelectedOne(selectedOneId, ones);
    const gospelSteps = selectedOne ? [...selectedOne.gospelSteps] : [];
    const selectedGospelStep = selectedStepType ? gospelSteps.find((step) => step.type === selectedStepType) : null;

    const counters = {
        conversations: 0,
        existenceOfGod: false,
        coreGospelMessage: 0,
        salvation: false,
        spiritualPractices: 0,
        doctrine: 0,
        nextSteps: 0
    };

    useEffect(() => {
        if (selectedStepType === null || !modalVisible) {
            return;
        }
        setFormNotes(selectedGospelStep?.notes || "");
        setFormNextSteps(selectedGospelStep?.nextSteps || "");
    }, [selectedStepType, modalVisible]);

    for (let i = 0; i < gospelSteps.length; i++) {
        const step = gospelSteps[i];

        if (step.type === GospelStepType.GodsExistence) {
            counters.existenceOfGod = step.rating > 1;
        }
        if (step.type === GospelStepType.SalvationMoment) {
            counters.salvation = step.rating > 1;
        }

        if (coreGospelMessageSection.includes(step.type)) {
            counters.coreGospelMessage += step.rating;
        }
        if (spiritualPracticesSection.includes(step.type)) {
            counters.spiritualPractices += step.rating;
        }
        if (doctrineSection.includes(step.type)) {
            counters.doctrine += step.rating;
        }

        if (nextStepsSection.includes(step.type)) {
            counters.nextSteps += 1;
        }
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onRatingChange = async (newStep: any) => {
        if (!selectedOneId) {
            setAppError(new AppError('Error updating gospel steps, invalid state...'));
            return;
        }

        setShowConfetti(false);

        const response = await updateGospelStep(newStep);
        if (response.error) {
            setAppError(new AppError('Error updating gospel step: ', response.error));
            return;
        }

        refreshData(RefreshSpec.Ones);
        setSelectedStepType(null);
    };

    const onTextChange = async () => {
        setModalVisible(false);
        setShowConfetti(false);

        if (!selectedOneId || selectedGospelStep === null || selectedGospelStep?.id === undefined) {
            setAppError(new AppError('Error updating gospel steps, invalid state...'));
            return;
        }

        const response = await updateGospelStep({ ...selectedGospelStep, notes: formNotes || "", nextSteps: formNextSteps || "" });
        if (response.error) {
            setAppError(new AppError('Error updating gospel step: ', response.error));
            return;
        }

        refreshData(RefreshSpec.Ones);
        setSelectedStepType(null);
        setFormNotes(null);
        setFormNextSteps(null);
    };

    const handleOnPress = (type: GospelStepType) => {
        const isSelected = selectedStepType === type;
        if (isSelected) {
            setSelectedStepType(null);
            setFormNotes(null);
            setFormNextSteps(null);
        } else {
            setSelectedStepType(type);
        }
    };

    const mapTypesToCards = (type: GospelStepType) => {
        const gospelStep = getGospelStepByType(type, gospelSteps, selectedOneId);
        return (
            <GospelStepCard gospelStep={gospelStep}
                selected={selectedStepType === gospelStep.type}
                threshold={getThreshold(gospelStep)}
                key={`gospel-step-${type}`}
                handleOnEdit={() => setModalVisible(true)}
                handleOnRatingChange={(newStep: any) => onRatingChange(newStep)}
                handleOnPress={() => handleOnPress(gospelStep.type)} />
        );
    };

    const CreateTitle = (title: string, show: boolean, setShow: Function) => (
        <TouchableOpacity onPress={() => setShow((val: boolean) => !val)}>
            <PageRow spaceBetween>
                <AppText type={TextType.Subtitle}>{title}</AppText>
                <Image source={show ? AppIcon.ChevronUp : AppIcon.ChevronDown}
                    style={{ height: 30, width: 30 }} />
            </PageRow>
        </TouchableOpacity>
    );

    const CreateProgressBar = (percent: number) => (
        <PageRow style={{ gap: 8 }}>
            <View style={{ alignSelf: 'center' }}>
                <Progress.Bar progress={percent}
                    width={250}
                    borderRadius={8} />
            </View>
            <AppText>{Math.ceil(percent * 100)}%</AppText>
        </PageRow>
    );

    const coreGospelMessagePercent = calculatePercentByTotals(counters.coreGospelMessage, sectionThresholds.coreGospelMessage);
    const spiritualPracticesPercent = calculatePercentByTotals(counters.spiritualPractices, sectionThresholds.spiritualPractices);
    const doctrinePercent = calculatePercentByTotals(counters.doctrine, sectionThresholds.doctrine);
    const nextStepsPercent = calculatePercentByTotals(counters.nextSteps, sectionThresholds.nextSteps);

    return (
        <PageColumn>
            <AppText type={TextType.Subtitle} style={styles.title}>Gospel Steps</AppText>

            {
                (!hasReadNotice1 || !hasReadNotice2) && (
                    <PageColumn style={{ gap: 16 }}>
                        <AppText>
                            Tap the reminders below to open Gospel Steps.
                        </AppText>

                        <SimpleCard iconSrc={hasReadNotice1 ? AppIcon.Checkmark : AppIcon.Pin}
                            style={[]}
                            title={'Track Gospel Sharing with those genuinely interested.'}
                            detailsView={(
                                <AppText>
                                    Use Gospel Steps to track how much you've shared key Gospel concepts with your One. It's most effective after they've shown genuine interest in learning more about faith.
                                </AppText>
                            )}
                            onClick={() => setHasReadNotice1(true)} />

                        <SimpleCard iconSrc={hasReadNotice2 ? AppIcon.Checkmark : AppIcon.Pin}
                            style={[]}
                            title={'Focus on the relationship! Share your life with them, not just the Gospel.'}
                            detailsView={(
                                <AppText>
                                    If someone isn’t actively seeking the Gospel, focus on building rapport, sharing your testimony, and listening to their story. Treat them as individuals loved by God, not as projects.
                                </AppText>
                            )}
                            onClick={() => setHasReadNotice2(true)} />
                    </PageColumn>
                )
            }

            {
                (hasReadNotice1 && hasReadNotice2) && (
                    <PageColumn style={{ gap: 12 }}>
                        <PageColumn style={[gridStyles.itemCard, styles.gospelStepCard]}>
                            {CreateTitle('Getting Started', showGettingStartedSection, setShowGettingStartedSection)}
                            {
                                showGettingStartedSection && (
                                    <PageColumn style={{ gap: 4 }}>
                                        {gettingStartedSection.map(mapTypesToCards)}
                                    </PageColumn>
                                )
                            }
                        </PageColumn>

                        <PageColumn style={[gridStyles.itemCard, styles.gospelStepCard]}>
                            {CreateTitle('The Core Gospel Message', showCoreGospelMessageSection, setShowCoreGospelMessageSection)}
                            {CreateProgressBar(coreGospelMessagePercent)}
                            {
                                showCoreGospelMessageSection && (
                                    <PageColumn style={{ gap: 4 }}>
                                        {coreGospelMessageSection.map(mapTypesToCards)}
                                    </PageColumn>
                                )
                            }
                        </PageColumn>

                        <PageColumn style={[gridStyles.itemCard, styles.gospelStepCard]}>
                            {CreateTitle('Salvation', showSalvationSection, setShowSalvationSection)}
                            {
                                showSalvationSection && (
                                    <PageColumn style={{ gap: 4 }}>
                                        {salvationSection.map(mapTypesToCards)}
                                    </PageColumn>
                                )
                            }
                        </PageColumn>

                        <PageColumn style={[gridStyles.itemCard, styles.gospelStepCard]}>
                            {CreateTitle('Spiritual Practices', showSpiritualPracticesSection, setShowSpiritualPracticesSection)}
                            {CreateProgressBar(spiritualPracticesPercent)}
                            {
                                showSpiritualPracticesSection && (
                                    <PageColumn style={{ gap: 4 }}>
                                        {spiritualPracticesSection.map(mapTypesToCards)}
                                    </PageColumn>
                                )
                            }
                        </PageColumn>

                        <PageColumn style={[gridStyles.itemCard, styles.gospelStepCard]}>
                            {CreateTitle('Doctrine', showDoctrineSection, setShowDoctrineSection)}
                            {CreateProgressBar(doctrinePercent)}
                            {
                                showDoctrineSection && (
                                    <PageColumn style={{ gap: 4 }}>
                                        {doctrineSection.map(mapTypesToCards)}
                                    </PageColumn>
                                )
                            }
                        </PageColumn>

                        <PageColumn style={[gridStyles.itemCard, styles.gospelStepCard]}>
                            {CreateTitle('Next Steps', showNextStepsSection, setShowNextStepsSection)}
                            {CreateProgressBar(nextStepsPercent)}
                            {
                                showNextStepsSection && (
                                    <PageColumn style={{ gap: 4 }}>
                                        {nextStepsSection.map(mapTypesToCards)}
                                    </PageColumn>
                                )
                            }
                        </PageColumn>
                    </PageColumn>
                )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}>
                <View style={[modalStyles.modalContainer]}>
                    <PageColumn style={[modalStyles.modalContent, { width: '90%', gap: 8 }]}>
                        {
                            selectedGospelStep && (
                                <PageRow style={{ marginHorizontal: 12, marginBottom: 8 }}>
                                    <Image source={mapGospelStepTypeToIcon(selectedGospelStep.type)} style={styles.icon} />
                                    <PageColumn>
                                        <AppText type={TextType.Subtitle}>
                                            {mapGospelStepTypeToTitle(selectedGospelStep.type)}
                                        </AppText>
                                        <AppText type={TextType.Default}>
                                            {mapGospelStepTypeToDetails(selectedGospelStep.type)}
                                        </AppText>
                                    </PageColumn>
                                </PageRow>
                            )
                        }

                        <AppText type={TextType.Subtitle3}>
                            Notes
                        </AppText>
                        <TextInput
                            style={[formStyles.multiLineTextInput, { width: '100%' }]}
                            placeholder={`Enter notes here... (Max Chars: ${MAX_LONG_TEXT_LENGTH})`}
                            placeholderTextColor={'gray'}
                            value={formNotes || ""}
                            numberOfLines={6}
                            multiline
                            maxLength={MAX_LONG_TEXT_LENGTH}
                            onChangeText={(text) => setFormNotes(text)}
                        />

                        <AppText type={TextType.Subtitle3}>
                            Next Steps
                        </AppText>
                        <TextInput
                            style={[formStyles.multiLineTextInput, { width: '100%' }]}
                            placeholder={`Enter next steps here... (Max Chars: ${MAX_LONG_TEXT_LENGTH})`}
                            placeholderTextColor={'gray'}
                            value={formNextSteps || ""}
                            numberOfLines={6}
                            multiline
                            maxLength={MAX_LONG_TEXT_LENGTH}
                            onChangeText={(text) => setFormNextSteps(text)}
                        />

                        <PageRow spaceBetween style={{ marginVertical: 16, gap: 100 }}>
                            <SimpleButton type={ButtonType.Close}
                                text={'Close'}
                                style={{ height: 40 }}
                                onPress={toggleModal} />
                            <SimpleButton type={ButtonType.Save}
                                text={'Save'}
                                style={{ height: 40 }}
                                onPress={onTextChange} />
                        </PageRow>

                        <View style={{ height: 150 }} />
                    </PageColumn>
                </View>
            </Modal>

            {
                showConfetti && <SimpleConfetti />
            }
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        paddingBottom: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2
    },
    pageHeader: {
        marginBottom: 8,
    },
    title: {
        marginBottom: 8,
    },
    actionStepList: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    gospelStepCard: {
        padding: 16
    },
    icon: {
        width: 32,
        height: 32,
        alignSelf: 'center',
        marginEnd: 12
    }
});

const mapStateToProps = (state: any) => ({
    selectedOneId: state.ones.selectedOneId,
    ones: state.ones.ones,
});


const mapDispatchToProps = {
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(GospelStepPicker);
