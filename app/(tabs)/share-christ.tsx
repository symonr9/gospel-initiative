
import Ionicons from '@expo/vector-icons/Ionicons';

import PageView from '@/components/common/PageView';
import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';

import { tabStyles } from '../../styles/styles';
import { OnesListView } from '@/components/ones/OnesListView';

export default function ShareChrist() {
    return (
        <PageView>
            <ThemedView style={tabStyles.titleContainer}>
                <ThemedText type="title">Share Christ</ThemedText>
            </ThemedView>

            <OnesListView />

        </PageView>
    );
}


