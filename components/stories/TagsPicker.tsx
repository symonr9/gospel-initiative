import { AppIcon, StoryChapterTag } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { mapStoryChapterTagToText } from '@/utils/appUtils';
import { PageChip } from '../common/PageChip';
import { AppText } from '../common/AppText';
import ScrollLayout from '../common/ScrollLayout';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import { modalStyles } from '@/styles/Styles';
import { Colors } from '@/constants/Colors';

function createTagMap(keys: string[]) {
    return keys
        .filter(key => isNaN(Number(key)))
        .map((key, index) => ({
            value: StoryChapterTag[key as keyof typeof StoryChapterTag],
            label: mapStoryChapterTagToText(StoryChapterTag[key as keyof typeof StoryChapterTag]),
        }));
}

const tagArray = createTagMap(Object.keys(StoryChapterTag));

type TagsPickerProps = {
    formChapter: StoryChapter;
    setFormChapter?: (updatedChapter: StoryChapter) => void;
    editing?: Boolean;
};

export default function TagsPicker({ formChapter, setFormChapter, editing = true }: TagsPickerProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleTag = (tag: StoryChapterTag) => {
        if (setFormChapter) {
            const updatedTags = formChapter.tags.includes(tag)
                ? formChapter.tags.filter((t) => t !== tag)
                : [...formChapter.tags, tag];
            setFormChapter({ ...formChapter, tags: updatedTags });
        }
    };

    const currentTags = formChapter.tags.map((value) => ({
        value: value,
        label: mapStoryChapterTagToText(value),
    }));

    return (
        <PageColumn>
            <PageRow style={{}}>
                <FlatList
                    data={currentTags}
                    numColumns={4}
                    style={{ gap: 4 }}
                    keyExtractor={(item, index) => item.label}
                    renderItem={({ item }) => (
                        <PageChip title={mapStoryChapterTagToText(item.value)}
                            onClick={() => editing && setModalVisible(true)}
                            small />
                    )} />
            </PageRow>

            {
                editing && (
                    <PageRow style={{ width: 100, marginTop: 4 }}>
                        <PageChip title={'Edit'}
                            iconSrc={AppIcon.Edit}
                            onClick={() => setModalVisible(true)}
                            small />                
                    </PageRow>
                )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <Text style={modalStyles.modalTitle}>Select Tags</Text>

                        <ScrollLayout style={{ height: 300 }}>
                            <FlatList
                                data={tagArray}
                                numColumns={2}
                                keyExtractor={(item) => item.label}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.tagOption,
                                            formChapter.tags.includes(item.value) && styles.selectedTagOption,
                                        ]}
                                        onPress={() => toggleTag(item.value)}>
                                        <AppText>
                                            {item.label}
                                        </AppText>
                                    </TouchableOpacity>
                                )} />
                        </ScrollLayout>

                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <AppText>Close</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    chip: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        margin: 5,
        borderRadius: 20,
    },
    tagOption: {
        padding: 8,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 4,
        marginHorizontal: 4
    },
    selectedTagOption: {
        backgroundColor: Colors.selected,
    },
});
