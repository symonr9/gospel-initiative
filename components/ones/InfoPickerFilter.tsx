import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Modal, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import { AppIcon, OneNoteType } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import DetailsSection from '../common/DetailsSection';
import { mapOneNoteTypeToTitle, partitionNotesByType, toggleOneNoteTypeFromFilter } from '@/utils/appUtils';
import { updateOneNotesFilters } from '@/redux/actions';
import { AppText } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { Colors } from '@/constants/Colors';
import { ButtonType, SimpleButton } from '../common/SimpleButton';
import One from '@/models/one';
import { PickerState } from './InfoPicker';
import { formStyles } from '@/styles/Styles';

export type IInfoPickerFilter = {
    pickerState: PickerState;
    selectedOne: One;
    oneNoteTypeFilters: OneNoteType[];
    oneNoteTextFilter: string;
    updateOneNotesFilters: Function;
};

function InfoPickerFilter({ pickerState, selectedOne, oneNoteTypeFilters, oneNoteTextFilter, updateOneNotesFilters }: IInfoPickerFilter) {
    const [modalVisible, setModalVisible] = useState(false);

    const oneNotes = selectedOne ? [...selectedOne.oneNotes] : [];
    const chaptersIsLoaded = oneNotes !== null;
    const partitionedNotes = partitionNotesByType(oneNotes);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const onClearClick = () => {
        updateOneNotesFilters([],);
    };

    const numOfActiveFilters = (oneNoteTypeFilters.length || 0) + oneNoteTextFilter.length;
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
                {
                    pickerState === PickerState.Normal && (
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
                                <TextInput
                                    style={[formStyles.slimTextInput, { flexGrow: 1 }]}
                                    placeholder="Filter by Text"
                                    placeholderTextColor={'gray'}
                                    value={oneNoteTextFilter}
                                    onChangeText={(text) => updateOneNotesFilters(oneNoteTypeFilters, oneNoteTextFilter)}
                                />
                            </PageRow>
                        )}

                        <PageColumn style={{ maxHeight: 300 }}>
                            <FlatList data={partitionedNotes}
                                keyExtractor={(key, idx) => `note-${idx}`}
                                numColumns={4}
                                renderItem={(props) => {
                                    const { key, items } = props.item;

                                    const onTypeFilterClick = (type: OneNoteType) => {
                                        updateOneNotesFilters(toggleOneNoteTypeFromFilter(type, oneNoteTypeFilters), oneNoteTextFilter);
                                    };

                                    const label = mapOneNoteTypeToTitle(key);
                                    const isFiltering = oneNoteTypeFilters.includes(key);

                                    return (
                                        <DetailsSection iconSrc={AppIcon.OpenHands}
                                            key={key}
                                            title={label}
                                            onClick={onTypeFilterClick}
                                            style={[styles.typeFilterItem, isFiltering && styles.selectedTypeFilter]} />
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
    oneNoteTypeFilters: state.ones.oneNoteTypeFilters,
    oneNoteTextFilter: state.ones.oneNoteTextFilter,
});

const mapDispatchToProps = {
    updateOneNotesFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPickerFilter);
