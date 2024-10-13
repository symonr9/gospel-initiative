import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppIcon, StoryChapterType } from '@/enums/enums';
import { selectPartionedEnhancedStories } from '@/redux/selectors';
import ScrollLayout from '../common/ScrollLayout';
import StoryChapter from '@/models/storyChapter';
import { AnimatedBanner } from '../common/AnimatedBanner';
import BrowseChaptersList from './BrowseChaptersList';
import { PageColumn } from '../common/PageColumn';
import BeforeChristList from './BeforeChristList';
import SalvationMomentsList from './SalvationMomentsList';
import AfterChristList from './AfterChristList';
import PageHeader from '../common/PageHeader';
import { PageSubHeader } from '../common/PageSubHeader';
import { AnimatedHeader } from '../common/AnimatedHeader';
import DetailsSection from '../common/DetailsSection';
import { PageRow } from '../common/PageRow';

export type IMyStoriesLayout = ViewProps & {
    chapters: StoryChapter[];
    error: Error;
};

export enum StoryLayoutType {
    BeforeChrist,
    SalvationMoment,
    AfterChrist,
};

function MyStoriesLayout({ chapters, error }: IMyStoriesLayout) {
    const [activeLayoutType, setActiveLayoutType] = useState(StoryLayoutType.BeforeChrist);
    const [message, setMessage] = useState<string | null>(null);


    const chaptersIsLoaded = chapters !== null;
    const beforeChristChapters = chapters.filter((value) => value.chapterType === StoryChapterType.BeforeChrist);
    const salvationMomentChapters = chapters.filter((value) => value.chapterType === StoryChapterType.SalvationMoment);
    const afterChristChapters = chapters.filter((value) => value.chapterType === StoryChapterType.AfterChrist);

    return (
        <PageColumn>
            {
                message && (
                    <AnimatedBanner iconSrc={AppIcon.Info}
                        text={message}
                        prefixText={'Info'}
                        onClick={() => setMessage(null)} />
                )}
            <ScrollLayout>
                <PageColumn style={styles.container}>
                    <PageColumn style={{ backgroundColor: 'white', height: 200 }}>
                        <AnimatedHeader title={'My Stories'} subtitle={'Your testimony, organized'} />
                        {
                            chaptersIsLoaded && (
                                <PageColumn>
                                    <PageRow spaceEvenly style={{ gap: 8 }}>
                                        <DetailsSection iconSrc={AppIcon.Rainy}
                                            prefix={"Before Christ"}
                                            title={`${beforeChristChapters.length}`} />
                                        <DetailsSection iconSrc={AppIcon.OpenHands}
                                            prefix={"Salvation Moment"}
                                            title={`${salvationMomentChapters.length}`} />
                                        <DetailsSection iconSrc={AppIcon.PlantGrow}
                                            prefix={"After Christ"}
                                            title={`${afterChristChapters.length}`} />
                                    </PageRow>
                                </PageColumn>
                            )
                        }


                    </PageColumn>
                    <BeforeChristList />
                    <SalvationMomentsList />
                    <AfterChristList />
                </PageColumn>
            </ScrollLayout>
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 32,
        paddingHorizontal: 8,
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
