
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Story from '@/models/story';
import StoryChapter from '@/models/storyChapter';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { StoryChapterCard } from './StoryChapterCard';

export type IStoryChaptersList = ViewProps & {
    storyChapters: StoryChapter[];
    story: Story;
};

function StoryChaptersList({ style, storyChapters, story, ...otherProps }: IStoryChaptersList) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: StoryChapter }) => (
        <StoryChapterCard storyChapter={item}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={storyChapters}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    storyChapters: state.stories.storyChapters,
    story: state.stories.story
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(StoryChaptersList);