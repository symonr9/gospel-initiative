import { ActionStepType, AppIcon, OneStage } from '@/enums/enums';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, ViewProps, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { Image } from 'expo-image';
import { formatDateTime, mapActionStepTypeToIcon, mapActionStepTypeToText, mapStageToDetailsText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import ActionStep from '@/models/actionStep';
import { ActionStepCard } from '../ones/ActionStepCard';
import SimpleIconButton from './SimpleIconButton';
import One from '@/models/one';
import { formStyles } from '@/styles/Styles';
import SelectDatePicker from './SelectDatePicker';
import ScrollLayout from './ScrollLayout';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { addActionStep, editActionSteps } from '@/redux/actions';

const actionStepTypeArray = Object.keys(ActionStepType)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: ActionStepType[key as keyof typeof ActionStepType],
        label: mapActionStepTypeToText(ActionStepType[key as keyof typeof ActionStepType]),
        icon: mapActionStepTypeToIcon(ActionStepType[key as keyof typeof ActionStepType]),
    }));

export type IActionStepPicker = ViewProps & {
    selectedOne: One;
    actionSteps: ActionStep[];
    addActionStep: Function;
    editActionSteps: Function;
};

export enum ActionStepPickerState {
    Normal,
    Adding,
    Editing,
    Removing,
    Completing
}

