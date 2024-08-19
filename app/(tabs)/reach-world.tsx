
import Ionicons from '@expo/vector-icons/Ionicons';

import PageView from '@/components/common/PageView';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../styles/tab-styles';

export default function ReachWorld() {
  return (
    <PageView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={100} name="earth" style={tabStyles.headerImage} />}>
      <ThemedView style={tabStyles.titleContainer}>
        <ThemedText type="title">Reach World</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
    </PageView>
  );
}