
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import One from '@/models/one';
import { AppIcon, Priority } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import SimpleIconButton from '../common/SimpleIconButton';
import { addActionStep, addBeacon, addOne, editOne, setOneForm, setSelectedOne, setSelectedTemplateId, editActionSteps } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import User from '@/models/user';
import { generateRandomId, getNow, getTomorrow, mapOneCategoryToIcon, mapOneCategoryToText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import AddEditOneForm from './AddEditOneForm';
import OneForm from '@/models/oneForm';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import ActionStepPicker from './ActionStepPicker';
import GospelChecklist from './GospelChecklist';

export type IOnesLayout = ViewProps & {
    selectedOne: One | undefined,
    ones: One[],
    executor: User,
    oneForm: OneForm,
    addOne: Function,
    editOne: Function,
    addActionStep: Function,
    editActionSteps: Function,
    setSelectedOne: Function
};

export enum OneLayoutType {
    Normal,
    FirstTime,
    AddingOne,
    EditingOne,
    AllBeaconTemplates,
    ConfirmBeacon,
    SentBeaconResponse,
}

function OnesLayout({ selectedOne, ones, oneForm, executor, editOne,
    addOne, addActionStep, editActionSteps, setSelectedOne }: IOnesLayout) {
    const actionsStepsForSelectedOne = useSelector((state: any) => selectActionStepsByOneId(state, selectedOne?.id));

    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    const [showHeaderButtons, setShowHeaderButtons] = useState(false);

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];

    useEffect(() => {
        if (!executor) {
            return;
        }
        setActiveLayoutType(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    }, [executor]);

    useEffect(() => {
        if (activeLayoutType !== OneLayoutType.Normal) {
            setShowHeaderButtons(true);
            return;
        }
    }, [activeLayoutType]);

    if (activeLayoutType === OneLayoutType.FirstTime) {
        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.Plus}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.AddingOne);
                    }}
                    title={'New One'} />
            </PageRow>
        );

        BodyLayout.push(
            <PageRow>
                <PageResponse title={'Welcome'}
                    details={'Please add your One to get started.'} />
            </PageRow>
        );
    } else if (activeLayoutType === OneLayoutType.AddingOne) {
        const onSave = () => {
            const newOneId = generateRandomId();

            const newOne = new One(
                newOneId,
                oneForm.name,
                oneForm.icon,
                oneForm.stage,
                oneForm.category,
                getNow(),
                [],
                false,
                executor.id
            );

            addOne(newOne);

            for (let actionStep of oneForm.actionSteps) {
                actionStep.oneId = newOneId;
                addActionStep(actionStep);
            }

            setSelectedOne(newOne);
            setOneForm(OneForm.createDefault());
            setMessage("Your One has been successfully created!");
            setActiveLayoutType(OneLayoutType.Normal);
        };

        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Save}
                    onClick={onSave}
                    title={'Save'} />
            </PageRow>
        );

        BodyLayout.push(
            <AddEditOneForm initialOneForm={OneForm.createDefault()} />
        );
    } else if (activeLayoutType === OneLayoutType.EditingOne) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'}
                    title={'Something went wrong'} />
            );
        }

        const onSave = () => {
            const newOne = {
                ...selectedOne,
                name: oneForm.name,
                icon: oneForm.icon,
                stage: oneForm.stage,
                category: oneForm.category,
                gospelChecklist: oneForm.gospelChecklist
            };

            editOne(newOne);

            editActionSteps(
                oneForm.actionSteps.map((actionStep) => ({
                    ...actionStep,
                    oneId: selectedOne.id
                })),
                selectedOne.id,
            );

            setSelectedOne(newOne);
            setOneForm(OneForm.createDefault());
            setMessage("Your One has been successfully updated!");
            setActiveLayoutType(OneLayoutType.Normal);
        };

        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Save}
                    onClick={onSave}
                    title={'Save'} />
            </PageRow>
        );

        const initialOneForm = OneForm.createFromOne(selectedOne, actionsStepsForSelectedOne);
        BodyLayout.push(
            <AddEditOneForm editing
                initialOneForm={initialOneForm} />
        );
    } else { // Normal
        const idxOfSelectedOne = ones.findIndex((one) => one.id === selectedOne?.id);
        const showArrowLeft = ones.length > 1;
        const showArrowRight = ones.length > 1;

        HeaderLayout.push(
            <PageRow spaceEvenly>
                {
                    showArrowLeft && (
                        <SimpleIconButton iconSrc={AppIcon.ChevronLeft}
                            disabled={idxOfSelectedOne === 0}
                            title={'Back'}
                            small
                            onClick={() => {
                                setMessage(null);
                                setSelectedOne(ones[idxOfSelectedOne - 1]);
                            }} />
                    )
                }

                {
                    selectedOne && (
                        <SimpleIconButton iconSrc={AppIcon.Pencil}
                            onClick={() => {
                                setMessage(null);
                                setActiveLayoutType(OneLayoutType.EditingOne);
                            }}
                            title={'Edit'} />
                    )
                }

                {
                    showArrowRight && (
                        <SimpleIconButton iconSrc={AppIcon.ChevronRight}
                            disabled={idxOfSelectedOne === ones.length - 1}
                            title={'Next'}
                            small
                            onClick={() => {
                                setMessage(null);
                                setSelectedOne(ones[idxOfSelectedOne + 1])
                            }} />
                    )
                }
            </PageRow>
        );

        BodyLayout.push(
            <PageColumn style={{ gap: 16 }}>
                {
                    selectedOne && (
                        <>
                            <ActionStepPicker />
                            <GospelChecklist/>
                        </>
                    )
                }

                {/* <OneFactsList /> */}
            </PageColumn>
        );
    }

    const showYourSelectedOne = ![OneLayoutType.AddingOne, OneLayoutType.EditingOne, OneLayoutType.AllOnes].includes(activeLayoutType) && selectedOne;

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <PageColumn>
                    {
                        showYourSelectedOne && (
                            <PageRow spaceBetween>
                                <PageRow>
                                    <SimpleIcon iconSrc={selectedOne.icon} large />
                                    <AnimatedHeader title={selectedOne.name}
                                        style={{ alignItems: 'flex-start', marginStart: 8 }}
                                        subtitle='Your One' />
                                </PageRow>
                                {
                                    activeLayoutType === OneLayoutType.Normal && (
                                        <PageRow style={{ marginEnd: 12 }}>
                                            <SimpleIconButton iconSrc={showHeaderButtons ? AppIcon.ChevronUp : AppIcon.ChevronDown}
                                                small
                                                title={showHeaderButtons ? 'Hide' : 'More'}
                                                customStyles={{}}
                                                onClick={() => setShowHeaderButtons(val => !val)} />
                                        </PageRow>
                                    )
                                }
                            </PageRow>
                        )
                    }

                    <PageRow style={styles.headerRow}>
                        {
                            selectedOne && activeLayoutType === OneLayoutType.Normal && !showHeaderButtons && (
                                <Animated.View entering={FadeInDown.duration(200)}
                                    exiting={FadeOutDown.duration(200)}>
                                    <PageRow>
                                        <DetailsSection iconSrc={mapStageToIcon(selectedOne.stage)}
                                            prefix={"Stage"}
                                            style={{ marginRight: 16 }}
                                            title={mapStageToText(selectedOne.stage)} />

                                        <DetailsSection iconSrc={mapOneCategoryToIcon(selectedOne.category)}
                                            prefix={"Category"}
                                            title={mapOneCategoryToText(selectedOne.category)} />
                                    </PageRow>
                                </Animated.View>
                            )
                        }

                        {
                            (activeLayoutType !== OneLayoutType.Normal || showHeaderButtons) && (
                                <Animated.View entering={FadeInDown.duration(200).delay(50)}
                                    style={{ width: '100%' }}
                                    exiting={FadeOutDown.duration(200)}>
                                    {HeaderLayout.map((item) => item)}
                                </Animated.View>
                            )
                        }
                    </PageRow>
                </PageColumn>

                {
                    message && (
                        <AnimatedBanner iconSrc={AppIcon.Info} text={message} onClick={() => setMessage(null)} />
                    )
                }

                {BodyLayout.map((item) => item)}
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
    headerRow: {
        height: 70,
        marginBottom: 20
    },
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    return {
        selectedOne,
        ones: state.ones.ones,
        executor: state.users.executor,
        oneForm: state.ones.oneForm,
    };
};

const mapDispatchToProps = {
    addOne,
    editOne,
    addActionStep,
    editActionSteps,
    setSelectedOne
};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);