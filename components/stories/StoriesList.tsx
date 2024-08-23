
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Story from '@/models/story';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { StoryCard } from './StoryCard';

export type IStoriesList = ViewProps & {
    stories: Story[];
};

function StoriesList({ style, stories, ...otherProps }: IStoriesList) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: Story }) => (
        <StoryCard story={item}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={stories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    stories: state.stories.stories
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);