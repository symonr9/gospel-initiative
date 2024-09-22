import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Animated, LayoutAnimation } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { EnhancedStory } from '@/models/story';
import { AppText, TextType } from '../common/AppText';
import { AppIcon, Page } from '@/enums/enums';
import { mapStoryChapterTypeToAppIcon } from '@/utils/appUtils';
import { StoryLayoutType } from './MyStoriesLayout';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';

export type IPracticeMyStoryDetails = {
};

enum PageState {
  Page1,
  Page2,
  Page3
};

function PracticeMyStoryDetails({ }: IPracticeMyStoryDetails) {
  const [pageState, setPageState] = useState(PageState.Page1);

  const Body = [];

  if (pageState === PageState.Page1) {
    Body.push(
      <>
        <AppText type={TextType.Body}>
          The Gospel Initiative app provides users with the ability to practice their testimony. This is done in three steps.
        </AppText>
        <PageColumn style={{ marginTop: 8, gap: 16 }}>
          <AppText type={TextType.Body}>
            1.) Record Response: You will be given a question. Simply hit the record button and record an audio clip of your response to the question.
          </AppText>
          <AppText type={TextType.Body}>
            2.) Review Partitions: The app will organize and split your testimony and provide insights and feedback. Choose which ones to save.
          </AppText>
          <AppText type={TextType.Body}>
            3.) Save: When you are done reviewing the partitions, save your changes. As you continue practicing your testimony, you will build a repository of
            different aspects of your faith journey that can be compiled and harmonized together.
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

    const onRecordClick = () => {

    };

    Body.push(
      <>

        <AppText type={TextType.Body} style={{ marginVertical: 8 }}>
            Your Prompt
        </AppText>
        <View style={{ flexShrink: 1, width: '90%' }}>
          <AppText type={TextType.BodyBold} style={[styles.textLabel]}>
            What was your childhood like? Who was your role model?
          </AppText>
        </View>

        <AppText type={TextType.Body} style={{ marginTop: 16 }}>
          Tap the 'Record' button and begin responding to the prompt above.
        </AppText>

        <PageRow spaceEvenly style={{ marginTop: 16 }}>
          <SimpleIconButton iconSrc={AppIcon.ArrowBack}
            title='Back'
            onClick={() => setPageState(PageState.Page1)} />

          <SimpleIconButton iconSrc={AppIcon.Phone}
            title='Record'
            onClick={onRecordClick} />
        </PageRow>
      </>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText type={TextType.Subtitle}>
        Practice your Testimony
      </AppText>

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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeMyStoryDetails);
