import { AppIcon, StoryChapterType } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput } from 'react-native';
import { PageChip } from '../common/PageChip';
import { AppText, TextType } from '../common/AppText';
import ScrollLayout from '../common/ScrollLayout';
import { PageRow } from '../common/PageRow';
import { formStyles } from '@/styles/Styles';
import SimpleIconButton from '../common/SimpleIconButton';
import { mapStoryChapterTypeToText } from '@/utils/appUtils';

type IChapterTypePicker = {
    formChapter: StoryChapter;
    setFormChapter: (updatedChapter: StoryChapter) => void;
};

export default function ChapterTypePicker({ formChapter, setFormChapter }: IChapterTypePicker) {
    const [selectedType, setSelectedType] = useState(formChapter.chapterType);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!modalVisible && setFormChapter && formChapter.chapterType !== selectedType) {
            setFormChapter({ ...formChapter, chapterType: selectedType });
        }
    }, [modalVisible]);

    return (
        <View>
            <TouchableOpacity style={[styles.modalItem, styles.selectedModalItem]}
                onPress={() => setModalVisible(true)}>
                <AppText type={TextType.Subtitle2}>
                    {mapStoryChapterTypeToText(selectedType)}
                </AppText>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Type</Text>

                        <TouchableOpacity style={[styles.modalItem, selectedType === StoryChapterType.BeforeChrist && styles.selectedModalItem]}
                            onPress={() => setSelectedType(StoryChapterType.BeforeChrist)}>
                            <AppText type={TextType.Subtitle2}>
                                {mapStoryChapterTypeToText(StoryChapterType.BeforeChrist)}
                            </AppText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.modalItem, selectedType === StoryChapterType.SalvationMoment && styles.selectedModalItem]}
                            onPress={() => setSelectedType(StoryChapterType.SalvationMoment)}>
                            <AppText type={TextType.Subtitle2}>
                                {mapStoryChapterTypeToText(StoryChapterType.SalvationMoment)}
                            </AppText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.modalItem, selectedType === StoryChapterType.AfterChrist && styles.selectedModalItem]}
                            onPress={() => setSelectedType(StoryChapterType.AfterChrist)}>
                            <AppText type={TextType.Subtitle2}>
                                {mapStoryChapterTypeToText(StoryChapterType.AfterChrist)}
                            </AppText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <AppText>Close</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    chip: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        margin: 5,
        borderRadius: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        padding: 8,
        backgroundColor: 'lightgray',
        marginVertical: 5,
        borderRadius: 4,
        opacity: 0.8,
        marginHorizontal: 4
    },
    selectedModalItem: {
        backgroundColor: '#d0e0e3',
        opacity: 1
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff6666',
        borderRadius: 10,
        alignSelf: 'center',
    },
});
