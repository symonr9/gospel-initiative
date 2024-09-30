import React from 'react';
import { type ViewProps } from 'react-native';
import { connect } from 'react-redux';

import StoryChapter from '@/models/storyChapter';
import BaseBrowseList from './BaseBrowseList';
import { StoryChapterType } from '@/enums/enums';

export type IAfterChristList = ViewProps & {
    chapters: StoryChapter[];
};

function AfterChristList({ chapters }: IAfterChristList) {
    const chaptersToUse = chapters.filter((chapter) => chapter.chapterType === StoryChapterType.AfterChrist);
    return (
        <BaseBrowseList title={'After Christ'}
            chapters={chaptersToUse}/>
    );
}

const mapStateToProps = (state: any) => {
    return {
        chapters: state.stories.myStoryChapters,
    };
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(AfterChristList);
