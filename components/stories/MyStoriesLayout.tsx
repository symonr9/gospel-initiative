import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon } from '@/enums/enums';
import SimpleIconButton from '../common/SimpleIconButton';
import { EnhancedStory } from '@/models/story';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectPartionedEnhancedStories } from '@/redux/selectors';
import { StoryCard } from './StoryCard';
import { mapStoryTypeToText } from '@/utils/appUtils';
import { PageRow } from '../common/PageRow';
import { Colors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';
import PracticeMyStoryDetails from './PracticeMyStoryDetails';
import StoryChapter from '@/models/storyChapter';
import error from '@/models/error';
import { clearAppError } from '@/redux/actions';
import { AnimatedBanner } from '../common/AnimatedBanner';

export type IMyStoriesLayout = ViewProps & {
    chapters: StoryChapter[];
};

export enum StoryLayoutType {
    Normal,
    Editing,
    Adding,
    Practice,
    Browse
};

function MyStoriesLayout({ chapters }: IMyStoriesLayout) {
    const [activeStoryId, setActiveStoryId] = useState(null);
    const [activeLayoutType, setActiveLayoutType] = useState(StoryLayoutType.Normal);
    const [message, setMessage] = useState<string | null>(null);

    const onEditStoryClick = () => {
        setActiveLayoutType(StoryLayoutType.Editing);
    };

    const Body = [];

    if (activeLayoutType === StoryLayoutType.Practice) {
        Body.push(
            <>
                <PracticeMyStoryDetails setActiveLayoutType={setActiveLayoutType} />
            </>
        );
    } else if (activeLayoutType === StoryLayoutType.Browse) {
        Body.push(
            <>
            </>
        );
    } else if (activeLayoutType === StoryLayoutType.Normal) {
        Body.push(
            <>
                <AnimatedHeader title={'My Stories'}
                    subtitle={'Practice your testimony and compile your faith journey.'}
                    delay={0} />

                <PageRow spaceEvenly>
                    <SimpleIconButton iconSrc={AppIcon.Conversation}
                        onClick={() => setActiveLayoutType(StoryLayoutType.Practice)}
                        title={'Practice'} />

                    <SimpleIconButton iconSrc={AppIcon.Book}
                        onClick={() => setActiveLayoutType(StoryLayoutType.Browse)}
                        title={'Browse'} />
                </PageRow>
            </>
        );
    } else {
        Body.push(
            <>
            </>
        );
    }

    return (
        <ScrollLayout>
            {
                message && (
                    <AnimatedBanner iconSrc={AppIcon.Info}
                        text={message}
                        prefixText={'Info'}
                        onClick={() => setMessage(null)} />
            )}
            <View style={styles.container}>
                {Body.map((item) => item)}
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

const mapStateToProps = (state: any) => {
    const { personalStories } = selectPartionedEnhancedStories(state);
    return {
        personalStories,
        chapters: state.stories.storyChapters
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoriesLayout);
