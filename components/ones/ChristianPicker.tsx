import { ActionStepType, AppIcon, OneNoteType } from '@/enums/enums';
import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ViewProps, TextInput, Modal } from 'react-native';

import { connect } from 'react-redux';
import { Image } from 'expo-image';
import { getAppTimeAgoText, mapActionStepTypeToIcon, mapActionStepTypeToTitle, mapActionStepTypeToDetails, mapOneNoteTypeToTitle, mapOneNoteTypeToDetails, mapOneNoteTypeToAppIcon, formatDateTime } from '@/utils/appUtils';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import ActionStep from '@/models/actionStep';
import { ActionStepCard } from './ActionStepCard';
import SimpleIconButton from '../common/SimpleIconButton';
import One from '@/models/one';
import { formStyles, modalStyles } from '@/styles/Styles';
import SelectDatePicker from '../common/SelectDatePicker';
import { addActionStep, editActionSteps, setAppError } from '@/redux/actions';
import DetailsSection from '../common/DetailsSection';
import { createChristian, createOneNote, removeChristian, removeOneNote, updateActionSteps, updateChristian, updateOneNote } from "@/requests/oneRequests";
import User from '@/models/user';
import ScrollLayout from '../common/ScrollLayout';
import AppError from '@/models/error';
import OneNote from '@/models/oneNote';
import { SimpleCard } from '../common/SimpleCard';
import Christian from '@/models/christian';

export type IChristianPicker = ViewProps & {
    executor: User;
    selectedOne: One;
    setAppError: Function;
};

enum PickerState {
    Normal,
    Adding,
    Editing,
    Removing,
}

const ChristianPicker = ({ executor, selectedOne, setAppError }: IChristianPicker) => {
    const isFirstRender = useRef(false);

    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);
    const [selectedChristianId, setSelectedChristianId] = useState<string | null>(null);
    const [formChristian, setFormChristian] = useState<Christian>(Christian.createDefault(selectedOne?.id || ""));
    const [modalVisible, setModalVisible] = useState(false);

    const christians = selectedOne?.christians || [];
    const selectedChristian = selectedChristianId ? christians.find((christian) => christian.id === selectedChristianId) : null;
    const adding = pickerState === PickerState.Adding;
    const removing = pickerState === PickerState.Removing;

    useEffect(() => {
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }

        if (pickerState === PickerState.Normal) {
            setSelectedChristianId(null);
            setFormChristian(Christian.createDefault(selectedOne?.id || ""));
        }
    }, [pickerState]);

    useEffect(() => {
        if (!selectedChristianId || !selectedChristian) {
            return;
        }
        setFormChristian(selectedChristian);
    }, [selectedChristianId]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const renderItem = ({ item }: { item: Christian }) => {
        const isSelected = selectedChristianId === item.id;
        const handleOnPress = () => {
            if (isSelected) {
                setSelectedChristianId(null);
                setFormChristian(Christian.createDefault(selectedOne?.id || ""));
            } else {
                setSelectedChristianId(item.id);
            }
        };

        return (
            <TouchableOpacity onPress={handleOnPress}>
                <PageColumn style={[styles.noteCard, isSelected && styles.selectedNoteCard]}>
                    <AppText type={TextType.Default}>
                        {item.notes}
                    </AppText>
                </PageColumn>
            </TouchableOpacity>
        );
    };

    const onBackClick = () => {
        setSelectedChristianId(null);
        setPickerState(PickerState.Normal);
    };

    const onSaveClick = async () => {
        let response;
        if (adding) {
            response = await createChristian(formChristian);
        } else if (removing) {
            response = await removeChristian(formChristian);
        } else {
            response = await updateChristian(formChristian);
        }
        if (response.error) {
            setAppError(new AppError('Error saving christian: ', response.error));
            return;
        }

        setPickerState(PickerState.Normal);
        setSelectedChristianId(null);
        setFormChristian(Christian.createDefault(selectedOne?.id || ""));
    };

    const Body = [];

    // TODO: Fill out this form
    
    const Form = (
        <PageColumn>

            <AppText type={TextType.Default}>Notes</AppText>
            <TextInput
                style={formStyles.textInput}
                placeholder="Enter text here..."
                placeholderTextColor={'gray'}
                value={formChristian.notes}
                numberOfLines={4}
                onChangeText={(text) => setFormChristian((prev) => ({ ...prev, notes: text }))}
            />

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
                    selectedChristianId === null && (
                        <SimpleIconButton iconSrc={AppIcon.Plus}
                            customStyles={{ container: { marginStart: 10, marginEnd: 10 } }}
                            title={'Add'}
                            onClick={() => setPickerState(PickerState.Adding)} />
                    )
                }

                {
                    selectedChristianId !== null && (
                        <>
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
        Body.push(
            <PageColumn>
                <FlatList
                    data={christians}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.iconList}
                />
            </PageColumn>
        );
    } else if (pickerState === PickerState.Adding) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Adding Christian
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Editing) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Editing Christian
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Removing && selectedChristian) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Are you sure you want to remove this Christian?
                </AppText>
                <PageColumn style={[styles.noteCard, styles.selectedNoteCard]}>
                    <AppText type={TextType.Default}>
                        {selectedChristian.notes}
                    </AppText>
                </PageColumn>
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
            <AppText type={TextType.Subtitle} style={styles.title}>Info</AppText>
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
    list: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonRow: {
    },
    noteCard: {
        backgroundColor: '#FAF7DC',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 2,
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        marginHorizontal: 10
    },
    selectedNoteCard: {
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
        width: 32,
        height: 32,
        margin: 2,
        verticalAlign: 'middle',
    },
    selected: {
        opacity: 1,
    },
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    return {
        executor: state.users.executor,
        selectedOne,
    };
};


const mapDispatchToProps = {
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(ChristianPicker);