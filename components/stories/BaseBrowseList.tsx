import React, { useState } from 'react';
import { type ViewProps, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { gridStyles } from '@/styles/Styles';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';
import { AppText, TextType } from '../common/AppText';

export type IBaseBrowseList = ViewProps & {
    title: string;
    chapters: StoryChapter[];
};

function BaseBrowseList({ title, chapters }: IBaseBrowseList) {
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
            <AppText type={TextType.Subtitle}>
                {title} ({chapters.length})
            </AppText>
                <FlatList
                    data={chapters}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={gridStyles.itemList}
                />
        </PageColumn>
    );
}

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseBrowseList);
