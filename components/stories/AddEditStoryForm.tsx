import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, LayoutAnimation } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';
import { EnhancedStory } from '@/models/story';
import { AppText, TextType } from '../common/AppText';
import { AppIcon } from '@/enums/enums';
import { mapStoryChapterTypeToAppIcon } from '@/utils/appUtils';
import { StoryLayoutType } from './MyStoriesLayout';

export type IAddEditStoryForm = {
  activeStory: EnhancedStory | null;
  activeLayoutType: StoryLayoutType;
};

function AddEditStoryForm({ activeStory, activeLayoutType }: IAddEditStoryForm) {
  return (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
});

const mapStateToProps = (state: any) => ({
  executor: state.users.executor,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditStoryForm);
