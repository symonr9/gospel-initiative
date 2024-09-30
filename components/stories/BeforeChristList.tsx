import React from 'react';
import { type ViewProps } from 'react-native';
import { connect } from 'react-redux';

import StoryChapter from '@/models/storyChapter';
import BaseBrowseList from './BaseBrowseList';
import { StoryChapterType } from '@/enums/enums';

export type IBeforeChristList = ViewProps & {
    chapters: StoryChapter[];
};

function BeforeChristList({ chapters }: IBeforeChristList) {
    const chaptersToUse = chapters.filter((chapter) => chapter.chapterType === StoryChapterType.BeforeChrist);
    return (
        <BaseBrowseList title={'Before Christ'}
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

export default connect(mapStateToProps, mapDispatchToProps)(BeforeChristList);
