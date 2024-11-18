import React from 'react';
import { type ViewProps, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { Image } from 'expo-image';
import { AppText, TextType } from '../common/AppText';
import { EnhancedStory } from '@/models/story';
import { gridStyles } from '@/styles/Styles';
import { PageRow } from '../common/PageRow';

export type IStoryChaptersList = ViewProps & {
    stories: EnhancedStory[];
    activeStoryId?: string | null;
    setActiveStoryId?: Function;
};

function StoryChaptersList({ stories, activeStoryId = null, setActiveStoryId }: IStoryChaptersList) {
    const renderItem = ({ item }: { item: EnhancedStory }) => {
        const onPress = () => {
            if (setActiveStoryId) {
                setActiveStoryId(item.id);
            }
        };

        return (
            <TouchableOpacity onPress={onPress}>
                <PageRow style={gridStyles.itemCard}>
                    <Image source={item.icon} style={gridStyles.img}/>
                    <AppText type={TextType.DefaultSemiBold}>
                        {item.title}
                    </AppText>
                </PageRow>
            </TouchableOpacity>
        );
    };

    return (
        <PageColumn>
            <PageColumn style={{ }}>
                <FlatList
                    data={stories}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={gridStyles.itemList}
                />
            </PageColumn>
        </PageColumn>
    );
}

const mapStateToProps = (state: any) => {
    return {
        ones: state.ones.ones,
    };
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryChaptersList);
