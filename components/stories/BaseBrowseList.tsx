import React, { useState } from 'react';
import { type ViewProps, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { gridStyles } from '@/styles/Styles';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';

export type IBaseBrowseList = ViewProps & {
    chapters: StoryChapter[];
};

function BaseBrowseList({ chapters }: IBaseBrowseList) {
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
    };
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseBrowseList);
