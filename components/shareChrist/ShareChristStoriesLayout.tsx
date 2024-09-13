import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { Image } from 'expo-image';

import { AppIcon, FadeDirection, Page, RoadContainerType, ShareChristPageState } from '@/enums/enums';
import SimpleIconButton from '../common/SimpleIconButton';
import Story, { EnhancedStory } from '@/models/story';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectPartionedEnhancedStories } from '@/redux/selectors';
import { ShareChristStoryCard } from './ShareChristStoryCard';
import { openPage } from '@/redux/actions';
import { mapStoryTypeToText } from '@/utils/appUtils';
import ShareChristStoryDetails from './ShareChristStoryDetails';
import ShareChristAddEditStoryForm from './ShareChristAddEditStoryForm';
import { AnimatedCard } from '../common/AnimatedCard';
import { PageRow } from '../common/PageRow';
import { layoutStyles } from '@/styles/Styles';
import StoryActivityHeatMapChart from '../common/StoryActivityHeatMapChart';
import { ShareChristRoadContainer } from './ShareChristRoadContainer';
import { Colors } from '@/constants/Colors';

export type IShareChristStoriesLayout = ViewProps & {
    personalStories: EnhancedStory[];
    GodsStories: EnhancedStory[];
    shareChristPageState: ShareChristPageState;
    openPage: Function;
};

export enum StoryLayoutType {
    Normal,
    Editing,
    Adding
};

function ShareChristStoriesLayout({ personalStories, GodsStories, shareChristPageState, openPage }: IShareChristStoriesLayout) {
    const [activeStoryId, setActiveStoryId] = useState(null);
    const [activeLayoutType, setActiveLayoutType] = useState(StoryLayoutType.Normal);
    const [activeRoadType, setActiveRoadType] = useState(RoadContainerType.Incoming);

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

    const onEditStoryClick = () => {
        setActiveLayoutType(StoryLayoutType.Editing);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    activeStory && (

                        <>
                            <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                                onClick={() => {
                                    if (activeLayoutType === StoryLayoutType.Editing) {
                                        setActiveLayoutType(StoryLayoutType.Normal);
                                    } else if (activeStoryId != null) {
                                        setActiveStoryId(null);
                                        return;
                                    }
                                }}
                                customStyles={{
                                    container: {
                                        alignSelf: 'flex-start',
                                        marginBottom: 16
                                    }
                                }} />

                            <SimpleIconButton iconSrc={AppIcon.Pencil}
                                onClick={onEditStoryClick}
                                customStyles={{
                                    container: {
                                        alignSelf: 'flex-end',
                                        marginBottom: 16
                                    }
                                }} />
                        </>

                    )
                }
            </View>

            {
                activeStory && (
                    <View style={styles.iconDiv}>
                        <Image source={activeStory.icon} style={styles.icon} />
                    </View>
                )
            }

            <AnimatedHeader title={title}
                subtitle={subtitle}
                delay={0}
                style={{ textAlign: 'center' }} />

            {
                activeStory === null && (
                    <PageRow spaceBetween>
                        <AnimatedCard text={7}
                            direction={FadeDirection.Left}
                            label='Chapters Remaining' />
                        <AnimatedCard text={7}
                            direction={FadeDirection.Right}
                            label={`God's Story`} />
                    </PageRow>
                )
            }

            <ShareChristAddEditStoryForm activeStory={activeStory} activeLayoutType={activeLayoutType} />
            <ShareChristStoryDetails activeStory={activeStory} activeLayoutType={activeLayoutType} />

            <View>
                <ShareChristRoadContainer title={`God's Story`}
                    iconSrc={AppIcon.Book}
                    itemsToRender={GodsStoryItemsToRender}
                    type={RoadContainerType.Completed}
                    expandedHeight={160}
                    activeType={activeRoadType}
                    setActiveType={setActiveRoadType}
                    customStyles={GodsStoryStyle} />
                <ShareChristRoadContainer title={'My Story'}
                    iconSrc={AppIcon.Book}
                    itemsToRender={personalStoryItemsToRender}
                    type={RoadContainerType.Incoming}
                    expandedHeight={160}
                    isTopPosition={false}
                    activeType={activeRoadType}
                    setActiveType={setActiveRoadType}
                    customStyles={myStoryStyle} />
            </View>

            <StoryActivityHeatMapChart />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconDiv: {
        alignItems: 'center',
    },
    icon: {
        height: 100,
        width: 100,
    },
});

const myStoryStyle = {
    container: {
        backgroundColor: Colors.light.alternate1,
    },
    title: {
        color: Colors.light.alternateText
    },
    header: {
    },
    itemsContainer: {

    }
};

const GodsStoryStyle = {
    container: {
        backgroundColor: Colors.light.primary,
    },
    title: {
        color: Colors.light.alternateText
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