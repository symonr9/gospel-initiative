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
import { setAppError, refreshData } from '@/redux/actions';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';
import { formatDateTime, getHoursLeft, getRandomString, getTheNextDay, getTimePercentage, isWithinPast24Hours, shouldKeepChapter } from '@/utils/appUtils';
import { PracticeTestimonyQuestions } from '@/constants/Strings';
import { formStyles } from '@/styles/Styles';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { SimpleLoadingSection } from '../common/SimpleLoadingSection';
import AppError from '@/models/error';
import { ItemRowContainer } from '../common/ItemRowContainer';
import { BeaconCard } from '../beacons/BeaconCard';
import { SimpleCard } from '../common/SimpleCard';
import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';
import { MAX_LONG_TEXT_LENGTH } from '@/constants/Constants';
import { SimpleIcon } from '../common/SimpleIcon';
import { halfScreenHeight, screenWidth, standardPaddedWidth } from '@/constants/Dimensions';

export type IPracticeMyStoryDetails = {
  executor: User,
  myStoryChapters: StoryChapter[],
  setAppError: Function,
  refreshData: Function
};

enum PageState {
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8
};

function PracticeMyStoryDetails({ executor, myStoryChapters, setAppError, refreshData }: IPracticeMyStoryDetails) {
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
    const hasFreePractice = !isWithinPast24Hours(executor.lastPartitionDate) || false;
    const numOfAdditionalPractices = executor.extraPartitionCount || 0;
    const hasNoTokens = !hasFreePractice && numOfAdditionalPractices === 0;
    const beaconPlaceholder = { type: BeaconType.SpiritualConversation };

    const practiceTokens = [];
    if (hasFreePractice) {
      practiceTokens.push(
        <BeaconCard beacon={beaconPlaceholder}
          idx={0}
          useAnimations={true}
          selectedPrayerId={null}
          onPress={() => { }}
          selectedIdx={null} />
      );
    }

    for (let i = 0; i < numOfAdditionalPractices; i++) {
      practiceTokens.push(
        <BeaconCard beacon={beaconPlaceholder}
          idx={0}
          selectedPrayerId={null}
          useAnimations={true}
          onPress={() => { }}
          selectedIdx={null} />
      );
    }

    if (hasNoTokens) {
      const nextPartitionDate = getTheNextDay(executor.lastPartitionDate);
      const hoursBetween = getHoursLeft(nextPartitionDate);
      const timePercent = hoursBetween / 24;

      practiceTokens.push(
        <PageColumn style={{ gap: 8 }}>
          <PageColumn style={{ flexShrink: 1, width: standardPaddedWidth, marginTop: 8 }}>
            <AppText type={TextType.Italic}>
              You can practice again on {formatDateTime(nextPartitionDate)}.
            </AppText>
          </PageColumn>
          <PageRow style={{ gap: 8, marginTop: 8 }}>
            <View style={{ alignSelf: 'center' }}>
              <Progress.Bar progress={timePercent}
                width={standardPaddedWidth - 50}
                borderRadius={8} />
            </View>
            <AppText type={TextType.Body}>{24 - hoursBetween} hour{(24 - hoursBetween) !== 1 ? 's' : ''} left</AppText>
          </PageRow>
        </PageColumn>
      );
    }

    const title = hasNoTokens ? 'Practice Tokens' : `Practice Tokens (${practiceTokens.length})`;

    Body.push(
      <PageColumn style={{ marginVertical: 8, gap: 12 }}>

        <PageRow spaceBetween>
          <PageColumn style={{ gap: 12 }}>
            <PageRow>
              <SimpleIcon iconSrc={AppIcon.Microphone} removeBackground={false} />
              <AnimatedHeader title={'Practice your Testimony'}
                style={{ alignItems: 'flex-start', marginStart: 8 }}
                subtitle='Practice your story and save to your library.' />
            </PageRow>
          </PageColumn>
        </PageRow>

        <PageRow>
          <SimpleCard title={`Testimony Practice Info`}
            subtitle={''}
            onClick={() => setShowInfoOnPage1(val => !val)}
            style={{ width: screenWidth - 30 }}
            detailsView={
              <>
                {showInfoOnPage1 && (
                  <PageColumn style={{ marginTop: 12 }}>
                    <PageColumn style={{ marginTop: 8, gap: 16 }}>
                      <AppText type={TextType.Default}>
                        <AppText type={TextType.Subtitle3}>1.) Respond:</AppText> Answer the question on the next page. You can either type your answer or use your phone's speech-to-text feature.
                      </AppText>
                      <AppText type={TextType.Default}>
                        <AppText type={TextType.Subtitle3}>2.) Review:</AppText> The app will organize and compile your testimony and provide insights and feedback. Choose which ones to save.
                      </AppText>
                      <AppText type={TextType.Default}>
                        <AppText type={TextType.Subtitle3}>3.) Save:</AppText> When you are done reviewing the compilations, save your changes.
                      </AppText>
                    </PageColumn>
                  </PageColumn>
                )}
              </>
            } />
        </PageRow>

        <PageRow spaceEvenly style={{ gap: 8 }}>
          <ItemRowContainer iconSrc={AppIcon.Info}
            title={title}
            expandedHeight={(halfScreenHeight / 5) - 10}
            itemsToRender={practiceTokens} />
        </PageRow>

        <PageRow center>
          <SimpleIconButton iconSrc={AppIcon.ArrowNext}
            title={hasNoTokens ? 'Try again later' : 'Start'}
            disabled={hasNoTokens}
            onClick={() => setPageState(PageState.Page2)} />
        </PageRow>
      </PageColumn>
    );
  } else if (pageState === PageState.Page2) {
    Body.push(
      <>
        <AppText type={TextType.Subtitle} style={{ marginVertical: 8 }}>
          Practice your Testimony
        </AppText>

        <PageRow spaceBetween style={{ marginRight: 8 }}>
          <View />
          <SimpleIconButton iconSrc={AppIcon.Refresh}
            title='Refresh'
            onClick={() => setQuestion(getRandomString(PracticeTestimonyQuestions))}
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
          <AppText type={TextType.Subtitle2}>
            Your Response
          </AppText>
        </PageColumn>

        <TextInput
          style={[formStyles.multiLineTextInput, { height: (halfScreenHeight / 2) - 40 }]}
          placeholder={`Enter notes here... (Max Chars: ${MAX_LONG_TEXT_LENGTH})`}
          placeholderTextColor={'gray'}
          value={response}
          multiline
          numberOfLines={8}
          maxLength={MAX_LONG_TEXT_LENGTH}
          onChangeText={(text) => setResponse(text)} />

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            title='Back'
            onClick={() => setPageState(PageState.Page1)} />

          <SimpleIconButton iconSrc={AppIcon.Checkmark}
            title={'Next'}
            onClick={() => setPageState(PageState.Page3)} />
        </PageRow>

        <View style={{ height: 200}}/>
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
          <View style={{ flexShrink: 1, width: screenWidth - 20 }}>
            <AppText type={TextType.BodyBold} style={[styles.textLabel]}>
              {question}
            </AppText>
          </View>

          <AppText type={TextType.Subtitle2} style={{ marginVertical: 8, marginTop: 16 }}>
            Your Response
          </AppText>
          <ScrollView style={{ maxHeight: halfScreenHeight / 2 }}>
            <View style={{ flexShrink: 1, width: screenWidth - 20 }}>
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

          <SimpleIconButton iconSrc={AppIcon.ArrowNext}
            title={'Next'}
            onClick={() => setPageState(PageState.Page4)} />
        </PageRow>
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

          <SimpleIconButton iconSrc={AppIcon.Save}
            title={'Save'}
            onClick={() => setPageState(PageState.Page7)} />
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
      resetPage();
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
});

const mapDispatchToProps = {
  setAppError,
  refreshData
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeMyStoryDetails);
