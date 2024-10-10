import React, { useState } from 'react';
import { type ViewProps, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { PageColumn } from '../common/PageColumn';
import { gridStyles } from '@/styles/Styles';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';
import { AppText, TextType } from '../common/AppText';
import User from '@/models/user';
import { refreshData, setAppError } from '@/redux/actions';

export type IBaseBrowseList = ViewProps & {
    title: string;
    chapters: StoryChapter[];
    executor: User;
    setAppError: Function;
    refreshData: Function;
};

function BaseBrowseList({ title, chapters, executor, setAppError, refreshData }: IBaseBrowseList) {
    const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
    const [openedChapterIds, setOpenedChapterIds] = useState<string[]>([]);

    const selectedChapterIdx = chapters.findIndex((chapter) => chapter.id === editingChapterId);
    const activeChapter = selectedChapterIdx !== -1 ? chapters[selectedChapterIdx] : null;

    const renderItem = ({ item }: { item: StoryChapter }) => { 
        const isEditing = editingChapterId === item.id;
        if (editingChapterId !== null) {
            if (!isEditing) {
                return <></>;
            }
        }

        return (
            <StoryChapterCard chapter={item} 
                setEditingChapterId={setEditingChapterId} 
                setAppError={setAppError}
                refreshData={refreshData}
                executor={executor}
                editing={isEditing}/>
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
        executor: state.users.executor,
    };
};

const mapDispatchToProps = {
    setAppError,
    refreshData
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseBrowseList);
