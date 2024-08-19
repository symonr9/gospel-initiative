
import Ionicons from '@expo/vector-icons/Ionicons';

import PageView from '@/components/common/PageView';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/tab-styles';
import { OnesListView } from '@/components/ones/OnesListView';

export default function ShareChrist() {
    return (
        <PageView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={<Ionicons size={100} name="chatbubbles" style={tabStyles.headerImage} />}>
            <ThemedView style={tabStyles.titleContainer}>
                <ThemedText type="title">Share Christ</ThemedText>
            </ThemedView>

            <OnesListView />

        </PageView>
    );
}


