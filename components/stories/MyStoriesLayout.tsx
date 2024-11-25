import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, type ViewProps } from 'react-native';

import { AppIcon, StoryChapterType } from '@/enums/enums';
import ScrollLayout from '../common/ScrollLayout';
import StoryChapter from '@/models/storyChapter';
import { AnimatedBanner } from '../common/AnimatedBanner';
import { PageColumn } from '../common/PageColumn';
import BeforeChristList from './BeforeChristList';
import SalvationMomentsList from './SalvationMomentsList';
import AfterChristList from './AfterChristList';
import MyStoriesHeader from './MyStoriesHeader';
import BaseBrowseList from './BaseBrowseList';
import LoadingLayout from '../common/LoadingLayout';
import User from '@/models/user';

export type IMyStoriesLayout = ViewProps & {
    executor: User;
    myStoryChapters: StoryChapter[];
    error: Error;
    editingChapterId: string;
};

export enum StoryLayoutType {
    MyStoryNormal,
    Loading,

    // Gods Story
    Normal,
    Adding
};

function MyStoriesLayout({ executor, myStoryChapters, editingChapterId, error }: IMyStoriesLayout) {
    const [activeLayoutType, setActiveLayoutType] = useState(StoryLayoutType.Loading);
    const [message, setMessage] = useState<string | null>(null);

    const sortedChapters = myStoryChapters ? [...myStoryChapters].sort((a, b) => a.chapterType - b.chapterType) : [];

    useEffect(() => {
        if (!executor) {
            return;
        }
        setActiveLayoutType(StoryLayoutType.MyStoryNormal);
    }, [executor]);

    if (activeLayoutType === StoryLayoutType.Loading) {
        return (
            <LoadingLayout/>
        );
    }

    return (
        <PageColumn>
            {
                message && (
                    <AnimatedBanner iconSrc={AppIcon.Info}
                        text={message}
                        prefixText={'Info'}
                        onClick={() => setMessage(null)} />
                )}
            <PageColumn style={styles.container}>
                <MyStoriesHeader />
                <BaseBrowseList chapters={sortedChapters} />
            </PageColumn>
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        paddingHorizontal: 12,
    },
    iconDiv: {
        alignItems: 'center',
    },
    icon: {
        height: 82,
        width: 82,
    },
});

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
        myStoryChapters: state.stories.myStoryChapters,
        error: state.errors.error,
        editingChapterId: state.stories.editingChapterId
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoriesLayout);
