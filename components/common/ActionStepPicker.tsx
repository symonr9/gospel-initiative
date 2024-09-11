import { ActionStepType, AppIcon, OneStage } from '@/enums/enums';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, ViewProps, TextInput, Picker } from 'react-native';
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
import { Action } from '@/redux/actions';

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
    setActionSteps: Function;
};

export enum ActionStepPickerState {
    Normal,
    Adding,
    Editing,
    Removing
}

const ActionStepPicker = ({ selectedOne, actionSteps, setActionSteps }: IActionStepPicker) => {
    const [pickerState, setPickerState] = useState<ActionStepPickerState>(ActionStepPickerState.Normal);
    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

    const [formActionStep, setFormActionStep] = useState<ActionStep>(ActionStep.createDefault(selectedOne.id || ""));
    const [formSelectedTypeIdx, setFormSelectedTypeIdx] = useState(0);

    const selectedActionStep = selectedStepId ? actionSteps.find((step) => step.id === selectedStepId) : null;

    useEffect(() => {
        if (pickerState === ActionStepPickerState.Normal) {
            setSelectedStepId(null);
            setFormSelectedTypeIdx(0);
            setFormActionStep(ActionStep.createDefault(selectedOne.id || ""));
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
            setSelectedStepId(isSelected ? null : item.id);
        };

        return (
            <ActionStepCard actionStep={item}
                style={isSelected && { backgroundColor: 'lightgreen' }}
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
            setActionSteps(actionSteps.length > 1 ? actionSteps.filter((step) => step.id !== selectedStepId) : []);
        } else if (pickerState === ActionStepPickerState.Editing && selectedStepId) {
            setActionSteps(actionSteps.map((step) => {
                if (step.id === selectedStepId) {
                    return { ...formActionStep };
                }
                return { ...step };
            }));
        } else if (pickerState === ActionStepPickerState.Adding) {
            setActionSteps([
                ...actionSteps,
                formActionStep
            ]);
        }
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
                <PageRow style={styles.iconCard}>
                    <Image source={item.icon} style={[styles.icon, formSelectedTypeIdx === index && styles.selected]} />
                    <AppText type={TextType.DefaultSemiBold} style={{ alignSelf: 'center' }}>{item.label}</AppText>
                </PageRow>
            </TouchableOpacity>
        );
    };

    const Form = (
        <PageColumn>
            <AppText type={TextType.Default}>Type</AppText>

            <FlatList
                data={actionStepTypeArray}
                renderItem={renderIcon}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.iconList}
            />

            <Picker
                style={[formStyles.dropdown]}
                selectedValue={formSelectedTypeIdx}
                onValueChange={(idx: number) => setFormSelectedTypeIdx(idx)}>
                {
                    actionStepTypeArray.map((item, idx) => (
                        <Picker.Item label={item.label} value={idx} key={item.value} />
                    ))
                }
            </Picker>

            <AppText type={TextType.Default}>Notes</AppText>
            <TextInput
                style={formStyles.textInput}
                placeholder="Enter note here..."
                placeholderTextColor={'gray'}
                value={formActionStep.notes}
                numberOfLines={1}
                onChangeText={(text) => setFormActionStep((prev) => ({ ...prev, notes: text }))}
            />
            <SelectDatePicker events={events}
                title={"Select Target Date"}
                onDateSelected={onDateSelected} />
        </PageColumn>
    );

    if (pickerState !== ActionStepPickerState.Normal) {
        Body.push(
            <PageRow style={styles.buttonRow}>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={onBackClick} />
                <SimpleIconButton iconSrc={AppIcon.Checkmark}
                    onClick={onSaveClick} />
            </PageRow>
        )
    } else {
        Body.push(
            <PageRow style={styles.buttonRow}>
                <SimpleIconButton iconSrc={AppIcon.Plus}
                    onClick={() => setPickerState(ActionStepPickerState.Adding)} />
                {
                    selectedStepId !== null && (
                        <>
                            <SimpleIconButton iconSrc={AppIcon.Edit}
                                onClick={() => setPickerState(ActionStepPickerState.Editing)} />
                            <SimpleIconButton iconSrc={AppIcon.Trash}
                                onClick={() => setPickerState(ActionStepPickerState.Removing)} />
                        </>
                    )
                }
            </PageRow>
        );
    }

    if (pickerState === ActionStepPickerState.Normal) {
        Body.push(
            <FlatList
                data={actionSteps}
                renderItem={renderActionStep}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.actionStepList}
            />
        );
    } else if (pickerState === ActionStepPickerState.Adding) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold}>
                    Adding new action step
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === ActionStepPickerState.Editing && selectedActionStep) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold}>
                    Editing action step
                </AppText>
                <ActionStepCard actionStep={selectedActionStep}
                    style={{ backgroundColor: 'lightgreen' }} />
                {Form}
            </View>
        );
    } else if (pickerState === ActionStepPickerState.Removing && selectedActionStep) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold}>
                    Are you sure you want to remove this action step?
                </AppText>
                <ActionStepCard actionStep={selectedActionStep}
                    style={{ backgroundColor: 'lightgreen' }} />
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
            <AppText type={TextType.DefaultSemiBold}>Action Steps</AppText>
            {Body.map((item) => item)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 6,
        padding: 16,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
        width: '99%',
    },
    actionStepList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    buttonRow: {
        gap: 24,
    },
    iconCard: {
        padding: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
        marginVertical: 8,

    },
    iconList: {
        alignItems: 'flex-start',
        maxHeight: 200,
        overflow: 'scroll',
        marginVertical: 16,
    },
    icon: {
        width: 50,
        height: 50,
        margin: 4,
        opacity: 0.4
    },
    selected: {
        opacity: 1
    },
});

export default ActionStepPicker;
