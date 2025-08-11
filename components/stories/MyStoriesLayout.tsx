import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import { AnimatedBanner } from '../common/AnimatedBanner';
import { PageColumn } from '../common/PageColumn';
import MyStoriesHeader from './MyStoriesHeader';
import BaseBrowseList from './BaseBrowseList';
import LoadingLayout from '../common/LoadingLayout';
import User from '@/models/user';
import { setAddingStory } from '@/redux/actions';
import AddMyStoryForm from './AddMyStoryForm';

export type IMyStoriesLayout = ViewProps & {
    executor: User;
    myStoryChapters: StoryChapter[];
    error: Error;
    editingChapterId: string;
    dataRefreshLoading: boolean;
    addingStory: boolean;
    setAddingStory: Function;
};

export enum StoryLayoutType {
    MyStoryNormal,
    Loading,

    // Gods Story
    Normal,
    Adding
};

function MyStoriesLayout({ executor, myStoryChapters, editingChapterId, error, dataRefreshLoading, addingStory, setAddingStory }: IMyStoriesLayout) {
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
            <LoadingLayout />
        );
    }

    if (addingStory) {
        return <AddMyStoryForm />;
    }

    return (
        <PageColumn style={{ marginBottom: 20 }}>
            {
                message && (
                    <AnimatedBanner iconSrc={AppIcon.Info}
                        text={message}
                        prefixText={'Info'}
                        onClick={() => setMessage(null)} />
                )}

            {
                dataRefreshLoading ? (
                    <LoadingLayout />
                ) : (
                    <PageColumn style={styles.container}>
                        <MyStoriesHeader />
                        <BaseBrowseList chapters={sortedChapters} />
                    </PageColumn>
                )
            }
        </PageColumn >
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
        addingStory: state.stories.addingStory,
        error: state.errors.error,
        editingChapterId: state.stories.editingChapterId,
        dataRefreshLoading: state.app.dataRefreshLoading,
    };
}

const mapDispatchToProps = {
    setAddingStory,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoriesLayout);
