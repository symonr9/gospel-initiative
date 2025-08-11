import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Modal, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Image } from 'expo-image';

import { AppIcon, OneNoteType } from '@/enums/enums';
import { PageColumn } from '../common/PageColumn';
import { AnimatedHeader } from '../common/AnimatedHeader';
import DetailsSection from '../common/DetailsSection';
import { getSelectedOne, partitionNotesByType, toggleOneNoteTypeFromFilter } from '@/utils/appUtils';
import { mapOneNoteTypeToIcon } from "@/utils/iconUtils";
import { mapOneNoteTypeToTitle } from "@/utils/textUtils";
import { updateOneNotesFilters } from '@/redux/actions';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { Colors, useThemeColors } from '@/constants/Colors';
import { ButtonType, SimpleButton } from '../common/SimpleButton';
import One from '@/models/one';
import { PickerState } from './InfoPicker';
import { formStyles, useModalStyles } from '@/styles/Styles';
import { SimpleCard } from '../common/SimpleCard';
import { MAX_SHORT_TEXT_LENGTH } from '@/constants/Constants';
import { standardPaddedWidth } from '@/constants/Dimensions';

export type IInfoPickerFilter = {
    selectedOneId: string | null;
    ones: One[];
    oneNoteTypeFilters: OneNoteType[];
    oneNoteTextFilter: string;
    updateOneNotesFilters: Function;
};

function InfoPickerFilter({ selectedOneId, ones, oneNoteTypeFilters, oneNoteTextFilter, updateOneNotesFilters }: IInfoPickerFilter) {
    const [modalVisible, setModalVisible] = useState(false);

    const themeColors = useThemeColors();
    const modalStyles = useModalStyles(themeColors);

    const selectedOne = getSelectedOne(selectedOneId, ones);

    const oneNotes = selectedOne ? [...selectedOne.oneNotes] : [];
    const chaptersIsLoaded = oneNotes !== null;
    const partitionedNotes = partitionNotesByType(oneNotes);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const onClearClick = () => {
        updateOneNotesFilters([], "");
    };

    const numOfActiveFilters = (oneNoteTypeFilters.length || 0) + (oneNoteTextFilter.length > 0 ? 1 : 0);
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
            <PageRow>
                <PageRow>
                    <Animated.View style={animatedStyle}>
                        <TouchableOpacity style={[styles.filterButton, hasActiveFilter && styles.activeFilter]}
                            onPress={toggleModalVisibility}>
                            <AppText>{openFilterBtnText}</AppText>
                        </TouchableOpacity>
                    </Animated.View>
                </PageRow>
            </PageRow>

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={toggleModalVisibility}>
                    <View style={modalStyles.modalContainer}>
                        <PageColumn style={[modalStyles.modalContent, { gap: 12, marginHorizontal: 8 }]}>
                            <AnimatedHeader title={'Filter'} 
                                subtitle={'Tap items below to filter your stories.'} />

                            {chaptersIsLoaded && (
                                <PageRow center style={{ gap: 8, marginHorizontal: 12 }}>
                                    <TextInput
                                        style={[formStyles.slimTextInput, { flexGrow: 1 }]}
                                        placeholder={`Type here...`}
                                        placeholderTextColor={'gray'}
                                        value={oneNoteTextFilter}
                                        maxLength={MAX_SHORT_TEXT_LENGTH}
                                        onChangeText={(text) => updateOneNotesFilters(oneNoteTypeFilters, text)}
                                    />
                                </PageRow>
                            )}

                            <PageColumn style={{ maxHeight: 300 }}>
                                <FlatList data={partitionedNotes}
                                    keyExtractor={(key, idx) => `note-${idx}`}
                                    numColumns={1}
                                    renderItem={(props) => {
                                        const { key, items } = props.item;
                                        const isFiltering = oneNoteTypeFilters.includes(key);

                                        const onTypeFilterClick = (type: OneNoteType) => {
                                            updateOneNotesFilters(toggleOneNoteTypeFromFilter(type, oneNoteTypeFilters), oneNoteTextFilter);
                                        };

                                        return (
                                            <TouchableOpacity onPress={() => onTypeFilterClick(key)} key={key}>
                                                <PageRow style={[styles.typeFilterItem, isFiltering && styles.selectedTypeFilter]}>
                                                    <Image
                                                        source={mapOneNoteTypeToIcon(key)}
                                                        style={[styles.icon, isFiltering && styles.selected]}
                                                    />
                                                    <AppText style={{ textAlign: 'center', flexShrink: 1 }} type={TextType.Subtitle2}>
                                                        {`${mapOneNoteTypeToTitle(key)} (${items.length})`}
                                                    </AppText>
                                                </PageRow>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </PageColumn>

                            <PageRow center style={{ gap: 32 }}>
                                <SimpleButton type={ButtonType.Edit}
                                    text={'Close'}
                                    onPress={() => setModalVisible(false)} />
                                <SimpleButton type={ButtonType.Close}
                                    text={'Clear Filter'}
                                    disabled={!hasActiveFilter}
                                    onPress={onClearClick} />
                            </PageRow>
                        </PageColumn>
                    </View>
                </Modal>
            </View>
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    filterButton: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    activeFilter: {
        backgroundColor: '#a2c4c9',
    },
    typeFilterItem: {
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        marginVertical: 4,
        gap: 8,
        textAlign: 'center',
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
    icon: {
        width: 40,
        height: 40,
        opacity: 0.4,
    },
    selected: {
        opacity: 1,
    },
});

const mapStateToProps = (state: any) => ({
    selectedOneId: state.ones.selectedOneId,
    ones: state.ones.ones,
    oneNoteTypeFilters: state.ones.oneNoteTypeFilters,
    oneNoteTextFilter: state.ones.oneNoteTextFilter,
});

const mapDispatchToProps = {
    updateOneNotesFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPickerFilter);
