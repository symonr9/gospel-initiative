import React, { useState } from 'react';
import { TextInput, StyleSheet, FlatList } from 'react-native';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import { formStyles } from '@/styles/Styles';
import ScrollLayout from '../common/ScrollLayout';

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
          <PageRow style={{ marginBottom: 8 }}>
            <SimpleIconButton
              iconSrc={AppIcon.Trash}
              customStyles={{ container: { marginEnd: 12, marginTop: 8 }}}
              small
              onClick={() => removeQuestion(index)}
            />
            <TextInput
              style={[formStyles.slimTextInput, { }]}
              value={item}
              onChangeText={(text) => updateQuestion(text, index)}
            />
          </PageRow>
        )}
        keyExtractor={(item, index) => `question-${index}`}
      />

      <PageRow>
        <SimpleIconButton
              iconSrc={AppIcon.Plus}
              customStyles={{ container: { marginEnd: 12, marginTop: 8 }}}
              small
              onClick={addQuestion}
          />
        <TextInput
          style={[formStyles.slimTextInput, {}]}
          placeholder="Add a new question"
          placeholderTextColor={'gray'}
          value={newQuestion}
          onChangeText={setNewQuestion}
        />
      </PageRow>
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
