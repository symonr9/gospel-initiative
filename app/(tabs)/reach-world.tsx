import React from 'react';
import PageView from '@/components/common/PageView';
import { ThemedText, ThemedTextType } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/Styles';

export default function ReachWorld() {
  return (
    <PageView>
      <ThemedView style={tabStyles.titleContainer}>
        <ThemedText type={ThemedTextType.Title}>Reach World</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
    </PageView>
  );
}