
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Story from '@/models/story';
import StoryChapter from '@/models/storyChapter';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IStoriesListView = ViewProps & {
    storyChapters: StoryChapter[];
    story: Story;
};

function StoriesListView({ style, storyChapters, story, ...otherProps }: IStoriesListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: StoryChapter }) => (
        <div>{item.title}</div>
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

const mapStateToProps = (state: IStoriesListView) => ({
    storyChapters: state.storyChapters,
    story: state.story
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesListView);