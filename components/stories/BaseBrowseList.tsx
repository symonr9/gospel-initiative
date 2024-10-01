import React, { useState } from 'react';
import { type ViewProps, FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Image } from 'expo-image';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { gridStyles } from '@/styles/Styles';
import StoryChapter from '@/models/storyChapter';
import { StoryChapterCard } from './StoryChapterCard';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { AppIcon } from '@/enums/enums';
import { mapStoryChapterTypeToAppIcon } from '@/utils/appUtils';

export type IBaseBrowseList = ViewProps & {
    title: string;
    chapters: StoryChapter[];
};

function BaseBrowseList({ title, chapters }: IBaseBrowseList) {
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
    };
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseBrowseList);
