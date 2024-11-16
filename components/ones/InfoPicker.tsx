import { AppIcon, OneNoteType, OneStage, RefreshSpec } from '@/enums/enums';
import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ViewProps, TextInput, Modal, Button } from 'react-native';

import { connect } from 'react-redux';
import { Image } from 'expo-image';
import { getAppTimeAgoText, mapOneNoteTypeToTitle, mapOneNoteTypeToDetails, mapOneNoteTypeToAppIcon, getSelectedOne, mapOneCategoryToIcon, mapOneCategoryToText, mapStageToIcon, mapStageToText, mapStageToDetailsText } from '@/utils/appUtils';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';
import One from '@/models/one';
import { formStyles, modalStyles } from '@/styles/Styles';
import { refreshData, setAppError } from '@/redux/actions';
import { createOneNote, removeOneNote, updateOneNote } from "@/requests/oneRequests";
import User from '@/models/user';
import ScrollLayout from '../common/ScrollLayout';
import AppError from '@/models/error';
import OneNote from '@/models/oneNote';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import DetailsSection from '../common/DetailsSection';

const oneNoteTypeArray = Object.keys(OneNoteType)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: OneNoteType[key as keyof typeof OneNoteType],
        label: mapOneNoteTypeToTitle(OneNoteType[key as keyof typeof OneNoteType]),
        details: mapOneNoteTypeToDetails(OneNoteType[key as keyof typeof OneNoteType]),
        icon: mapOneNoteTypeToAppIcon(OneNoteType[key as keyof typeof OneNoteType]),
    }));

const stageArray = [
    OneStage.Hostile,
    OneStage.Hurt,
    OneStage.Apathetic,
    OneStage.Friendly,
    OneStage.Curious,
    OneStage.Seeking,
    OneStage.NewBeliever,
    OneStage.Disciple,
].map((value: OneStage) => ({
    stage: value,
    icon: mapStageToIcon(value),
    label: mapStageToText(value),
    details: mapStageToDetailsText(value)
}));

export type IInfoPicker = ViewProps & {
    executor: User;
    selectedOneId: string | null;
    ones: One[];
    refreshData: Function;
    setAppError: Function;
};

enum PickerState {
    Normal,
    Adding,
    Editing,
    Removing,
}

