
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Story from '@/models/story';
import StoryChapter from '@/models/storyChapter';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IAddEditStoryForm = ViewProps & {
    storyChapters: StoryChapter[];
    story: Story;
};

function AddEditStoryForm({ style, storyChapters: initialChapters, story, ...otherProps }: IAddEditStoryForm) {
    const backgroundColor = useBackgroundThemeColor();

    const [chapters, setChapters] = useState<StoryChapter[]>(initialChapters);

    const renderItem = ({ item }: { item: StoryChapter }) => (
        <div>{item.title}</div>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={chapters}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEditStoryForm);