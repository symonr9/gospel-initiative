import { AppIcon } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import SimpleIconButton from '../common/SimpleIconButton';

const TAGS = [
  'Friendship',
  'SharedGospel',
  'ActsOfService',
  'Prayer',
  'Discipleship',
  'Encouragement',
  // Add more tags as needed
];

type TagsPickerProps = {
  formChapter: StoryChapter;
  setFormChapter: (updatedChapter: StoryChapter) => void;
};

export default function TagsPicker({ formChapter, setFormChapter }: TagsPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTag = (tag: string) => {
    const updatedTags = formChapter.tags.includes(tag)
      ? formChapter.tags.filter((t) => t !== tag)
      : [...formChapter.tags, tag];

    setFormChapter({ ...formChapter, tags: updatedTags });
  };

  return (
    <View>
      {/* Display Selected Tags */}
      <View style={styles.tagsContainer}>
        {formChapter.tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={styles.chip}
            onPress={() => toggleTag(tag)}
          >
            <Text>{tag}</Text>
          </TouchableOpacity>
        ))}

        {/* IconButton to Open Modal */}
        <SimpleIconButton
          iconSrc={AppIcon.Edit}
          onClick={() => setModalVisible(true)}
        />
      </View>

      {/* Modal for Tag Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Tags</Text>

            <FlatList
              data={TAGS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.tagOption,
                    formChapter.tags.includes(item) && styles.selectedTagOption,
                  ]}
                  onPress={() => toggleTag(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
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
  tagOption: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 10,
  },
  selectedTagOption: {
    backgroundColor: '#c0ffc0',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6666',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
