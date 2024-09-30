import React from 'react';
import { type ViewProps } from 'react-native';
import { connect } from 'react-redux';

import StoryChapter from '@/models/storyChapter';
import BaseBrowseList from './BaseBrowseList';
import { StoryChapterType } from '@/enums/enums';

export type ISalvationMomentsList = ViewProps & {
    chapters: StoryChapter[];
};

function SalvationMomentsList({ chapters }: ISalvationMomentsList) {
    const chaptersToUse = chapters.filter((chapter) => chapter.chapterType === StoryChapterType.SalvationMoment);
    return (
        <BaseBrowseList title={'Salvation'}
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

export default connect(mapStateToProps, mapDispatchToProps)(SalvationMomentsList);