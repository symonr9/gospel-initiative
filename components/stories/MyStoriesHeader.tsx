import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, type ViewProps } from 'react-native';

import { AppIcon, StoryChapterTag, StoryChapterType } from '@/enums/enums';
import ScrollLayout from '../common/ScrollLayout';
import StoryChapter from '@/models/storyChapter';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import DetailsSection from '../common/DetailsSection';
import { PageRow } from '../common/PageRow';
import { mapStoryChapterTagToText, partitionChaptersByTag, toggleTagFromFilter, toggleTypeFromFilter } from '@/utils/appUtils';
import { PageChip } from '../common/PageChip';
import { updateChaptersFilter } from '@/redux/actions';

export type IMyStoriesHeader = ViewProps & {
    chapters: StoryChapter[];
    tagFilters: StoryChapterTag[];
    typeFilters: StoryChapterType[];
    error: Error;
    updateChaptersFilter: Function;
};

export enum StoryLayoutType {
    BeforeChrist,
    SalvationMoment,
    AfterChrist,
};

function MyStoriesHeader({ chapters, tagFilters, typeFilters, updateChaptersFilter, error }: IMyStoriesHeader) {
    const [message, setMessage] = useState<string | null>(null);

    const chaptersIsLoaded = chapters !== null;
    const beforeChristChapters = chapters.filter((value) => value.chapterType === StoryChapterType.BeforeChrist);
    const salvationMomentChapters = chapters.filter((value) => value.chapterType === StoryChapterType.SalvationMoment);
    const afterChristChapters = chapters.filter((value) => value.chapterType === StoryChapterType.AfterChrist);

    const partitionedChapters = partitionChaptersByTag(chapters);

    const beforeChristClick = () => {
        updateChaptersFilter(tagFilters, toggleTypeFromFilter(StoryChapterType.BeforeChrist, typeFilters));
    };

    const salvationMomentClick = () => {
        updateChaptersFilter(tagFilters, toggleTypeFromFilter(StoryChapterType.SalvationMoment, typeFilters));
    };

    const afterChristClick = () => {
        updateChaptersFilter(tagFilters, toggleTypeFromFilter(StoryChapterType.AfterChrist, typeFilters));
    };

    const isFilteringBeforeChrist = typeFilters?.includes(StoryChapterType.BeforeChrist);
    const isFilteringSalvationMoment = typeFilters?.includes(StoryChapterType.SalvationMoment);
    const isFilteringAfterChrist = typeFilters?.includes(StoryChapterType.AfterChrist);

    console.log("TAG FILTER: ", tagFilters, " type  - ", typeFilters);

    return (
        <ScrollLayout style={{ height: 200 }}>
            <PageColumn style={{}}>
                <AnimatedHeader title={'My Stories'} subtitle={'Tap type and tags below to filter list.'} />

                {
                    chaptersIsLoaded && (
                        <PageRow style={{ gap: 24, marginVertical: 12, marginHorizontal: 8 }}>
                            <DetailsSection iconSrc={AppIcon.Rainy}
                                prefix={"Before Christ"}
                                onClick={beforeChristClick}
                                style={[isFilteringBeforeChrist && styles.selectedTypeFilter]}
                                title={`${beforeChristChapters.length}`} />
                            <DetailsSection iconSrc={AppIcon.OpenHands}
                                prefix={"Salvation Moment"}
                                onClick={salvationMomentClick}
                                style={[isFilteringSalvationMoment && styles.selectedTypeFilter]}
                                title={`${salvationMomentChapters.length}`} />
                            <DetailsSection iconSrc={AppIcon.PlantGrow}
                                prefix={"After Christ"}
                                onClick={afterChristClick}
                                style={[isFilteringAfterChrist && styles.selectedTypeFilter]}
                                title={`${afterChristChapters.length}`} />
                        </PageRow>
                    )
                }

                <PageRow style={{ flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                    {
                        partitionedChapters.map((value: { key: StoryChapterTag, items: StoryChapter[] }) => {
                            const onClick = () => {
                                updateChaptersFilter(toggleTagFromFilter(value.key, tagFilters), typeFilters);
                            };

                            const label = mapStoryChapterTagToText(value.key);
                            const isFiltering = tagFilters.includes(value.key);

                            return (
                                <PageChip title={`${label} (${value.items.length})`}
                                    onClick={onClick}
                                    style={[{ flexBasis: '15%', }, isFiltering && styles.selectedTagFilter]} />
                            );
                        })
                    }
                </PageRow>

            </PageColumn>
        </ScrollLayout>
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
    selectedTypeFilter: {
        backgroundColor: '#d0e0e3',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    selectedTagFilter: {
        backgroundColor: '#d0e0e3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
});

const mapStateToProps = (state: any) => {
    return {
        chapters: state.stories.myStoryChapters,
        tagFilters: state.stories.tagFilters,
        typeFilters: state.stories.typeFilters,
        error: state.errors.error
    };
}

const mapDispatchToProps = {
    updateChaptersFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoriesHeader);
