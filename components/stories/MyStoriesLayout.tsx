import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon } from '@/enums/enums';
import SimpleIconButton from '../common/SimpleIconButton';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { selectPartionedEnhancedStories } from '@/redux/selectors';
import { PageRow } from '../common/PageRow';
import ScrollLayout from '../common/ScrollLayout';
import PracticeMyStoryDetails from './PracticeMyStoryDetails';
import StoryChapter from '@/models/storyChapter';
import { AnimatedBanner } from '../common/AnimatedBanner';
import BrowseChaptersList from './BrowseChaptersList';

export type IMyStoriesLayout = ViewProps & {
    chapters: StoryChapter[];
    error: Error;
};

export enum StoryLayoutType {
    Normal,
    Editing,
    Adding,
    Practice
};

function MyStoriesLayout({ chapters, error }: IMyStoriesLayout) {
    const [activeLayoutType, setActiveLayoutType] = useState(StoryLayoutType.Normal);
    const [message, setMessage] = useState<string | null>(null);

    const Body = [];

    if (error) {
        Body.push(<></>);
    } else if (activeLayoutType === StoryLayoutType.Practice) {
        Body.push(
            <>
                <PracticeMyStoryDetails setActiveLayoutType={setActiveLayoutType} />
            </>
        );
    } else if (activeLayoutType === StoryLayoutType.Normal) {
        Body.push(
            <>
                <AnimatedHeader title={'My Stories'}
                    subtitle={'Practice your testimony and compile your faith journey.'}
                    delay={0} />

                <PageRow spaceEvenly style={{ marginTop: 8, marginBottom: 12 }}>
                    <SimpleIconButton iconSrc={AppIcon.Conversation}
                        onClick={() => setActiveLayoutType(StoryLayoutType.Practice)}
                        title={'Practice'} />
                </PageRow>

                <BrowseChaptersList setActiveLayoutType={setActiveLayoutType}/>
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
        paddingHorizontal: 8
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
        chapters: state.stories.myStoryChapters,
        error: state.errors.error
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoriesLayout);
