
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Story from '@/models/story';
import StoryChapter from '@/models/storyChapter';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { StoryChapterCardView } from './StoryChapterCardView';

export type IStoryChaptersListView = ViewProps & {
    storyChapters: StoryChapter[];
    story: Story;
};

function StoryChaptersListView({ style, storyChapters, story, ...otherProps }: IStoryChaptersListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: StoryChapter }) => (
        <StoryChapterCardView storyChapter={item}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(StoryChaptersListView);