const ActionStepPicker = ({ selectedOne, actionSteps, addActionStep, editActionSteps }: IActionStepPicker) => {
    const [pickerState, setPickerState] = useState<ActionStepPickerState>(ActionStepPickerState.Normal);
    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

    const [formActionStep, setFormActionStep] = useState<ActionStep>(ActionStep.createDefault(selectedOne?.id || ""));
    const [formSelectedTypeIdx, setFormSelectedTypeIdx] = useState(0);

    const selectedActionStep = selectedStepId ? actionSteps.find((step) => step.id === selectedStepId) : null;
    const selectedActionStepIndex = selectedActionStep ? actionStepTypeArray.findIndex((step) => step.value === selectedActionStep.type) : 0;

    useEffect(() => {
        if (pickerState === ActionStepPickerState.Normal) {
            setSelectedStepId(null);
            setFormSelectedTypeIdx(0);
            setFormActionStep(ActionStep.createDefault(selectedOne?.id || ""));
        } else if (pickerState === ActionStepPickerState.Editing) {
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

    const renderActionStep = ({ item }: { item: ActionStep }) => {
        const isSelected = selectedStepId === item.id;
        const handleOnPress = () => {
            if (isSelected) {
                setSelectedStepId(null);
                setFormSelectedTypeIdx(0);
                setFormActionStep(ActionStep.createDefault(selectedOne?.id || ""));
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
        setPickerState(ActionStepPickerState.Normal);
    };

    const onSaveClick = () => {
        setPickerState(ActionStepPickerState.Normal);

        if (pickerState === ActionStepPickerState.Removing && selectedStepId) {
            editActionSteps(
                actionSteps.filter((step) => step.id !== formActionStep.id).map((actionStep) => {
                    return {
                        ...actionStep,
                        oneId: selectedOne.id
                    };
                }
            ));
        } else if (pickerState === ActionStepPickerState.Completing && selectedStepId) {
            editActionSteps(
                actionSteps.map((actionStep) => {
                    if (actionStep.id === selectedStepId) {
                        return { ...actionStep, isComplete: true };
                    }
                    return {
                        ...actionStep,
                        oneId: selectedOne.id
                    };
                }
            ));
        } else if (pickerState === ActionStepPickerState.Editing && selectedStepId) {            
            editActionSteps(
                actionSteps.map((actionStep) => {
                    if (actionStep.id === formActionStep.id) {
                        return { ...formActionStep };
                    }
                    return {
                        ...actionStep,
                        oneId: selectedOne.id
                    };
                }
            ));
        } else if (pickerState === ActionStepPickerState.Adding) {
            formActionStep.oneId = selectedOne.id;
            addActionStep(formActionStep);
        }

        setSelectedStepId(null);
        setFormSelectedTypeIdx(0);
        setFormActionStep(ActionStep.createDefault(selectedOne?.id || ""));
    };

    const onDateSelected = (date: string) => {
        setFormActionStep((prev) => ({
            ...prev,
            targetDate: new Date(date)
        }));
    };

    const events = formActionStep.targetDate ? [formActionStep.targetDate] : [];

    const Body = [];

    const renderIcon = ({ item, index }: { item: { value: ActionStepType, icon: AppIcon, label: string }; index: number }) => {
        const handleIconPress = () => {
            setFormSelectedTypeIdx(index);
        };
    
        return (
            <TouchableOpacity onPress={handleIconPress}>
                <PageRow style={[styles.iconCard, formSelectedTypeIdx === index && styles.selectedIconCard]}>
                    <Image source={item.icon} style={[styles.icon, formSelectedTypeIdx === index && styles.selected]} />
                    <AppText type={TextType.DefaultSemiBold} style={{ alignSelf: 'center' }}>{item.label}</AppText>
                </PageRow>
            </TouchableOpacity>
        );
    };

    const Form = (
        <PageColumn>
            {
                pickerState === ActionStepPickerState.Adding && (
                    <>
                        <AppText type={TextType.Default}>Type</AppText>
                        <ScrollLayout style={{ height: 200 }}>
                        <FlatList
                            data={actionStepTypeArray}
                            renderItem={renderIcon}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.iconList}
                        />
                    </ScrollLayout>
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

            <PageRow style={{ width: '80%' }}>
                <SelectDatePicker events={events}
                    title={"Select Target Date"}
                    onDateSelected={onDateSelected} />
            </PageRow>
        </PageColumn>
    );

    if (pickerState !== ActionStepPickerState.Normal) {
        Body.push(
            <PageRow spaceEvenly>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    title={'Back'}
                    onClick={onBackClick} />
                <SimpleIconButton iconSrc={AppIcon.Checkmark}
                    title={'Save'}
                    onClick={onSaveClick} />
            </PageRow>
        )
    } else {
        Body.push(
            <PageRow spaceEvenly={selectedStepId !== null}>
                {
                    selectedStepId === null && (
                        <SimpleIconButton iconSrc={AppIcon.Plus}
                        customStyles={ { container: { marginStart: 10 }}}
                        title={'Add'}
                        onClick={() => setPickerState(ActionStepPickerState.Adding)} />
                    )
                }
                {
                    selectedStepId !== null && (
                        <>
                            {
                                !selectedActionStep?.isComplete && (
                                    <SimpleIconButton iconSrc={AppIcon.Checkmark}
                                        title={'Complete'}
                                        onClick={() => setPickerState(ActionStepPickerState.Completing)} />
                                )
                            }
                            <SimpleIconButton iconSrc={AppIcon.Edit}
                                title={'Edit'}
                                onClick={() => setPickerState(ActionStepPickerState.Editing)} />
                            <SimpleIconButton iconSrc={AppIcon.Trash}
                                title={'Remove'}
                                onClick={() => setPickerState(ActionStepPickerState.Removing)} />
                        </>
                    )
                }
            </PageRow>
        );
    }

    if (pickerState === ActionStepPickerState.Normal) {
        const sortedSteps = ActionStep.sortActionSteps(actionSteps);
        Body.push(
            <ScrollLayout style={{ maxHeight: 300, marginBottom: 12 }}>
                <FlatList
                    data={sortedSteps}
                    renderItem={renderActionStep}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.actionStepList}
                />
            </ScrollLayout>
        );
    } else if (pickerState === ActionStepPickerState.Adding) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Adding new action step
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === ActionStepPickerState.Editing && selectedActionStep) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Editing action step
                </AppText>
                <ActionStepCard actionStep={selectedActionStep} selected/>
                {Form}
            </View>
        );
    } else if (pickerState === ActionStepPickerState.Removing && selectedActionStep) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Are you sure you want to remove this action step?
                </AppText>
                <ActionStepCard actionStep={selectedActionStep} selected />
            </View>
        );
    } else if (pickerState === ActionStepPickerState.Completing && selectedActionStep) {
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
        flexShrink: 1
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
    iconCard: {
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
        flex: 1,
        paddingVertical: 8
    },
    selectedIconCard: {  
        backgroundColor: '#bbeccc',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    },
    iconList: {
    },
    icon: {
        width: 28,
        height: 28,
        margin: 2,
        opacity: 0.5
    },
    selected: {
        opacity: 1,
    },
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    const actionSteps = selectedOne ? selectActionStepsByOneId(state, selectedOne.id) : [];
    return {
      selectedOne,
      actionSteps,
    };
};


const mapDispatchToProps = {
    addActionStep,
    editActionSteps
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionStepPicker);