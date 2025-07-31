import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';


import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { AppIcon, BeaconType, RefreshSpec } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import { createChapters } from "@/requests/storyRequests";
import { partition } from "@/requests/storyRequests";
import User from '@/models/user';
import { setAppError, refreshData, setAddingStory } from '@/redux/actions';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';
import { formatDateTime, getHoursLeft, getRandomString, getTheNextDay, getTimePercentage, isWithinPast24Hours, shouldKeepChapter } from '@/utils/appUtils';
import { PracticeTestimonyQuestions } from '@/constants/Strings';
import { formStyles } from '@/styles/Styles';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleLoadingSection } from '../common/SimpleLoadingSection';
import AppError from '@/models/error';
import { SimpleCard } from '../common/SimpleCard';
import { Colors } from '@/constants/Colors';
import { MAX_LONG_TEXT_LENGTH, MAX_TESTIMONY_LENGTH, MIN_TESTIMONY_LENGTH } from '@/constants/Constants';
import { SimpleIcon } from '../common/SimpleIcon';
import { halfScreenHeight, screenWidth, standardPaddedWidth } from '@/constants/Dimensions';
import SimpleIconFormButton from '../common/SimpleIconFormButton';

export type IAddMyStoryForm = {
  executor: User,
  myStoryChapters: StoryChapter[],
  addingStory: boolean,
  setAppError: Function,
  refreshData: Function,
  setAddingStory: Function
};

enum PageState {
  Page1,
  Page2,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8
};

function AddMyStoryForm({ executor, myStoryChapters, setAppError, refreshData, addingStory, setAddingStory }: IAddMyStoryForm) {
  const [pageState, setPageState] = useState(PageState.Page1);
  const [question, setQuestion] = useState(getRandomString(PracticeTestimonyQuestions));
  const [response, setResponse] = useState("");
  const [showInfoOnPage1, setShowInfoOnPage1] = useState(true);
  const [chapterArray, setChapterArray] = useState<StoryChapter[] | null>(null);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);

  const Body = [];

  const resetPage = () => {
    setChapterArray(null);
    setQuestion(getRandomString(PracticeTestimonyQuestions));
    setResponse("");
    setEditingChapterId(null);
    setShowInfoOnPage1(true);
    setPageState(PageState.Page1);
  };

  const partitionResponse = async (controller: AbortController) => {
    try {
      const data = await partition(question, response, controller);

      if (!data || data.error) {
        setAppError(new AppError(data.error.toString() || 'Something went wrong'));
        resetPage();
        return;
      }

      refreshData(RefreshSpec.User);
      setChapterArray(data);
    } catch (err: any) {
      setAppError(new AppError('Error partioning data: ', err));
      resetPage();
    }
  };

  const saveChapters = async (controller: AbortController) => {
    try {
      const data = await createChapters(chapterArray, controller);
      if (!data || data.error) {
        setAppError(new AppError(data.error || 'Something went wrong'));
        return;
      }

      refreshData(RefreshSpec.Stories);
      setPageState(PageState.Page8);
    } catch (err: any) {
      setAppError(new AppError('Error saving chapters: ', err));
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
    } else if (pageState === PageState.Page7) {
      if (!chapterArray || chapterArray.length === 0) {
        console.log("No chapters to save...");
        setPageState(PageState.Page8);
        return;
      }

      const controller = new AbortController();
      saveChapters(controller);
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
      <PageColumn style={{ marginVertical: 8, gap: 12 }}>
        <PageRow spaceBetween>
          <PageColumn style={{ gap: 12 }}>
            <PageRow>
              <SimpleIcon iconSrc={AppIcon.Microphone} removeBackground={false} />
              <AnimatedHeader title={'Add New Story'}
                style={{ alignItems: 'flex-start', marginStart: 8 }}
                subtitle='Add to your story by reflecting on a thought-provoking question.' />
            </PageRow>
          </PageColumn>
        </PageRow>

        <PageRow>
          <SimpleCard title={`How does this work?`}
            subtitle={''}
            onClick={() => setShowInfoOnPage1(val => !val)}
            style={{ width: screenWidth - 30 }}
            detailsView={
              <>
                {showInfoOnPage1 && (
                  <PageColumn style={{}}>
                    <PageColumn style={{ marginTop: 8, gap: 16 }}>
                      <AppText type={TextType.Default}>
                        <AppText type={TextType.Subtitle3}>1.) Respond:</AppText> Answer the question by typing or using speech-to-text.
                      </AppText>
                      <AppText type={TextType.Default}>
                        <AppText type={TextType.Subtitle3}>2.) Review:</AppText> Review and select which compiled responses to keep.
                      </AppText>
                      <AppText type={TextType.Default}>
                        <AppText type={TextType.Subtitle3}>3.) Save:</AppText> Save your story cards to your library.
                      </AppText>
                    </PageColumn>
                  </PageColumn>
                )}
              </>
            } />
        </PageRow>

        <PageRow spaceBetween style={{ marginLeft: 8, marginRight: 8 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            title='Exit'
            onClick={() => setAddingStory(false)} />

          <SimpleIconButton iconSrc={AppIcon.ArrowNext}
            title={'Start'}
            onClick={() => setPageState(PageState.Page2)} />
        </PageRow>
      </PageColumn>
    );
  } else if (pageState === PageState.Page2) {
    const isPastMinLength = response.length >= MIN_TESTIMONY_LENGTH;

    Body.push(
      <>
        <PageRow spaceBetween style={{ marginRight: 8, }}>
          <AppText type={TextType.Subtitle} style={{ marginVertical: 8 }}>
            Add New Story
          </AppText>
          <SimpleIconButton iconSrc={AppIcon.Refresh}
            title='New Question'
            onClick={() => setQuestion(getRandomString(PracticeTestimonyQuestions))}
            customStyles={{ container: { marginTop: 8 } }}
            small />
        </PageRow>

        <AppText type={TextType.Subtitle2} style={{ marginVertical: 8 }}>
          Your Question
        </AppText>
        <View style={{ flexShrink: 1, width: screenWidth - 20 }}>
          <AppText type={TextType.Subtitle} style={[styles.textLabel]}>
            {question}
          </AppText>
        </View>

        <PageColumn style={{ marginVertical: 8, marginTop: 16 }}>
          <AppText type={TextType.Body} style={{ marginVertical: 8, color: isPastMinLength ? Colors.success : Colors.red }}>
            {isPastMinLength ? 'Minimum length reached' : `Minimum length not yet reached: ${response.length} / ${MIN_TESTIMONY_LENGTH}`}
          </AppText>
        </PageColumn>

        <TextInput
          style={[formStyles.multiLineTextInput, { height: (halfScreenHeight / 2) - 40 }]}
          placeholder={`Enter response here...`}
          placeholderTextColor={'gray'}
          value={response}
          multiline
          numberOfLines={8}
          maxLength={MAX_TESTIMONY_LENGTH}
          onChangeText={(text) => setResponse(text)} />

        <PageRow spaceEvenly style={{ marginTop: 16, marginBottom: 200 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            title='Back'
            onClick={() => setPageState(PageState.Page1)} />

          <SimpleIconButton iconSrc={AppIcon.Checkmark}
            title={'Submit'}
            disabled={!isPastMinLength}
            onClick={() => setPageState(PageState.Page4)} />
        </PageRow>

        <View style={{ height: 400 }} />
      </>
    );
  } else if (pageState === PageState.Page4) {
    Body.push(
      <SimpleLoadingSection title={'Loading...'}
        subtitle={'Your response is processing, please wait...'} />
    );
  } else if (pageState === PageState.Page5 && chapterArray != null) {
    const renderStoryChapter = ({ item }: { item: StoryChapter }) => {
      const editing = editingChapterId === item.id;
      return (
        <StoryChapterCard chapter={item}
          editing={editing}
          canDiscard={true}
          expandOnLoad={true}
          executor={executor}
          setAppError={setAppError}
          setEditingChapterId={setEditingChapterId}
          setChapterArray={setChapterArray} />
      );
    };

    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{}}>
          Compilation successful!
        </AppText>
        <AppText type={TextType.Body} style={{ marginBottom: 16 }}>
          Your response has been compiled into 'Chapters' below. Take time to look over and edit them as you please.
        </AppText>

        <FlatList
          data={chapterArray}
          renderItem={renderStoryChapter}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowNext}
            title={editingChapterId === null ? 'Next' : '*Editing*'}
            disabled={editingChapterId !== null}
            onClick={() => setPageState(PageState.Page6)} />
        </PageRow>
      </>
    );
  } else if (pageState === PageState.Page6) {
    const renderStoryChapter = ({ item }: { item: StoryChapter }) => {
      return (
        <StoryChapterCard chapter={item}
          canEdit={false}
          expandOnLoad={true}
          executor={executor}
          setAppError={setAppError} />
      );
    };

    Body.push(
      <>
        <PageRow verticalMargins>
          <SimpleIconFormButton iconSrc={AppIcon.ArrowBack}
            onClick={() => setPageState(PageState.Page5)}
            info
            title={'Back'} />
        </PageRow>

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

        <PageRow spaceBetween verticalMargins>
          <PageRow></PageRow>
          <SimpleIconFormButton iconSrc={AppIcon.Checkmark}
            onClick={() => setPageState(PageState.Page7)}
            success
            title={'Save'} />
        </PageRow>
      </>
    );
  } else if (pageState === PageState.Page7) {
    Body.push(
      <SimpleLoadingSection title={'Loading...'}
        subtitle={'Your data is saving, please wait...'} />
    );
  } else if (pageState === PageState.Page8) {
    const onCompleteClick = () => {
      setAddingStory(false);
    };

    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{}}>
          Success!
        </AppText>
        <AppText type={TextType.Body} style={{ marginBottom: 16 }}>
          Your chapter cards have been saved.
        </AppText>

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
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
      <View style={{ height: 200 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  textLabel: {

  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor,
  myStoryChapters: state.stories.myStoryChapters,
  addingStory: state.stories.addingStory,
});

const mapDispatchToProps = {
  setAppError,
  refreshData,
  setAddingStory
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMyStoryForm);
