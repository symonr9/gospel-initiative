import React, { useState } from 'react';
import { TextInput, StyleSheet, FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import { formStyles, gridStyles, modalStyles } from '@/styles/Styles';
import ScrollLayout from '../common/ScrollLayout';
import { SimpleKeyboardAvoidingView } from '../common/SimpleKeyboardAvoidingView';
import { AppText, TextType } from '../common/AppText';
import { ButtonType, SimpleButton } from '../common/SimpleButton';

export type IQuestionsPicker = {
  formChapter: StoryChapter;
  setFormChapter: Function;
};

export const QuestionsPicker = ({ formChapter, setFormChapter }: IQuestionsPicker) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      setFormChapter((prevChapter: StoryChapter) => ({
        ...prevChapter,
        questions: [...prevChapter.questions, newQuestion],
      }));
      setNewQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    setFormChapter((prevChapter: StoryChapter) => ({
      ...prevChapter,
      questions: prevChapter.questions.filter((_, i) => i !== index),
    }));
  };

  const updateQuestion = (text: string, index: number) => {
    const updatedQuestions = [...formChapter.questions];
    updatedQuestions[index] = text;
    setFormChapter((prevChapter: StoryChapter) => ({
      ...prevChapter,
      questions: updatedQuestions,
    }));
  };

  return (
    <PageColumn style={{}}>
      {
        formChapter.questions.map((item, index) => (
          <PageRow style={{ marginVertical: 4 }}>
            <AppText type={TextType.Body}>
              {item}
            </AppText>
          </PageRow>
        ))
      }

      <PageRow center>
        <SimpleButton text={'Edit Questions'}
          onPress={() => setModalVisible(true)}
          style={{ marginVertical: 8 }}
          type={ButtonType.Edit} />
      </PageRow>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={modalStyles.modalContainer}>
          <View style={[modalStyles.modalContent, { width: '90%' }]}>
            {
              formChapter.questions.map((item, index) => (
                <PageRow style={{ marginBottom: 8 }}>
                  <SimpleIconButton
                    iconSrc={AppIcon.Trash}
                    customStyles={{ container: { marginHorizontal: 8, marginTop: 8 } }}
                    small
                    onClick={() => removeQuestion(index)}
                  />
                  <SimpleKeyboardAvoidingView Element={
                    <TextInput
                      style={[formStyles.slimTextInput, { width: 280 }]}
                      multiline
                      value={item}
                      onChangeText={(text) => updateQuestion(text, index)}
                    />
                  } verticalOffset={300} />
                </PageRow>
              ))
            }

            <PageRow>
              <SimpleIconButton
                iconSrc={AppIcon.Plus}
                customStyles={{ container: { marginHorizontal: 8, marginTop: 8 } }}
                small
                onClick={addQuestion}
              />
              <TextInput
                style={[formStyles.slimTextInput, { width: 280 }]}
                placeholder="Add a new question"
                placeholderTextColor={'gray'}
                value={newQuestion}
                onChangeText={setNewQuestion}
              />
            </PageRow>

            <SimpleButton text={'Close'}
              onPress={toggleModal}
              type={ButtonType.Close} />
          </View>
        </View>
      </Modal>
    </PageColumn>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  addContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
});
