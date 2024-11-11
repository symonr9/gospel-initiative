import { ActionStepType, AppIcon, RefreshSpec } from '@/enums/enums';
import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ViewProps, TextInput, Modal } from 'react-native';

import { connect } from 'react-redux';
import { Image } from 'expo-image';
import { mapActionStepTypeToIcon, mapActionStepTypeToTitle, mapActionStepTypeToDetails, getSelectedOne } from '@/utils/appUtils';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import ActionStep from '@/models/actionStep';
import { ActionStepCard } from './ActionStepCard';
import SimpleIconButton from '../common/SimpleIconButton';
import One from '@/models/one';
import { formStyles, modalStyles } from '@/styles/Styles';
import SelectDatePicker, { DatePickerVariation } from '../common/SelectDatePicker';
import { refreshData, setAppError } from '@/redux/actions';
import { updateActionSteps } from "@/requests/oneRequests";
import User from '@/models/user';
import ScrollLayout from '../common/ScrollLayout';
import AppError from '@/models/error';

const actionStepTypeArray = Object.keys(ActionStepType)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: ActionStepType[key as keyof typeof ActionStepType],
        label: mapActionStepTypeToTitle(ActionStepType[key as keyof typeof ActionStepType]),
        details: mapActionStepTypeToDetails(ActionStepType[key as keyof typeof ActionStepType]),
        icon: mapActionStepTypeToIcon(ActionStepType[key as keyof typeof ActionStepType]),
    }));

export type IActionStepPicker = ViewProps & {
    executor: User;
    selectedOneId: string | null;
    ones: One[];
    refreshData: Function;
    setAppError: Function;
};

export enum PickerState {
    Normal,
    Adding,
    Editing,
    Removing,
    Completing
}

