import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import SimpleIconButton from '../common/SimpleIconButton';
import Story, { EnhancedStory } from '@/models/story';
import { AppText } from '../common/AppText';
import { ShareChristStoriesContainer } from './ShareChristStoriesContainer';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectPartionedEnhancedStories } from '@/redux/selectors';
import { ShareChristStoryCard } from './ShareChristStoryCard';
import { openPage } from '@/redux/actions';
import { mapStoryTypeToText } from '@/utils/appUtils';
import ShareChristStoryDetails from './ShareChristStoryDetails';

export type IShareChristStoriesLayout = ViewProps & {
    personalStories: EnhancedStory[];
    GodsStories: EnhancedStory[];
    shareChristPageState: ShareChristPageState;
    openPage: Function;
};

export enum StoryLayoutType {
    ListAll,
    MyStory,
    GodsStory
};

function ShareChristStoriesLayout({ personalStories, GodsStories, shareChristPageState, openPage }: IShareChristStoriesLayout) {

    console.log(personalStories);
    console.log(GodsStories);

    const [activeStoryId, setActiveStoryId] = useState(null);
    const [activeLayoutType, setActiveLayoutType] = useState(StoryLayoutType.ListAll);

    const personalStoryCursorIdx = personalStories.findIndex((story) => story.id === activeStoryId);
    const GodsStoryCursorIdx = GodsStories.findIndex((story) => story.id === activeStoryId);

    const activeStory = (() => {
        if (personalStoryCursorIdx !== -1) 
            return personalStories[personalStoryCursorIdx];
        else if (GodsStoryCursorIdx !== -1) 
            return GodsStories[GodsStoryCursorIdx];
        return null;
    })();

    const personalStoryItemsToRender = personalStories ? personalStories.map((story, idx) => (
        <ShareChristStoryCard story={story}
            setActiveStoryId={setActiveStoryId}
            key={story.id} />
    )) : [];

    const GodsStoryItemsToRender = GodsStories ? GodsStories.map((story, idx) => (
        <ShareChristStoryCard story={story}
            setActiveStoryId={setActiveStoryId}
            key={story.id} />
    )) : [];

    const title = activeStory !== null ? activeStory.title : 'Stories';
    const subtitle = activeStory !== null ? mapStoryTypeToText(activeStory.type) : 'Select a story to begin.';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                    onClick={() => {
                        if (activeStoryId != null) {
                            setActiveStoryId(null);
                            return;
                        }
                        openPage(Page.ShareChrist);
                    }}
                    customStyles={{
                        container: {
                            alignSelf: 'flex-start',
                            marginBottom: 16
                        }
                    }} />
            </View>

            <AnimatedHeader title={title}
                subtitle={subtitle}
                delay={0}
                style={{ textAlign: 'center' }} />

            <ShareChristStoryDetails activeStory={activeStory} />

            <View style={styles.storiesListContainer}>
                <ShareChristStoriesContainer title={`My Story`}
                    iconSrc={AppIcon.Book}
                    type={StoryLayoutType.MyStory}
                    activeType={activeLayoutType}
                    setActiveType={setActiveLayoutType}
                    itemsToRender={personalStoryItemsToRender}
                    activeStoryId={activeStoryId}
                    customStyles={myStoryStyle} />
                <ShareChristStoriesContainer title={`God's Story`}
                    iconSrc={AppIcon.Book}
                    type={StoryLayoutType.GodsStory}
                    activeType={activeLayoutType}
                    setActiveType={setActiveLayoutType}
                    itemsToRender={GodsStoryItemsToRender}
                    activeStoryId={activeStoryId}
                    customStyles={GodsStoryStyle} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    storiesListContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 200,
        justifyContent: 'center',
        flex: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const myStoryStyle = {
    container: {
        // backgroundColor: '#f7f07f'
    },
    header: {

    },
    itemsContainer: {

    }
};

const GodsStoryStyle = {
    container: {
        // backgroundColor: '#f7f07f'
    },
    header: {

    },
    itemsContainer: {

    }
};

const mapStateToProps = (state: any) => {
    const { personalStories, GodsStories } = selectPartionedEnhancedStories(state);
    return {
        shareChristPageState: state.app.shareChristPageState,
        personalStories,
        GodsStories,
    };
}

const mapDispatchToProps = {
    openPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristStoriesLayout);