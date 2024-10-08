import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { AppText, TextType } from '../common/AppText';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import { Colors } from '@/constants/Colors';
import StoryChapter from '@/models/storyChapter';
import { formStyles } from '@/styles/Styles';

export type IQuestionsPicker = {
    formChapter: StoryChapter;
    setFormChapter: Function;
};

export const QuestionsPicker = ({ formChapter, setFormChapter } : IQuestionsPicker) => {
  const [newQuestion, setNewQuestion] = useState('');

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
    <PageColumn style={styles.container}>
      <FlatList
        data={formChapter.questions}
        renderItem={({ item, index }) => (
          <PageRow spaceBetween style={{ marginBottom: 8 }}>
            <TextInput
              style={[formStyles.slimTextInput, { flexGrow: 1 }]}
              value={item}
              onChangeText={(text) => updateQuestion(text, index)}
            />
            <SimpleIconButton
              iconSrc={AppIcon.Trash}
              customStyles={{ container: { marginStart: 12, marginTop: 8 }}}
              small
              onClick={() => removeQuestion(index)}
            />
          </PageRow>
        )}
        keyExtractor={(item, index) => `question-${index}`}
      />

      <PageRow spaceBetween>
        <TextInput
          style={[formStyles.slimTextInput, { flexGrow: 1 }]}
          placeholder="Add a new question"
          placeholderTextColor={'gray'}
          value={newQuestion}
          onChangeText={setNewQuestion}
        />

        <SimpleIconButton
            iconSrc={AppIcon.Plus}
            customStyles={{ container: { marginStart: 12, marginTop: 8 }}}
            small
            onClick={addQuestion}
        />
      </PageRow>
    </PageColumn>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  addContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
});
