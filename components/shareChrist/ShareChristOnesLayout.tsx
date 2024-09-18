
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import One from '@/models/one';
import { AppIcon, Priority } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { selectActiveBeaconsWithActivities } from '@/redux/selectors/beaconSelectors';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import SimpleIconButton from '../common/SimpleIconButton';
import Beacon from '@/models/beacon';
import { ActiveBeaconsActivityList } from '../beacons/ActiveBeaconsActivityList';
import { addActionStep, addBeacon, addOne, editOne, setOneForm, setSelectedOne, setSelectedTemplateId, editActionSteps, setShareChristPageState } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import BeaconTemplatesList from '../beacons/BeaconTemplatesList';
import User from '@/models/user';
import BeaconTemplate from '@/models/beaconTemplate';
import { generateRandomId, getNow, getTomorrow, mapOneCategoryToIcon, mapOneCategoryToText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import ShareChristAddEditOneForm from './ShareChristAddEditOneForm';
import OneForm from '@/models/oneForm';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import ShareChristAllOnesGrid from './ShareChristAllOnesGrid';
import BeaconForm from '@/models/beaconForm';
import ActionStepPicker from '../common/ActionStepPicker';

export type IShareChristOnesLayout = ViewProps & {
    selectedOne: One | undefined,
    ones: One[],
    executor: User,
    oneForm: OneForm,
    beaconTemplates: BeaconTemplate[],
    beaconForm: BeaconForm,
    selectedTemplateId: String,
    setSelectedTemplateId: Function,
    addBeacon: Function,
    addOne: Function,
    editOne: Function,
    addActionStep: Function,
    editActionSteps: Function,
    setSelectedOne: Function
};

export enum OneLayoutType {
    Normal,
    FirstTime,
    AllOnes,
    AddingOne,
    EditingOne,
    AllBeaconTemplates,
    ConfirmBeacon,
    SentBeaconResponse,
}

function ShareChristOnesLayout({ selectedOne, ones, oneForm,
    beaconForm, selectedTemplateId,
    executor, setSelectedTemplateId, beaconTemplates, addBeacon, editOne,
    addOne, addActionStep, editActionSteps, setSelectedOne }: IShareChristOnesLayout) {
    const activeBeaconsWithActivities = useSelector(selectActiveBeaconsWithActivities(selectedOne?.id));
    const actionsStepsForSelectedOne = useSelector((state: any) => selectActionStepsByOneId(state, selectedOne?.id));

    const [message, setMessage] = useState<string | null>(null);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    const [showHeaderButtons, setShowHeaderButtons] = useState(false);

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];

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
            <ShareChristAddEditOneForm initialOneForm={OneForm.createDefault()} />
        );
    } else if (activeLayoutType === OneLayoutType.AllOnes) {
        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
            </PageRow>
        );

        BodyLayout.push(
            <ShareChristAllOnesGrid setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.EditingOne) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'} 
                    title={'Something went wrong'}/>
            );
        }

        const onSave = () => {
            const newOne = {
                ...selectedOne,
                name: oneForm.name,
                icon: oneForm.icon,
                stage: oneForm.stage,
                category: oneForm.category
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
            <ShareChristAddEditOneForm editing
                initialOneForm={initialOneForm} />
        );
    } else if (activeLayoutType === OneLayoutType.AllBeaconTemplates) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'} 
                    title={'Something went wrong'}/>
            );
        }

        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setMessage(null);
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
            </PageRow>
        );

        BodyLayout.push(
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.ConfirmBeacon) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'} 
                    title={'Something went wrong'}/>
            );
        }

        const onConfirm = () => {
            const shouldAddBeacon = selectedTemplateId != null
                && executor != null && selectedOne != null;
            if (!shouldAddBeacon) {
                console.error('Failed to add beacon, invalid state');
                return;
            }

            const selectedTemplate = beaconTemplates.find((template) => template.id === selectedTemplateId);
            if (!selectedTemplate) {
                console.error("Failed to find matching template: ", selectedTemplateId);
                return;
            } else if (!beaconForm) {
                console.error("Failed to find beacon form...");
                return;
            }

            addBeacon(
                new Beacon(
                    generateRandomId(),
                    selectedTemplate.name,
                    beaconForm.notes || null,
                    selectedOne.id,
                    Priority.Normal,
                    executor.id,
                    selectedTemplate.type,
                    getTomorrow(),
                    beaconForm.shareOneName,
                    beaconForm.shareOwnName
                )
            );

            setMessage(null);
            setSelectedTemplateId(null);
            setActiveLayoutType(OneLayoutType.SentBeaconResponse);
        };

        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.AllBeaconTemplates);
                    }}
                    title={'Back'} />
                <SimpleIconButton iconSrc={AppIcon.Checkmark}
                    onClick={onConfirm}
                    title={'Confirm'} />
            </PageRow>
        );

        BodyLayout.push(
            <BeaconTemplatesList activeLayoutType={activeLayoutType}
                setActiveLayoutType={setActiveLayoutType} />
        );
    } else if (activeLayoutType === OneLayoutType.SentBeaconResponse) {
        if (!selectedOne) {
            return (
                <PageResponse details={'Invalid page state (missing selectedOne).'} 
                    title={'Something went wrong'}/>
            );
        }

        HeaderLayout.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        setMessage(null);
                        setSelectedTemplateId(null);
                        setActiveLayoutType(OneLayoutType.Normal);
                    }}
                    title={'Back'} />
            </PageRow>
        );

        BodyLayout.push(
            <View>
                <PageResponse title={'Beacon successful!'}
                    details={'Your church community is praying for you. Please check in later.'} />
            </View>
        );
    } else { // Normal
        const idxOfSelectedOne = ones.findIndex((one) => one.id === selectedOne?.id);
        const showArrowLeft = ones.length > 1;
        const showArrowRight = ones.length > 1;

        HeaderLayout.push(
            <PageRow spaceEvenly>
                {
                    showArrowLeft && (
                        <SimpleIconButton iconSrc={AppIcon.ArrowLeft}
                            disabled={idxOfSelectedOne === 0}
                            onClick={() => {
                                setMessage(null);
                                setSelectedOne(ones[idxOfSelectedOne - 1]);
                            }} />
                    )
                }

                <SimpleIconButton iconSrc={AppIcon.Plus}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.AddingOne);
                    }}
                    title={'New One'} />

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

                <SimpleIconButton iconSrc={AppIcon.Prayer}
                    onClick={() => {
                        setMessage(null);
                        setActiveLayoutType(OneLayoutType.AllBeaconTemplates);
                    }}
                    title={'New Beacon'} />

                {
                    showArrowRight && (
                        <SimpleIconButton iconSrc={AppIcon.ArrowRight}
                            disabled={idxOfSelectedOne === ones.length - 1}
                            onClick={() => {
                                setMessage(null);
                                setSelectedOne(ones[idxOfSelectedOne + 1])
                            }} />
                    )
                }
            </PageRow>
        );

        BodyLayout.push(
            <View>
                <ActiveBeaconsActivityList activeBeaconsWithActivities={activeBeaconsWithActivities} />
                {
                    selectedOne && (
                        <ActionStepPicker/>
                    )
                }

                {/* <OneFactsList /> */}
            </View>
        );
    }

    const showYourSelectedOne = ![OneLayoutType.AddingOne, OneLayoutType.EditingOne, OneLayoutType.AllOnes].includes(activeLayoutType) && selectedOne;

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <PageColumn>
                    {
                        showYourSelectedOne && (
                            <PageRow>
                                <PageRow>
                                    <SimpleIcon iconSrc={selectedOne.icon} large />
                                    <AnimatedHeader title={selectedOne.name}
                                        style={{ alignItems: 'flex-start', marginStart: 8 }}
                                        subtitle='Your One' />
                                </PageRow>
                                {
                                    activeLayoutType === OneLayoutType.Normal && (
                                        <>
                                            <SimpleIconButton iconSrc={showHeaderButtons ? AppIcon.NavUp : AppIcon.NavDown}
                                                small
                                                title={showHeaderButtons ? 'Hide' : 'More'}
                                                customStyles={{ container: { marginStart: 16 } }}
                                                onClick={() => setShowHeaderButtons(val => !val)} />

                                            {
                                                ones.length > 0 && (
                                                    <SimpleIconButton iconSrc={AppIcon.UserGroup}
                                                    small
                                                    title={'All'}
                                                    customStyles={{ container: { marginStart: 16 } }}
                                                    onClick={() => setActiveLayoutType(OneLayoutType.AllOnes)} />
                                                )
                                            }
                                        </>
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
        gap: 4,
    },
    headerRow: {
        height: 70,
        marginBottom: 12
    },
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    return {
        selectedOne,
        shareChristPageState: state.app.shareChristPageState,
        ones: state.ones.ones,
        executor: state.users.executor,
        oneForm: state.ones.oneForm,
        beaconForm: state.beacons.beaconForm,
        selectedTemplateId: state.beacons.selectedTemplateId,
        beaconTemplates: state.beacons.beaconTemplates,
    };
};

const mapDispatchToProps = {
    setSelectedTemplateId,
    setShareChristPageState,
    addBeacon,
    addOne,
    editOne,
    addActionStep,
    editActionSteps,
    setSelectedOne
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristOnesLayout);