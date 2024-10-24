
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import One from '@/models/one';
import { AppIcon, GospelChecklistItem } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleIcon } from '../common/SimpleIcon';
import SimpleIconButton from '../common/SimpleIconButton';
import { addActionStep, editOne, setOneForm, setSelectedOne, editActionSteps, setAppError, refreshData, addOne } from '@/redux/actions';
import PageResponse from '../common/PageResponse';
import User from '@/models/user';
import { calculatePercent, getAppTimeAgoText, getNow, isBeaconActive, mapActionStepTypeToIcon, mapActionStepTypeToText, mapOneCategoryToIcon, mapOneCategoryToText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import AddEditOneForm from './AddEditOneForm';
import OneForm from '@/models/oneForm';
import { selectActionStepsByOneId, selectActiveBeaconsByOneId, selectActiveBeaconsByUserId, selectPartitionedActiveEnhancedBeacons } from '@/redux/selectors';
import { AnimatedBanner } from '../common/AnimatedBanner';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import ActionStepPicker from './ActionStepPicker';
import GospelChecklist from './GospelChecklist';
import { createOne, updateOne } from '@/requests/Requests';
import AllOnesGrid from './AllOnesGrid';
import BeaconPicker from './BeaconPicker';
import { SimpleGridCard } from '../common/SimpleGridCard';
import ActionStep from '@/models/actionStep';
import Beacon from '@/models/beacon';

const gospelChecklistItems = Object.keys(GospelChecklistItem)
    .filter(key => isNaN(Number(key)))
    .map((item) => ({ value: GospelChecklistItem[item as keyof typeof GospelChecklistItem] }));

export type IOnesLayout = ViewProps & {
    selectedOne: One | undefined,
    ones: One[],
    actionSteps: ActionStep[],
    oneBeacons: Beacon[],
    executor: User,
    oneForm: OneForm,
    addOne: Function,
    editOne: Function,
    addActionStep: Function,
    editActionSteps: Function,
    setAppError: Function,
    refreshData: Function,
    setSelectedOne: Function
};

enum BodyType {
    Base,
    ActionStep,
    GospelChecklist,
    Beacons
};

export enum OneLayoutType {
    Normal,
    FirstTime,
    AddingOne,
    EditingOne,
    AllOnes,
    AllBeaconTemplates,
    ConfirmBeacon,
    SentBeaconResponse,
}

function OnesLayout({ selectedOne, ones, addOne, oneForm, executor, editOne,
    setAppError, oneBeacons, refreshData, actionSteps, setSelectedOne }: IOnesLayout) {
    const actionsStepsForSelectedOne = useSelector((state: any) => selectActionStepsByOneId(state, selectedOne?.id));

    const [message, setMessage] = useState<string | null>(null);
    const [bodyType, setBodyType] = useState(BodyType.Base);
    const [activeLayoutType, setActiveLayoutType] = useState(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);

    const firstActionStep = actionSteps.length > 0 ? actionSteps[0] : null;

    const HeaderLayout: any[] = [];
    const BodyLayout: any[] = [];

    useEffect(() => {
        if (!executor) {
            return;
        }
        setActiveLayoutType(ones.length > 0 ? OneLayoutType.Normal : OneLayoutType.FirstTime);
    }, [executor]);

    if (activeLayoutType === OneLayoutType.FirstTime) {
        BodyLayout.push(
            <PageRow>
                <PageResponse title={'Welcome'}
                    details={'Please add your One on the Overview page to get started.'} />
            </PageRow>
        );
    } else if (activeLayoutType === OneLayoutType.AddingOne) {
        const onSave = async () => {
            const newOne = new One(
                "",
                oneForm.name,
                oneForm.icon,
                oneForm.stage,
                oneForm.category,
                getNow(),
                [],
                false,
                executor.id
            );

            try {
                const response = await createOne(newOne);
                if (response.error) {
                    setAppError(new Error('Error adding one: ', response.error));
                    return;
                }

                addOne(response);
                setSelectedOne(response);
                setOneForm(OneForm.createDefault());
                setMessage("Your One has been successfully created!");
                setActiveLayoutType(OneLayoutType.Normal);
            } catch (err: any) {
                setAppError(new Error('Error adding one: ', err));
            }
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

        const onSave = async () => {
            const updatedOne = {
                ...selectedOne,
                name: oneForm.name,
                icon: oneForm.icon,
                stage: oneForm.stage,
                category: oneForm.category,
                gospelChecklist: oneForm.gospelChecklist
            };

            try {
                const response = await updateOne(updatedOne);
                if (response.error) {
                    setAppError(new Error('Error updating one: ', response.error));
                    return;
                }

                editOne(response);
                setSelectedOne(response);
                setOneForm(OneForm.createDefault());
                setMessage("Your One has been successfully updated!");
                setActiveLayoutType(OneLayoutType.Normal);
            } catch (err: any) {
                setAppError(new Error('Error updating one: ', err));
            }
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
            <AllOnesGrid setActiveLayoutType={setActiveLayoutType} />
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

        if (selectedOne) {
            const BodyBackHeader = (
                <PageRow style={{ marginBottom: 8, marginHorizontal: 4 }}>
                    <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                        title={'Back'}
                        onClick={() => setBodyType(BodyType.Base)} />
                </PageRow>
            );

            if (bodyType === BodyType.ActionStep) {
                BodyLayout.push(
                    <PageColumn>
                        {BodyBackHeader}
                        <ActionStepPicker />
                    </PageColumn>
                );
            } else if (bodyType === BodyType.GospelChecklist) {
                BodyLayout.push(
                    <PageColumn>
                        {BodyBackHeader}
                        <GospelChecklist />
                    </PageColumn>
                );
            } else if (bodyType === BodyType.Beacons) {
                BodyLayout.push(
                    <PageColumn>
                        {BodyBackHeader}
                        <BeaconPicker />
                    </PageColumn>
                );
            } else { // Base
                let actionStepsDetailView = <></>;
                if (firstActionStep) {
                    actionStepsDetailView = (
                        <>
                            <DetailsSection iconSrc={mapActionStepTypeToIcon(firstActionStep.type)}
                                prefix={getAppTimeAgoText(firstActionStep.targetDate)}
                                onClick={() => setBodyType(BodyType.ActionStep)}
                                title={mapActionStepTypeToText(firstActionStep.type)} />
                        </>
                    );
                } else {
                    actionStepsDetailView = (<View />);
                }

                const selectedOneItems = Array.from(new Set(selectedOne.gospelChecklist)); // Set removes dupes.
                const completedPercentage = calculatePercent(selectedOneItems, gospelChecklistItems.map((item) => item.value));
                const gospelChecklistDetailView = (
                    <>
                        <DetailsSection iconSrc={AppIcon.Book}
                            prefix={"Gospel Shared"}
                            onClick={() => setBodyType(BodyType.GospelChecklist)}
                            title={`${completedPercentage}% shared`} />
                    </>
                );

                const beaconsDetailText = oneBeacons.length === 1 ? 'Active Beacon' : 'Active Beacons';
                const beaconsDetailView = (
                    <>
                        <DetailsSection iconSrc={AppIcon.Star}
                            prefix={beaconsDetailText}
                            onClick={() => setBodyType(BodyType.Beacons)}
                            title={oneBeacons.length} />
                    </>
                );

                BodyLayout.push(
                    <PageColumn>
                        <SimpleGridCard iconSrc={AppIcon.LightBulb}
                            title={'Action Steps'}
                            detailsView={actionStepsDetailView}
                            onClick={() => setBodyType(BodyType.ActionStep)} />
                        <SimpleGridCard iconSrc={AppIcon.Book}
                            title={'Gospel Checklist'}
                            detailsView={gospelChecklistDetailView}
                            onClick={() => setBodyType(BodyType.GospelChecklist)} />
                        <SimpleGridCard iconSrc={AppIcon.Prayer}
                            title={'Prayer Beacons'}
                            detailsView={beaconsDetailView}
                            onClick={() => setBodyType(BodyType.Beacons)} />
                    </PageColumn>
                );
            }
        }
    }

    const showYourSelectedOne = ![OneLayoutType.AddingOne, OneLayoutType.EditingOne, OneLayoutType.AllOnes].includes(activeLayoutType) && selectedOne;

    return (
        <ScrollLayout>
            <View style={styles.container}>
                {
                    message && (
                        <AnimatedBanner iconSrc={AppIcon.Info} text={message} onClick={() => setMessage(null)} />
                    )
                }

                <PageColumn>
                    {
                        showYourSelectedOne && (
                            <PageRow spaceBetween>
                                <PageColumn style={{ gap: 12 }}>
                                    <PageRow>
                                        <SimpleIcon iconSrc={selectedOne.icon} large />
                                        <AnimatedHeader title={selectedOne.name}
                                            style={{ alignItems: 'flex-start', marginStart: 8 }}
                                            subtitle='Your One' />
                                    </PageRow>
                                    {
                                        selectedOne && activeLayoutType === OneLayoutType.Normal && (
                                            <PageRow style={styles.headerRow}>
                                                <Animated.View entering={FadeInDown.duration(200)}
                                                    exiting={FadeOutDown.duration(200)}>
                                                    <PageRow style={{ marginStart: 12, gap: 12 }}>
                                                        <DetailsSection iconSrc={mapStageToIcon(selectedOne.stage)}
                                                            prefix={"Stage"}
                                                            style={{ marginRight: 16 }}
                                                            title={mapStageToText(selectedOne.stage)} />

                                                        <DetailsSection iconSrc={mapOneCategoryToIcon(selectedOne.category)}
                                                            prefix={"Category"}
                                                            title={mapOneCategoryToText(selectedOne.category)} />
                                                    </PageRow>
                                                </Animated.View>
                                            </PageRow>
                                        )
                                    }

                                    {HeaderLayout.map((item) => item)}
                                </PageColumn>

                                {
                                    activeLayoutType === OneLayoutType.Normal && (
                                        <PageColumn style={{ gap: 8 }} center>
                                            {
                                                ones.length > 1 && (
                                                    <SimpleIconButton iconSrc={AppIcon.UserGroup}
                                                        title={'All'}
                                                        small
                                                        onClick={() => setActiveLayoutType(OneLayoutType.AllOnes)} />
                                                )
                                            }

                                            <SimpleIconButton iconSrc={AppIcon.Plus}
                                                small
                                                onClick={() => {
                                                    setMessage(null);
                                                    setActiveLayoutType(OneLayoutType.AddingOne);
                                                }}
                                                title={'Add New'} />

                                            {
                                                selectedOne && (
                                                    <SimpleIconButton iconSrc={AppIcon.Pencil}
                                                        small
                                                        onClick={() => {
                                                            setMessage(null);
                                                            setActiveLayoutType(OneLayoutType.EditingOne);
                                                        }}
                                                        title={'Edit'} />
                                                )
                                            }
                                        </PageColumn>
                                    )
                                }
                            </PageRow>
                        )
                    }

                    {
                        !showYourSelectedOne && (
                            <>
                                {HeaderLayout.map((item) => item)}
                            </>
                        )
                    }
                </PageColumn>

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
    const executor = state.users.executor;
    const selectedOne = state.ones.selectedOne;
    const actionSteps = selectedOne ? selectActionStepsByOneId(state, selectedOne.id) : [];
    const oneBeacons = selectedOne ? state.beacons.beacons.filter((beacon: any) => {
        return beacon.oneId === selectedOne.id && isBeaconActive(beacon)
    }) : [];
    return {
        selectedOne,
        actionSteps,
        oneBeacons,
        ones: state.ones.ones,
        executor,
        oneForm: state.ones.oneForm,

    };
};

const mapDispatchToProps = {
    addOne,
    editOne,
    addActionStep,
    editActionSteps,
    setSelectedOne,
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);