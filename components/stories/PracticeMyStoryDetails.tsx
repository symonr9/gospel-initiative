import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Audio } from 'expo-av';
import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
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
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const Body = [];


  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }

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
      if (recording) {
        stopRecording();
      } else {
        startRecording();
      }
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
            title={recording ? 'Stop Recording' : 'Start Record'}
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