const ActionStepPicker = ({ executor, selectedOneId, ones, refreshData, setAppError }: IActionStepPicker) => {
    const isFirstRender = useRef(false);

    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);
    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

    const [formActionStep, setFormActionStep] = useState<ActionStep>(ActionStep.createDefault(selectedOneId || ""));
    const [formSelectedTypeIdx, setFormSelectedTypeIdx] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);

    const selectedOne = getSelectedOne(selectedOneId, ones);
    const actionSteps = selectedOne?.actionSteps || [];
    const selectedActionStep = selectedStepId ? actionSteps.find((step) => step.id === selectedStepId) : null;
    const selectedActionStepIndex = selectedActionStep ? actionStepTypeArray.findIndex((step) => step.value === selectedActionStep.type) : 0;
    const selectedActionStepTypeData = actionStepTypeArray[formSelectedTypeIdx];

    useEffect(() => {
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }

        if (pickerState === PickerState.Normal) {
            setSelectedStepId(null);
            setFormSelectedTypeIdx(0);
            setFormActionStep(ActionStep.createDefault(selectedOneId || ""));
        } else if (pickerState === PickerState.Editing) {
            setFormSelectedTypeIdx(selectedActionStepIndex);
        }
    }, [pickerState]);

    useEffect(() => {
        if (!selectedStepId || !selectedActionStep) {
            return;
        }
        setFormActionStep(selectedActionStep);
    }, [selectedStepId]);

    useEffect(() => {
        setFormActionStep((prev) => ({ ...prev, type: actionStepTypeArray[formSelectedTypeIdx].value }));
    }, [formSelectedTypeIdx]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const renderActionStep = ({ item }: { item: ActionStep }) => {
        const isSelected = selectedStepId === item.id;
        const handleOnPress = () => {
            if (isSelected) {
                setSelectedStepId(null);
                setFormSelectedTypeIdx(0);
                setFormActionStep(ActionStep.createDefault(selectedOneId || ""));
            } else {
                setSelectedStepId(item.id);
            }
        };

        return (
            <ActionStepCard actionStep={item}
                selected={isSelected}
                handleOnPress={handleOnPress} />
        );
    };

    const onBackClick = () => {
        setSelectedStepId(null);
        setPickerState(PickerState.Normal);
    };

    const onSaveClick = async () => {
        if (!selectedOneId) {
            setAppError(new AppError('Error updating action steps, invalid state...'));
            return;
        }

        setPickerState(PickerState.Normal);

        let newActionSteps = actionSteps;
        if (pickerState === PickerState.Removing && selectedStepId) {
            newActionSteps = actionSteps.filter((step) => step.id !== formActionStep.id).map((actionStep) => {
                return {
                    ...actionStep,
                    oneId: selectedOneId
                };
            });
        } else if (pickerState === PickerState.Completing && selectedStepId) {
            newActionSteps = actionSteps.map((actionStep) => {
                if (actionStep.id === selectedStepId) {
                    return { ...actionStep, isComplete: true };
                }
                return {
                    ...actionStep,
                    oneId: selectedOneId
                };
            });
        } else if (pickerState === PickerState.Editing && selectedStepId) {
            newActionSteps = actionSteps.map((actionStep) => {
                if (actionStep.id === formActionStep.id) {
                    return { ...formActionStep };
                }
                return {
                    ...actionStep,
                    oneId: selectedOneId
                };
            });
        } else if (pickerState === PickerState.Adding) {
            formActionStep.oneId = selectedOneId;
            newActionSteps.push(formActionStep);
        }

        await updateActionSteps(newActionSteps, selectedOneId).then((response) => {
            if (response.error) {
                setAppError(new AppError('Error updating action steps: ', response.error));
                return;
            }
    
            refreshData(RefreshSpec.Ones);
            setSelectedStepId(null);
            setFormSelectedTypeIdx(0);
            setFormActionStep(ActionStep.createDefault(selectedOneId || ""));
        });
    };

    const onDateSelected = (date: Date) => {
        setFormActionStep((prev) => ({
            ...prev,
            targetDate: date
        }));
    };

    const events = formActionStep.targetDate ? [formActionStep.targetDate] : [];

    const Body = [];

    const renderTypeItem = ({ item, index }: { item: { value: ActionStepType, icon: AppIcon, label: string, details: string }; index: number }) => {
        const handlePress = () => {
            setFormSelectedTypeIdx(index);
        };

        return (
            <TouchableOpacity onPress={handlePress}>
                <PageRow style={[modalStyles.card, formSelectedTypeIdx === index && modalStyles.selectedCard]}>
                    <Image source={item.icon} style={[modalStyles.icon, formSelectedTypeIdx === index && modalStyles.selected]} />
                    <PageColumn style={{ marginStart: 8, width: 250 }}>
                        <AppText type={TextType.DefaultSemiBold} style={{}}>{item.label}</AppText>
                        <AppText type={TextType.Italic} style={{ }}>{item.details}</AppText>
                    </PageColumn>
                </PageRow>
            </TouchableOpacity>  
        );
    };

    const Form = (
        <PageColumn>
            {
                pickerState === PickerState.Adding && (
                    <>
                        <PageColumn style={{ marginHorizontal: 8 }}>
                            <AppText type={TextType.DefaultSemiBold}>Type</AppText>
                            <View>
                                {selectedActionStepTypeData ? (
                                    <>
                                        <TouchableOpacity onPress={toggleModal}>
                                            <PageRow style={[modalStyles.card]}>
                                                <Image source={selectedActionStepTypeData.icon} style={[modalStyles.icon, modalStyles.selected]} />
                                                <PageColumn style={{ marginStart: 8, width: 250 }}>
                                                    <AppText type={TextType.DefaultSemiBold} style={{}}>{selectedActionStepTypeData.label}</AppText>
                                                    <AppText type={TextType.Italic} style={{}}>{selectedActionStepTypeData.details}</AppText>
                                                </PageColumn>
                                            </PageRow>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <AppText type={TextType.DefaultSemiBold}>None Selected</AppText>
                                )}
                            </View>
                            <TouchableOpacity onPress={toggleModal} 
                                style={[modalStyles.editButton, { width: 100, alignSelf: 'center' }]}>
                                <AppText>Edit Type</AppText>
                            </TouchableOpacity>
                        </PageColumn>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={toggleModal}
                        >
                            <View style={modalStyles.modalContainer}>
                                <View style={[modalStyles.modalContent, { width: '90%' }]}>
                                    <AppText type={TextType.DefaultSemiBold} style={modalStyles.modalTitle}>
                                        Select a Category
                                    </AppText>

                                    <ScrollLayout style={{ maxHeight: 300 }}>
                                        <FlatList
                                            data={actionStepTypeArray}
                                            renderItem={renderTypeItem}
                                            numColumns={1}
                                            keyExtractor={(item, index) => index.toString()}
                                            contentContainerStyle={modalStyles.iconList}
                                        />
                                    </ScrollLayout>
                                    <TouchableOpacity
                                        style={modalStyles.closeButton}
                                        onPress={toggleModal}
                                    >
                                        <AppText>Close</AppText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </>
                )
            }

            <AppText type={TextType.Default}>Notes</AppText>
            <TextInput
                style={formStyles.textInput}
                placeholder="Enter note here..."
                placeholderTextColor={'gray'}
                value={formActionStep.notes}
                numberOfLines={1}
                onChangeText={(text) => setFormActionStep((prev) => ({ ...prev, notes: text }))}
            />

            <PageRow style={{ alignSelf: 'center' }}>
                <SelectDatePicker events={events}
                    variation={DatePickerVariation.Goal}
                    onDateSelected={onDateSelected} />
            </PageRow>
        </PageColumn>
    );

    if (pickerState !== PickerState.Normal) {
        Body.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    title={'Back'}
                    onClick={onBackClick} />
                <SimpleIconButton iconSrc={AppIcon.Checkmark}
                    title={'Save'}
                    onClick={onSaveClick} />
            </PageRow>
        );
    } else {
        Body.push(
            <PageRow spaceEvenly>
                {
                    selectedStepId === null && (
                        <>
                            <SimpleIconButton iconSrc={AppIcon.Plus}
                                customStyles={{ container: { marginStart: 10, marginEnd: 10 } }}
                                title={'Add'}
                                onClick={() => setPickerState(PickerState.Adding)} />
                        </>
                    )
                }
                {
                    selectedStepId !== null && (
                        <>
                            {
                                !selectedActionStep?.isComplete && (
                                    <SimpleIconButton iconSrc={AppIcon.Checkmark}
                                        title={'Complete'}
                                        onClick={() => setPickerState(PickerState.Completing)} />
                                )
                            }
                            <SimpleIconButton iconSrc={AppIcon.Edit}
                                title={'Edit'}
                                onClick={() => setPickerState(PickerState.Editing)} />
                            <SimpleIconButton iconSrc={AppIcon.Trash}
                                title={'Remove'}
                                onClick={() => setPickerState(PickerState.Removing)} />
                        </>
                    )
                }
            </PageRow>
        );
    }

    if (pickerState === PickerState.Normal) {
        const sortedSteps = ActionStep.sortActionSteps(actionSteps);
        Body.push(
            <FlatList
                data={sortedSteps}
                renderItem={renderActionStep}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.actionStepList}
            />
        );
    } else if (pickerState === PickerState.Adding) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Adding new action step
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Editing && selectedActionStep) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Editing action step
                </AppText>
                <ActionStepCard actionStep={selectedActionStep} selected />
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Removing && selectedActionStep) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Are you sure you want to remove this action step?
                </AppText>
                <ActionStepCard actionStep={selectedActionStep} selected />
            </View>
        );
    } else if (pickerState === PickerState.Completing && selectedActionStep) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Complete action?
                </AppText>
                <ActionStepCard actionStep={selectedActionStep} selected />
            </View>
        );
    } else {
        Body.push(
            <View>
                <AppText type={TextType.Body}>
                    Weird state!
                </AppText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AppText type={TextType.Subtitle} style={styles.title}>Action Steps</AppText>
            {Body.map((item) => item)}
        </View>
    );
};

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
    buttonRow: {
    },
});

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
        selectedOneId: state.ones.selectedOneId,
        ones: state.ones.ones,
    };
};


const mapDispatchToProps = {
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionStepPicker);