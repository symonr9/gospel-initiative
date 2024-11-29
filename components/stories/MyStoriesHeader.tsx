import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Modal, TouchableOpacity, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import { AppIcon, StoryChapterTag, StoryChapterType } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import DetailsSection from '../common/DetailsSection';
import { PageChip } from '../common/PageChip';
import { mapStoryChapterTagToText, partitionChaptersByTag, toggleTagFromFilter, toggleTypeFromFilter } from '@/utils/appUtils';
import { updateChaptersFilter } from '@/redux/actions';
import { AppText } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { Colors } from '@/constants/Colors';
import { ButtonType, SimpleButton } from '../common/SimpleButton';

export type IMyStoriesHeader = {
    myStoryChapters: StoryChapter[];
    tagFilters: StoryChapterTag[];
    typeFilters: StoryChapterType[];
    error: Error;
    editingChapterId: string;
    updateChaptersFilter: Function;
};

function MyStoriesHeader({ myStoryChapters, editingChapterId, tagFilters, typeFilters, updateChaptersFilter }: IMyStoriesHeader) {
    const [modalVisible, setModalVisible] = useState(false);

    const chapters = myStoryChapters ? [...myStoryChapters] : [];
    const chaptersIsLoaded = chapters !== null;
    const beforeChristChapters = chapters.filter((value) => value.chapterType === StoryChapterType.BeforeChrist);
    const salvationMomentChapters = chapters.filter((value) => value.chapterType === StoryChapterType.SalvationMoment);
    const afterChristChapters = chapters.filter((value) => value.chapterType === StoryChapterType.AfterChrist);
    let partitionedChapters = partitionChaptersByTag(chapters);

    const beforeChristClick = () => {
        updateChaptersFilter(tagFilters, toggleTypeFromFilter(StoryChapterType.BeforeChrist, typeFilters));
    };

    const salvationMomentClick = () => {
        updateChaptersFilter(tagFilters, toggleTypeFromFilter(StoryChapterType.SalvationMoment, typeFilters));
    };

    const afterChristClick = () => {
        updateChaptersFilter(tagFilters, toggleTypeFromFilter(StoryChapterType.AfterChrist, typeFilters));
    };

    const isFilteringBeforeChrist = typeFilters.includes(StoryChapterType.BeforeChrist);
    const isFilteringSalvationMoment = typeFilters.includes(StoryChapterType.SalvationMoment);
    const isFilteringAfterChrist = typeFilters.includes(StoryChapterType.AfterChrist);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const onClearClick = () => {
        updateChaptersFilter([], []);
    };

    const numOfActiveFilters = (tagFilters.length || 0) + (typeFilters.length || 0) + (updateChaptersFilter?.length || 0);
    const hasActiveFilter = numOfActiveFilters > 0;
    const openFilterBtnText = hasActiveFilter ? `Filter (${numOfActiveFilters} Active)` : 'Filter';

    // Reanimated shared value and animation styles
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (hasActiveFilter) {
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.05, { duration: 1000 }),
                    withTiming(1, { duration: 1000 })
                ),
                -1,
                true
            );
        } else {
            scale.value = 1;
        }
    }, [hasActiveFilter]);

    return (
        <PageColumn>
            <PageRow style={{ width: 230, flexShrink: 1 }}>
                <AnimatedHeader title={hasActiveFilter ? `My Stories` : `My Stories (${myStoryChapters.length})`}
                    subtitle="A library of chapters of your testimony." />
                {
                    editingChapterId === null && (
                        <PageRow>
                            <Animated.View style={animatedStyle}>
                                <TouchableOpacity style={[styles.filterButton, hasActiveFilter && styles.activeFilter]}
                                    onPress={toggleModalVisibility}>
                                    <AppText>{openFilterBtnText}</AppText>
                                </TouchableOpacity>
                            </Animated.View>
                        </PageRow>
                    )
                }
            </PageRow>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModalVisibility}>
                <View style={styles.modalContainer}>
                    <PageColumn style={styles.modalContent}>
                        <AnimatedHeader title={'Filter'} subtitle={'Tap items below to filter your stories.'} />

                        {chaptersIsLoaded && (
                            <PageRow spaceBetween style={{ gap: 8 }}>
                                <DetailsSection iconSrc={AppIcon.Rainy}
                                    prefix="Before Christ"
                                    title={beforeChristChapters.length}
                                    onClick={beforeChristClick}
                                    style={[styles.typeFilterItem, isFilteringBeforeChrist && styles.selectedTypeFilter]}
                                />
                                <DetailsSection iconSrc={AppIcon.OpenHands}
                                    prefix="Salvation Moment"
                                    title={salvationMomentChapters.length}
                                    onClick={salvationMomentClick}
                                    style={[styles.typeFilterItem, isFilteringSalvationMoment && styles.selectedTypeFilter]}
                                />
                                <DetailsSection iconSrc={AppIcon.PlantGrow}
                                    prefix="After Christ"
                                    title={afterChristChapters.length}
                                    onClick={afterChristClick}
                                    style={[styles.typeFilterItem, isFilteringAfterChrist && styles.selectedTypeFilter]}
                                />
                            </PageRow>
                        )}

                        <PageColumn style={{ maxHeight: 300 }}>
                            <FlatList data={partitionedChapters}
                                keyExtractor={(key, idx) => `tag-${idx}`}
                                numColumns={4}
                                renderItem={(props) => {
                                    const { key, items } = props.item;

                                    const onClick = () => {
                                        updateChaptersFilter(toggleTagFromFilter(key, tagFilters), typeFilters);
                                    };
                                    const label = mapStoryChapterTagToText(key);
                                    const isFiltering = tagFilters.includes(key);

                                    return (
                                        <PageChip
                                            key={key}
                                            title={`${label} (${items.length})`}
                                            onClick={onClick}
                                            small
                                            style={[isFiltering && styles.selectedTagFilter]}
                                        />
                                    );
                                }}
                            />
                        </PageColumn>

                        <PageRow center style={{ gap: 32 }}>
                            <SimpleButton type={ButtonType.Edit}
                                text={'Close'}
                                onPress={toggleModalVisibility} />
                            <SimpleButton type={ButtonType.Close}
                                text={'Clear Filter'}
                                disabled={!hasActiveFilter}
                                onPress={onClearClick} />
                        </PageRow>
                    </PageColumn>
                </View>
            </Modal>
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    filterButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    activeFilter: {
        backgroundColor: '#a2c4c9',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '95%',
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    typeFilterItem: {
        padding: 8,
        borderRadius: 8,
    },
    selectedTypeFilter: {
        backgroundColor: Colors.selected,
    },
    selectedTagFilter: {
        backgroundColor: Colors.selected,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: Colors.error,
        borderRadius: 5,
        alignSelf: 'center',
    },
});

const mapStateToProps = (state: any) => ({
    myStoryChapters: state.stories.myStoryChapters,
    editingChapterId: state.stories.editingChapterId,
    tagFilters: state.stories.tagFilters,
    typeFilters: state.stories.typeFilters,
    error: state.errors.error,
});

const mapDispatchToProps = {
    updateChaptersFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoriesHeader);
