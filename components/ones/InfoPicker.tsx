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
import { createOneNote, updateActionSteps, updateOneNote } from "@/requests/oneRequests";
import User from '@/models/user';
import ScrollLayout from '../common/ScrollLayout';
import AppError from '@/models/error';
import OneNote from '@/models/oneNote';
import { SimpleCard } from '../common/SimpleCard';

const oneNoteTypeArray = Object.keys(OneNoteType)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: OneNoteType[key as keyof typeof OneNoteType],
        label: mapOneNoteTypeToTitle(OneNoteType[key as keyof typeof OneNoteType]),
        details: mapOneNoteTypeToDetails(OneNoteType[key as keyof typeof OneNoteType]),
        icon: mapOneNoteTypeToAppIcon(OneNoteType[key as keyof typeof OneNoteType]),
    }));

export type IInfoPicker = ViewProps & {
    executor: User;
    selectedOne: One;
    setAppError: Function;
};

enum PickerState {
    Normal,
}

const InfoPicker = ({ executor, selectedOne, setAppError }: IInfoPicker) => {
    const isFirstRender = useRef(false);

    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);
    const [formOneNote, setFormOneNote] = useState<OneNote>(OneNote.createDefault(selectedOne?.id || ""));

    const [modalVisible, setModalVisible] = useState(false);

    const oneNotes = selectedOne?.oneNotes || [];

    useEffect(() => {
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }

        if (pickerState === PickerState.Normal) {
            setSelectedNoteId(null);
        }
    }, [pickerState]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const renderItem = ({ item }: { item: OneNote }) => {
        const isSelected = selectedNoteId === item.id;
        const handleOnPress = () => {
            if (isSelected) {
                setSelectedNoteId(null);
            } else {
                setSelectedNoteId(item.id);
            }
        };

        const handleEdit = () => {

        };

        const handleRemove = () => {

        };

        return (
            <TouchableOpacity onPress={handleOnPress}>
                <PageColumn style={[styles.noteCard, isSelected && styles.selectedNoteCard]}>
                    <AppText type={TextType.Default}>
                        {item.notes}
                    </AppText>
                    <AppText type={TextType.Body}>
                        {getAppTimeAgoText(item.date, false, true)}
                    </AppText>
                    {
                        isSelected && (
                            <PageRow style={{ gap: 16, marginTop: 20 }}>
                                <SimpleIconButton iconSrc={AppIcon.Edit} 
                                    title={'Edit'}
                                    onClick={handleEdit}/>
                                <SimpleIconButton iconSrc={AppIcon.Trash} 
                                    title={'Remove'}
                                    onClick={handleRemove}/>
                            </PageRow>
                        )
                    }
                </PageColumn>
            </TouchableOpacity>
        );
    };

    const onBackClick = () => {
        setSelectedNoteId(null);
        setPickerState(PickerState.Normal);
    };

    const onSaveClick = async () => {

        const response = adding ? await createOneNote(formOneNote) : await updateOneNote(formOneNote);
        if (response.error) {
            setAppError(new AppError('Error updating action steps: ', response.error));
            return;
        }

        setPickerState(PickerState.Normal);
        setSelectedNoteId(null);
        setFormOneNote(OneNote.createDefault(selectedOne?.id || ""));
    };

    const Body = [];

    if (pickerState === PickerState.Normal) {
        const partitionedNotes = OneNote.partitionNotes(oneNotes);

        // TODO: Add an add button here

        Body.push(
            <PageColumn>
                {Object.entries(partitionedNotes).map(([typeAsString, notesArray]) => {
                    const type = parseInt(typeAsString) || 0;
                    const title = mapOneNoteTypeToTitle(type);
                    const details = mapOneNoteTypeToDetails(type);
                    const icon = mapOneNoteTypeToAppIcon(type);

                    return (
                        <PageColumn style={{ marginBottom: 20 }}>
                            <PageRow>
                                <Image source={icon}
                                    style={[styles.icon, { marginEnd: 8 }]}
                                    contentFit="contain" />
                                <PageColumn>
                                    <AppText type={TextType.Subtitle2}>
                                        {title}
                                    </AppText>
                                    <AppText type={TextType.Body}>
                                        {details}
                                    </AppText>
                                </PageColumn>
                            </PageRow>

                            <FlatList
                                data={notesArray}
                                renderItem={renderItem}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.list}
                            />
                        </PageColumn>
                    );
                })}
            </PageColumn>
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoPicker);