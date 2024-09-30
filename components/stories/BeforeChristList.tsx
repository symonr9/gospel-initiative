import React, { useState, useEffect } from 'react';
import { type ViewProps, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { setSelectedOne } from '@/redux/actions';
import { PageColumn } from '../common/PageColumn';
import { Image } from 'expo-image';
import { AppText, TextType } from '../common/AppText';
import { EnhancedStory } from '@/models/story';
import { gridStyles } from '@/styles/Styles';
import { PageRow } from '../common/PageRow';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';

export type IBeforeChristList = ViewProps & {
    chapters: StoryChapter[];
};

function BeforeChristList({ chapters }: IBeforeChristList) {
    const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

    const selectedChapterIdx = chapters.findIndex((chapter) => chapter.id === activeChapterId);
    const activeChapter = selectedChapterIdx !== -1 ? chapters[selectedChapterIdx] : null;

    const renderItem = ({ item }: { item: StoryChapter }) => {
        const onPress = () => {
            setActiveChapterId(item.id);
        };

        return (
            <StoryChapterCard chapter={item}/>
        );
    };

    return (
        <PageColumn>
            <ScrollLayout style={{ }}>
                <FlatList
                    data={chapters}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={gridStyles.itemList}
                />
            </ScrollLayout>
        </PageColumn>
    );
}

const mapStateToProps = (state: any) => {
    return {
        chapters: state.stories.myStoryChapters,
    };
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(BeforeChristList);
