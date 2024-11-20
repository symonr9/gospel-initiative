import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import { refreshData, setAppError } from '@/redux/actions/appActions';
import { Image } from 'expo-image';
import One from '@/models/one';
import User from '@/models/user';
import GospelStep from '@/models/gospelStep';
import { getSelectedOne } from '@/utils/appUtils';
import { GospelStepCard } from './GospelStepCard';
import AppError from '@/models/error';
import { updateGospelStep } from '@/requests/oneRequests';
import { AppIcon, GospelStepLayoutType, GospelStepType, RefreshSpec } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { AppText, TextType } from '../common/AppText';
import { SimpleConfetti } from '../common/SimpleConfetti';
import { gridStyles } from '@/styles/Styles';
import { PageRow } from '../common/PageRow';
import * as Progress from 'react-native-progress';

export type IGospelStepPicker = ViewProps & {
    selectedOneId: string | null;
    ones: One[];
    refreshData: Function;
    setAppError: Function;
};

enum PickerState {
    Normal,
    Editing,
    Completing
}

// Only one copy of type can exist for each Gospel Step at a time.
const getGospelStepByType = (type: GospelStepType, gospelSteps: GospelStep[], selectedOneId: string | null): GospelStep => {
    return gospelSteps.find((step) => step.type === type)
        || GospelStep.createDefault(selectedOneId || "", type);
}

function GospelStepPicker({ selectedOneId, ones, refreshData, setAppError }: IGospelStepPicker) {
    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);
    const [selectedStepType, setSelectedStepType] = useState<GospelStepType | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [formGospelStep, setFormGospelStep] = useState<GospelStep>(GospelStep.createDefault(selectedOneId || ""));
    const [modalVisible, setModalVisible] = useState(false);

    const [showGettingStartedSection, setShowGettingStartedSection] = useState(false);
    const [showCoreGospelMessageSection, setShowCoreGospelMessageSection] = useState(false);
    const [showSalvationSection, setShowSalvationSection] = useState(false);
    const [showSpiritualPracticesSection, setShowSpiritualPracticesSection] = useState(false);
    const [showDoctrineSection, setShowDoctrineSection] = useState(false);
    const [showNextStepsSection, setShowNextStepsSection] = useState(false);

    const selectedOne = getSelectedOne(selectedOneId, ones);
    const gospelSteps = selectedOne ? [...selectedOne.gospelSteps] : [];
    const selectedGospelStep = selectedStepType ? gospelSteps.find((step) => step.type === selectedStepType) : null;

    const gettingStartedSection = [GospelStepType.SpiritualConversations, GospelStepType.GospelConversations, GospelStepType.GodsExistence];
    const coreGospelMessageSection = [GospelStepType.GodsLoveForThem, GospelStepType.SeparationFromGod, GospelStepType.JesusLifeDeath, GospelStepType.SalvationByGraceThroughFaith];
    const salvationSection = [GospelStepType.SalvationMoment];
    const spiritualPracticesSection = [GospelStepType.Bible, GospelStepType.Prayer, GospelStepType.Worship, GospelStepType.Repentance];
    const doctrineSection = [GospelStepType.Creation, GospelStepType.Heaven, GospelStepType.Trinity, GospelStepType.HolySpirit, GospelStepType.Prophets];
    const nextStepsSection = [GospelStepType.Baptism, GospelStepType.Community, GospelStepType.Disciple, GospelStepType.DiscipleOthers];

    const counters = {
        conversations: 0,
        existenceOfGod: false,
        coreGospelMessage: 0,
        salvation: false,
        spiritualPractices: 0,
        doctrine: 0,
        nextSteps: 0
    };

    const thresholds = {
        existenceOfGod: true,
        coreGospelMessage: coreGospelMessageSection.length * 5,
        salvation: true,
        spiritualPractices: spiritualPracticesSection.length * 5,
        doctrine: doctrineSection.length * 5,
        nextSteps: nextStepsSection.length
    }

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

        if (nextStepsSection.includes(step.type) && step.rating > 1) {
            counters.nextSteps += 1;
        }
    }

    useEffect(() => {
        if (!selectedStepType || !selectedGospelStep) {
            return;
        }
        setFormGospelStep(selectedGospelStep);
    }, [selectedStepType]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onBackClick = () => {
        setSelectedStepType(null);
        setPickerState(PickerState.Normal);
    }

    const onSaveClick = async () => {
        if (!selectedOneId) {
            setAppError(new AppError('Error updating gospel steps, invalid state...'));
            return;
        }

        setPickerState(PickerState.Normal);
        setShowConfetti(false);

        const response = await updateGospelStep(formGospelStep);
        if (response.error) {
            setAppError(new AppError('Error updating gospel step: ', response.error));
            return;
        }

        refreshData(RefreshSpec.Ones);
        setSelectedStepType(null);
        setFormGospelStep(GospelStep.createDefault(selectedOneId || ""));
    };

    const handleOnPress = (type: GospelStepType) => {
        const isSelected = selectedStepType === type;
        if (isSelected) {
            setSelectedStepType(null);
            setFormGospelStep(GospelStep.createDefault(selectedOneId || ""));
        } else {
            setSelectedStepType(type);
        }
    };

    const mapTypesToCards = (type: GospelStepType) => {
        const gospelStep = getGospelStepByType(type, gospelSteps, selectedOneId);
        return (
            <GospelStepCard gospelStep={gospelStep}
                selected={selectedStepType === gospelStep.type}
                key={`gospel-step-${type}`}
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
            <AppText>{coreGospelMessagePercent * 100}%</AppText>
        </PageRow>
    );

    const coreGospelMessagePercent = counters.coreGospelMessage / thresholds.coreGospelMessage;
    const spiritualPracticesPercent = counters.spiritualPractices / thresholds.spiritualPractices;
    const doctrinePercent = counters.doctrine / thresholds.doctrine;
    const nextStepsPercent = counters.nextSteps / thresholds.nextSteps;

    return (
        <PageColumn>
            <AppText type={TextType.Subtitle} style={styles.title}>Gospel Steps</AppText>

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
