import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ScrollView, ActivityIndicator, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import { partition } from '@/requests/Requests';
import User from '@/models/user';
import { SimpleIcon } from '../common/SimpleIcon';
import { setAppError } from '@/redux/actions';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';
import { StoryLayoutType } from './MyStoriesLayout';
import { Colors } from '@/constants/Colors';
import { getRandomString, shouldKeepChapter } from '@/utils/appUtils';
import { PracticeTestimonyQuestions } from '@/constants/Strings';
import { formStyles } from '@/styles/Styles';

export type IPracticeMyStoryDetails = {
  executor: User,
  setAppError: Function,
  setActiveLayoutType: Function
};

enum PageState {
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6
};

function PracticeMyStoryDetails({ executor, setAppError, setActiveLayoutType }: IPracticeMyStoryDetails) {
  const [pageState, setPageState] = useState(PageState.Page1);
  const [question, setQuestion] = useState(getRandomString(PracticeTestimonyQuestions));
  const [response, setResponse] = useState("");
  const [chapterArray, setChapterArray] = useState<StoryChapter[] | null>(null);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);

  const Body = [];

  const partitionResponse = async (controller: AbortController) => {
    try {
      const data = await partition(question, response, executor.id, {
        signal: controller.signal,
      });

      if (!data || data.error) {
        setAppError(data.error || 'Something went wrong');
        return;
      }

      setChapterArray(data);
    } catch (err: any) {
      console.error('Error fetching data', err);
    }
  };

  useEffect(() => {
    if (pageState === PageState.Page4) {
      if (!question || !response) {
        console.error('Missing question/response...');
        return;
      }

      const controller = new AbortController();
      partitionResponse(controller);
      return () => {
        controller.abort();
      };
    }
  }, [pageState]);

  useEffect(() => {
    if (!chapterArray && pageState !== PageState.Page4) {
      return;
    }
    setPageState(PageState.Page5);
  }, [chapterArray]);

  if (pageState === PageState.Page1) {
    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{ marginVertical: 8 }}>
          Practice your Testimony
        </AppText>

        <AppText type={TextType.Default}>
          The Gospel Initiative app provides users with the ability to practice their testimony.
        </AppText>
        <PageColumn style={{ marginTop: 8, gap: 16 }}>
          <AppText type={TextType.Default}>
            1.) Respond: Answer the question on the next page. You can either type your answer or use your phone's speech-to-text feature.
          </AppText>
          <AppText type={TextType.Default}>
            2.) Review Partitions: The app will organize and split your testimony and provide insights and feedback. Choose which ones to save.
          </AppText>
          <AppText type={TextType.Default}>
            3.) Save: When you are done reviewing the partitions, save your changes.
          </AppText>
        </PageColumn>

        <PageRow center style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.Checkmark}
            title='Start'
            onClick={() => setPageState(PageState.Page2)} />
        </PageRow>
      </>
    );
  } else if (pageState === PageState.Page2) {
    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{ marginVertical: 8 }}>
          Practice your Testimony
        </AppText>

        <AppText type={TextType.Body} style={{ marginVertical: 8 }}>
          Your Question
        </AppText>
        <View style={{ flexShrink: 1, width: '90%' }}>
          <AppText type={TextType.BodyBold} style={[styles.textLabel]}>
            {question}
          </AppText>
        </View>

        <AppText type={TextType.Subtitle2} style={{ marginVertical: 8, marginTop: 16 }}>
          Your Response
        </AppText>
        <TextInput
          style={[formStyles.multiLineTextInput]}
          placeholder="Enter note here..."
          placeholderTextColor={'gray'}
          value={response}
          multiline
          numberOfLines={8}
          onChangeText={(text) => setResponse(text)} />

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            title='Back'
            onClick={() => setPageState(PageState.Page1)} />

          <SimpleIconButton iconSrc={AppIcon.Checkmark}
            title={'Next'}
            onClick={() => setPageState(PageState.Page3)} />
        </PageRow>
      </>
    );
  } else if (pageState === PageState.Page3) {
    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{ marginVertical: 8 }}>
          Confirm Response?
        </AppText>

        <PageColumn>
          <AppText type={TextType.Body} style={{ marginVertical: 8 }}>
            Your Question
          </AppText>
          <View style={{ flexShrink: 1, width: '95%' }}>
            <AppText type={TextType.BodyBold} style={[styles.textLabel]}>
              {question}
            </AppText>
          </View>

          <AppText type={TextType.Subtitle2} style={{ marginVertical: 8, marginTop: 16 }}>
            Your Response
          </AppText>
          <ScrollView style={{ maxHeight: 300 }}>
            <View style={{ flexShrink: 1, width: '95%' }}>
              <AppText type={TextType.Default} style={[styles.textLabel]}>
                {response}
              </AppText>
            </View>
          </ScrollView>
        </PageColumn>

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            title='Back'
            onClick={() => setPageState(PageState.Page2)} />

          <SimpleIconButton iconSrc={AppIcon.Checkmark}
            title={'Next'}
            onClick={() => setPageState(PageState.Page4)} />
        </PageRow>
      </>
    );
  } else if (pageState === PageState.Page4) {
    Body.push(
      <>
        <AppText type={TextType.Subtitle}>
          Loading...
        </AppText>
        <AppText type={TextType.Body} style={{ marginVertical: 8 }}>
          Your partition is loading, please wait...
        </AppText>

        <ActivityIndicator
          size="large"
          color={Colors.light.primary}
        />
      </>
    );
  } else if (pageState === PageState.Page5 && chapterArray != null) {
    const renderStoryChapter = ({ item }: { item: StoryChapter }) => {
      const editing = editingChapterId === item.id;
      return (
        <StoryChapterCard chapter={item}
          editing={editing}
          setEditingChapterId={setEditingChapterId}
          setChapterArray={setChapterArray} />
      );
    };

    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{}}>
          Partition successful!
        </AppText>
        <AppText type={TextType.Body} style={{ marginBottom: 16 }}>
          Your response has been partitioned into 'Chapters' below. Take time to look over and edit them as you please.
        </AppText>

        <FlatList
          data={chapterArray}
          renderItem={renderStoryChapter}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.Checkmark}
            title={editingChapterId === null ? 'Next' : '*Editing*'}
            disabled={editingChapterId !== null}
            onClick={() => setPageState(PageState.Page6)} />
        </PageRow>
      </>
    );
  } else if (pageState === PageState.Page6) {
    const renderStoryChapter = ({ item }: { item: StoryChapter }) => {
      return (
        <StoryChapterCard chapter={item} canEdit={false} />
      );
    };

    const onCompleteClick = () => {
      setActiveLayoutType(StoryLayoutType.Normal);
    };

    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{}}>
          Save Chapters?
        </AppText>
        <AppText type={TextType.Body} style={{ marginBottom: 16 }}>
          Your changes will be finalized and your chapters will be saved.
        </AppText>

        <FlatList
          data={chapterArray?.filter((chapter) => shouldKeepChapter(chapter.quality))}
          renderItem={renderStoryChapter}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            title='Back'
            onClick={() => setPageState(PageState.Page5)} />

          <SimpleIconButton iconSrc={AppIcon.Checkmark}
            title={'Complete'}
            onClick={onCompleteClick} />
        </PageRow>
      </>
    );
  } else {
    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{ marginVertical: 8 }}>
          Something went wrong, story data not loaded...
        </AppText>
      </>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Body.map((item) => item)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textLabel: {

  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor,
});

const mapDispatchToProps = {
  setAppError,
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeMyStoryDetails);