const InfoPicker = ({ executor, selectedOneId, ones, refreshData, setAppError }: IInfoPicker) => {
    const isFirstRender = useRef(false);

    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [formOneNote, setFormOneNote] = useState<OneNote>(OneNote.createDefault(selectedOneId || ""));
    const [formSelectedTypeIdx, setFormSelectedTypeIdx] = useState(0);

    const [isNoteTypeModalVisible, setIsNoteTypeModalVisible] = useState(false);
    const [isStageModalVisible, setIsStageModalVisible] = useState(false);

    const selectedOne = getSelectedOne(selectedOneId, ones);
    const oneNotes = selectedOne ? [...selectedOne.oneNotes] : [];
    const selectedNote = selectedNoteId ? oneNotes.find((note) => note.id === selectedNoteId) : null;
    const selectedNoteTypeIndex = selectedNote ? oneNoteTypeArray.findIndex((note) => note.value === selectedNote.type) : 0;
    const selectedOneNoteTypeData = oneNoteTypeArray[formSelectedTypeIdx];
    const adding = pickerState === PickerState.Adding;
    const removing = pickerState === PickerState.Removing;

    useEffect(() => {
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }

        if (pickerState === PickerState.Normal) {
            setSelectedNoteId(null);
            setFormSelectedTypeIdx(0);
            setFormOneNote(OneNote.createDefault(selectedOneId || ""));
        } else if (pickerState === PickerState.Editing) {
            setFormSelectedTypeIdx(selectedNoteTypeIndex);
        }
    }, [pickerState]);

    useEffect(() => {
        if (!selectedNoteId || !selectedNote) {
            return;
        }
        setFormOneNote(selectedNote);
    }, [selectedNoteId]);

    useEffect(() => {
        setFormOneNote((prev) => ({ ...prev, type: oneNoteTypeArray[formSelectedTypeIdx].value }));
    }, [formSelectedTypeIdx]);

    const toggleNoteTypeModal = () => {
        setIsNoteTypeModalVisible(!isNoteTypeModalVisible);
    };

    const renderItem = ({ item }: { item: OneNote }) => {
        const isSelected = selectedNoteId === item.id;
        const handleOnPress = () => {
            if (isSelected) {
                setSelectedNoteId(null);
                setFormSelectedTypeIdx(0);
                setFormOneNote(OneNote.createDefault(selectedOneId || ""));
            } else {
                setSelectedNoteId(item.id);
            }
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
                </PageColumn>
            </TouchableOpacity>
        );
    };

    const onBackClick = () => {
        setSelectedNoteId(null);
        setPickerState(PickerState.Normal);
    };

    const onSaveClick = async () => {
        let response;
        if (adding) {
            await createOneNote(formOneNote).then((response) => {
                handleResponse(response);
            });
        } else if (removing) {
            await removeOneNote(formOneNote).then((response) => {
                handleResponse(response);
            });
        } else {
            await updateOneNote(formOneNote).then((response) => {
                handleResponse(response);
            });
        }
    };

    const handleResponse = async (response: any) => {
        if (response.error) {
            setAppError(new AppError('Error saving note: ', response.error));
            return;
        }
        refreshData(RefreshSpec.Ones);
        setPickerState(PickerState.Normal);
        setSelectedNoteId(null);
        setFormSelectedTypeIdx(0);
        setFormOneNote(OneNote.createDefault(selectedOneId || ""));
    }

    const Body = [];

    const renderTypeItem = ({ item, index }: { item: { value: OneNoteType, icon: AppIcon, label: string, details: string }; index: number }) => {
        const handlePress = () => {
            setFormSelectedTypeIdx(index);
        };

        return (
            <TouchableOpacity onPress={handlePress}>
                <PageRow style={[modalStyles.card, formSelectedTypeIdx === index && modalStyles.selectedCard]}>
                    <Image source={item.icon} style={[modalStyles.icon, formSelectedTypeIdx === index && modalStyles.selected]} />
                    <PageColumn style={{ marginStart: 8, width: 250 }}>
                        <AppText type={TextType.DefaultSemiBold} style={{}}>{item.label}</AppText>
                        <AppText type={TextType.Italic} style={{}}>{item.details}</AppText>
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
                                {selectedOneNoteTypeData ? (
                                    <>
                                        <TouchableOpacity onPress={toggleNoteTypeModal}>
                                            <PageRow style={[modalStyles.card]}>
                                                <Image source={selectedOneNoteTypeData.icon} style={[modalStyles.icon, modalStyles.selected]} />
                                                <PageColumn style={{ marginStart: 8, width: 250 }}>
                                                    <AppText type={TextType.DefaultSemiBold} style={{}}>{selectedOneNoteTypeData.label}</AppText>
                                                    <AppText type={TextType.Italic} style={{}}>{selectedOneNoteTypeData.details}</AppText>
                                                </PageColumn>
                                            </PageRow>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <AppText type={TextType.DefaultSemiBold}>None Selected</AppText>
                                )}
                            </View>
                            <TouchableOpacity onPress={toggleNoteTypeModal}
                                style={[modalStyles.editButton, { width: 100, alignSelf: 'center' }]}>
                                <AppText>Edit Type</AppText>
                            </TouchableOpacity>
                        </PageColumn>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isNoteTypeModalVisible}
                            onRequestClose={toggleNoteTypeModal}>
                            <View style={modalStyles.modalContainer}>
                                <View style={[modalStyles.modalContent, { width: '90%' }]}>
                                    <AppText type={TextType.DefaultSemiBold} style={modalStyles.modalTitle}>
                                        Select a Category
                                    </AppText>

                                    <ScrollLayout style={{ maxHeight: 300 }}>
                                        <FlatList
                                            data={oneNoteTypeArray}
                                            renderItem={renderTypeItem}
                                            numColumns={1}
                                            keyExtractor={(item, index) => index.toString()}
                                            contentContainerStyle={modalStyles.iconList} />
                                    </ScrollLayout>
                                    <TouchableOpacity
                                        style={modalStyles.closeButton}
                                        onPress={toggleNoteTypeModal}>
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
                style={formStyles.multiLineTextInput}
                placeholder="Enter text here..."
                placeholderTextColor={'gray'}
                value={formOneNote.notes}
                numberOfLines={4}
                onChangeText={(text) => setFormOneNote((prev) => ({ ...prev, notes: text }))}
            />

        </PageColumn>
    );

    if (pickerState !== PickerState.Normal) {
        Body.push(
            <PageRow spaceEvenly style={{ marginBottom: 8 }}>
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
            <PageRow spaceEvenly style={{ marginBottom: 8 }}>
                {
                    selectedNoteId === null && (
                        <SimpleIconButton iconSrc={AppIcon.Plus}
                            customStyles={{ container: { marginStart: 10, marginEnd: 10 } }}
                            title={'Add'}
                            onClick={() => setPickerState(PickerState.Adding)} />
                    )
                }

                {
                    selectedNoteId !== null && (
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
        if (selectedOne) {
            Body.push(
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
            );

            const onUpdateStageClick = () => {
                setIsStageModalVisible(true);
            };

            const handleStageSelect = (stage: OneStage) => {

            };

            const toggleStageModal = () => {
                setIsStageModalVisible(!isStageModalVisible);
            };

            const renderStage = ({ item }: { item: { stage: OneStage, icon: any, label: string } }) => (
                <TouchableOpacity onPress={() => handleStageSelect(item.stage)}>
                    <PageRow style={styles.iconCard}>
                        <PageColumn>
                            <Image
                                source={item.icon}
                                style={[styles.icon, selectedOne.stage === item.stage && styles.selected]}
                            />
                            <AppText type={TextType.Italic}>{item.label}</AppText>
                        </PageColumn>
                    </PageRow>
                </TouchableOpacity>
            );

            Body.push(
                <PageRow style={{ marginTop: 8 }}>
                    <Button title="Update Stage"
                        onPress={onUpdateStageClick} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isStageModalVisible}
                        onRequestClose={toggleStageModal}>
                        <View style={modalStyles.modalContainer}>
                            <View style={[modalStyles.modalContent, { width: '90%' }]}>
                                <AppText type={TextType.DefaultSemiBold} style={modalStyles.modalTitle}>
                                    Your One's Stage
                                </AppText>
                                <AppText>
                                    Make changes to your One's stage.
                                </AppText>

                                <ScrollLayout style={{ maxHeight: 300 }}>
                                    <FlatList
                                        data={stageArray}
                                        renderItem={renderStage}
                                        numColumns={4}
                                        keyExtractor={(item, index) => index.toString()}
                                        contentContainerStyle={styles.iconList}
                                    />
                                </ScrollLayout>

                                <TouchableOpacity
                                    style={modalStyles.closeButton}
                                    onPress={toggleStageModal}>
                                    <AppText>Close</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </PageRow>
            );
        }

        const partitionedNotes = OneNote.partitionNotes(oneNotes);
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
    } else if (pickerState === PickerState.Adding) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Adding Note
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Editing) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Editing Note
                </AppText>
                {Form}
            </View>
        );
    } else if (pickerState === PickerState.Removing && selectedNote) {
        Body.push(
            <View>
                <AppText type={TextType.BodyBold} style={styles.pageHeader}>
                    Are you sure you want to remove this note?
                </AppText>
                <PageColumn style={[styles.noteCard, styles.selectedNoteCard]}>
                    <AppText type={TextType.Default}>
                        {selectedNote.notes}
                    </AppText>
                    <AppText type={TextType.Body}>
                        {getAppTimeAgoText(selectedNote.date, false, true)}
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
    iconCard: {
        width: 80,
        margin: 4,
        alignItems: 'center',
    },
    selected: {
        opacity: 1,
    },
    headerRow: {
        height: 70,
        marginBottom: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoPicker);