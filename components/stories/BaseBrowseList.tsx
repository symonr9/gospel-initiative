import React, { useState } from 'react';
import { type ViewProps, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { PageColumn } from '../common/PageColumn';
import { gridStyles } from '@/styles/Styles';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';
import { AppText, TextType } from '../common/AppText';
import User from '@/models/user';
import { refreshData, setAppError, setEditingChapterId } from '@/redux/actions';
import ScrollLayout from '../common/ScrollLayout';
import { StoryChapterTag, StoryChapterType } from '@/enums/enums';
import { countRenderableChapters, doesChapterMatchFilter } from '@/utils/appUtils';

export type IBaseBrowseList = ViewProps & {
    title: string;
    chapters: StoryChapter[];
    executor: User;
    setAppError: Function;
    refreshData: Function;
    tagFilters: StoryChapterTag[];
    typeFilters: StoryChapterType[];
    editingChapterId: string;
    setEditingChapterId: Function;
};

function BaseBrowseList({ title, chapters, executor, setAppError, refreshData, tagFilters, typeFilters, editingChapterId, setEditingChapterId }: IBaseBrowseList) {
    const [openedChapterIds, setOpenedChapterIds] = useState<string[]>([]);

    const selectedChapterIdx = chapters.findIndex((chapter) => chapter.id === editingChapterId);
    const activeChapter = selectedChapterIdx !== -1 ? chapters[selectedChapterIdx] : null;

    if (editingChapterId !== null && activeChapter) {
        return (
            <PageColumn style={{ height: 800 }}>
                <AppText type={TextType.Subtitle}>
                    {title} ({chapters.length})
                </AppText>

                <StoryChapterCard chapter={activeChapter}
                    setEditingChapterId={setEditingChapterId}
                    setAppError={setAppError}
                    refreshData={refreshData}
                    executor={executor}
                    editing={true} />
            </PageColumn>
        );
    }

    const renderItem = ({ item }: { item: StoryChapter }) => {
        if (!doesChapterMatchFilter(item, tagFilters, typeFilters)) {
            return <></>;
        }
    
        return (
            <StoryChapterCard chapter={item}
                setEditingChapterId={setEditingChapterId}
                setAppError={setAppError}
                refreshData={refreshData}
                executor={executor}
                editing={false} />
        );
    };

    const filteredListCount = countRenderableChapters(chapters, tagFilters, typeFilters);

    return (
        <PageColumn>
            <AppText type={TextType.Subtitle}>
                {title} ({filteredListCount})
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
        executor: state.users.executor,
        tagFilters: state.stories.tagFilters,
        typeFilters: state.stories.typeFilters,
        editingChapterId: state.stories.editingChapterId,
    };
};

const mapDispatchToProps = {
    setAppError,
    refreshData,
    setEditingChapterId,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseBrowseList);
