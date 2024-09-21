import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { Image } from 'expo-image';

import { AppIcon, FadeDirection, Page, RoadContainerType } from '@/enums/enums';
import SimpleIconButton from '../common/SimpleIconButton';
import Story, { EnhancedStory } from '@/models/story';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectPartionedEnhancedStories } from '@/redux/selectors';
import { StoryCard } from './StoryCard';
import { mapStoryTypeToText } from '@/utils/appUtils';
import StoryDetails from './StoryDetails';
import AddEditStoryForm from './AddEditStoryForm';
import { PageRow } from '../common/PageRow';
import StoryActivityHeatMapChart from '../common/StoryActivityHeatMapChart';
import { RoadContainer } from '../common/RoadContainer';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';
import DetailsSection from '../common/DetailsSection';

export type IMyStoriesLayout = ViewProps & {
    personalStories: EnhancedStory[];
};

export enum StoryLayoutType {
    Normal,
    Editing,
    Adding
};

function MyStoriesLayout({ personalStories }: IMyStoriesLayout) {
    const [activeStoryId, setActiveStoryId] = useState(null);
    const [activeLayoutType, setActiveLayoutType] = useState(StoryLayoutType.Normal);

    const personalStoryCursorIdx = personalStories.findIndex((story) => story.id === activeStoryId);
    const activeStory = personalStoryCursorIdx !== -1 ? personalStories[personalStoryCursorIdx] : null;

    const personalStoryItemsToRender = personalStories ? personalStories.map((story, idx) => (
        <StoryCard story={story}
            setActiveStoryId={setActiveStoryId}
            key={story.id} />
    )) : [];

    const title = activeStory !== null ? activeStory.title : 'Stories';
    const subtitle = activeStory !== null ? mapStoryTypeToText(activeStory.type) : 'Select a story to begin.';

    const onEditStoryClick = () => {
        setActiveLayoutType(StoryLayoutType.Editing);
    };

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <PageRow spaceEvenly>
                    {
                        activeStory && (

                            <>
                                <SimpleIconButton iconSrc={AppIcon.ArrowBack}
                                    title={'Back'}
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
                                    title={'Edit'}
                                    customStyles={{
                                        container: {
                                            alignSelf: 'flex-end',
                                            marginBottom: 16
                                        }
                                    }} />
                            </>

                        )
                    }
                </PageRow>

                {
                    activeStory && (
                        <View style={styles.iconDiv}>
                            <Image source={activeStory.icon} style={styles.icon} />
                        </View>
                    )
                }

                <AnimatedHeader title={title}
                    subtitle={subtitle}
                    delay={0} />

                <AddEditStoryForm activeStory={activeStory} activeLayoutType={activeLayoutType} />
                <StoryDetails activeStory={activeStory} activeLayoutType={activeLayoutType} />

                {
                    activeStory === null && (
                        <>
                        <View>
                            <RoadContainer title={'My Story'}
                                iconSrc={AppIcon.Book}
                                itemsToRender={personalStoryItemsToRender}
                                type={RoadContainerType.Incoming}
                                expandedHeight={120}
                                isTopPosition={false}
                                activeType={RoadContainerType.Incoming}
                                setActiveType={() => {}}
                                customStyles={myStoryStyle} />
                        </View>
    
                        <StoryActivityHeatMapChart />
                    </>
                    )
                }
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    iconDiv: {
        alignItems: 'center',
    },
    icon: {
        height: 82,
        width: 82,
    },
});

const myStoryStyle = {
    container: {
        backgroundColor: Colors.light.alternate1,
    },
    title: {
        color: Colors.light.alternateText
    },
};

const mapStateToProps = (state: any) => {
    const { personalStories } = selectPartionedEnhancedStories(state);
    return {
        personalStories,
    };
}

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoriesLayout);