import { ActionStepType, AppIcon } from '@/enums/enums';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ViewProps, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { Image } from 'expo-image';
import { getAppTimeAgoText, mapActionStepTypeToIcon, mapActionStepTypeToText } from '@/utils/appUtils';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import ActionStep from '@/models/actionStep';
import { ActionStepCard } from './ActionStepCard';
import SimpleIconButton from '../common/SimpleIconButton';
import One from '@/models/one';
import { formStyles } from '@/styles/Styles';
import SelectDatePicker from '../common/SelectDatePicker';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { addActionStep, editActionSteps } from '@/redux/actions';
import DetailsSection from '../common/DetailsSection';

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

export enum PickerState {
    Launch,
    Normal,
    Adding,
    Editing,
    Removing,
    Completing
}

const ActionStepPicker = ({ selectedOne, actionSteps, addActionStep, editActionSteps }: IActionStepPicker) => {
    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Launch);
    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

    const [formActionStep, setFormActionStep] = useState<ActionStep>(ActionStep.createDefault(selectedOne?.id || ""));
    const [formSelectedTypeIdx, setFormSelectedTypeIdx] = useState(0);

    const firstActionStep = actionSteps.length > 0 ? actionSteps[0] : null;
    const selectedActionStep = selectedStepId ? actionSteps.find((step) => step.id === selectedStepId) : null;
    const selectedActionStepIndex = selectedActionStep ? actionStepTypeArray.findIndex((step) => step.value === selectedActionStep.type) : 0;

    useEffect(() => {
        if (pickerState === PickerState.Normal) {
            setSelectedStepId(null);
            setFormSelectedTypeIdx(0);
            setFormActionStep(ActionStep.createDefault(selectedOne?.id || ""));
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
        setPickerState(PickerState.Normal);
    };

    const onSaveClick = () => {
        setPickerState(PickerState.Normal);

        if (pickerState === PickerState.Removing && selectedStepId) {
            editActionSteps(
                actionSteps.filter((step) => step.id !== formActionStep.id).map((actionStep) => {
                    return {
                        ...actionStep,
                        oneId: selectedOne.id
                    };
                }
            ));
        } else if (pickerState === PickerState.Completing && selectedStepId) {
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
        } else if (pickerState === PickerState.Editing && selectedStepId) {            
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
        } else if (pickerState === PickerState.Adding) {
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
                pickerState === PickerState.Adding && (
                    <>
                        <AppText type={TextType.Default}>Type</AppText>
                        <FlatList
                            data={actionStepTypeArray}
                            renderItem={renderIcon}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.iconList}
                        />
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

    const onExpandPress = () => {
        setPickerState(pickerState === PickerState.Launch ? PickerState.Normal : PickerState.Launch);
    }

    if (pickerState === PickerState.Launch) {
        Body.push(
            <PageRow spaceEvenly style={{}}>
                {
                    firstActionStep && (
                        <DetailsSection iconSrc={mapActionStepTypeToIcon(firstActionStep.type)} 
                            prefix={getAppTimeAgoText(firstActionStep.targetDate)} 
                            title={mapActionStepTypeToText(firstActionStep.type)}/>
                    )
                }
                <SimpleIconButton iconSrc={AppIcon.ChevronDown}
                    title={'Expand'}
                    onClick={onExpandPress} />
            </PageRow>
        );
    } else if (pickerState !== PickerState.Normal) {
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
                                customStyles={ { container: { marginStart: 10, marginEnd: 10 }}}
                                title={'Add'}
                                onClick={() => setPickerState(PickerState.Adding)} />
                            <SimpleIconButton iconSrc={AppIcon.ChevronUp}
                                title={'Collapse'}
                                onClick={onExpandPress} />
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

    if (pickerState === PickerState.Launch) {
        Body.push(<></>);
    } else if (pickerState === PickerState.Normal) {
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
                <ActionStepCard actionStep={selectedActionStep} selected/>
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