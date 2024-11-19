import { AppIcon, GospelChecklistItem, RefreshSpec } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewProps, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    FadeInDown,
} from 'react-native-reanimated';

import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import One from '@/models/one';
import { refreshData, setAppError } from '@/redux/actions';
import { calculatePercent, getSelectedOne, mapGospelChecklistItemTypeToDetails, mapGospelChecklistItemTypeToIcon, mapGospelChecklistItemTypeToTitle, mapGospelChecklistItemTypeToVersesAndQuestions } from '@/utils/appUtils';
import { formStyles, gridStyles } from '@/styles/Styles';
import { PageColumn } from '../common/PageColumn';
import DetailsSection from '../common/DetailsSection';
import SimpleIconButton from '../common/SimpleIconButton';
import { updateOne } from "@/requests/oneRequests";
import User from '@/models/user';
import AppError from '@/models/error';

const gospelChecklistItemsArray = Object.keys(GospelChecklistItem)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: GospelChecklistItem[key as keyof typeof GospelChecklistItem],
        title: mapGospelChecklistItemTypeToTitle(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        details: mapGospelChecklistItemTypeToDetails(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        versesAndQuestions: mapGospelChecklistItemTypeToVersesAndQuestions(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        icon: mapGospelChecklistItemTypeToIcon(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
    }));

export type IGospelChecklist = ViewProps & {
    executor: User;
    selectedOneId: string | null;
    ones: One[];
    refreshData: Function;
    setAppError: Function;
};

const GospelChecklist = ({ executor, selectedOneId, ones, refreshData, setAppError }: IGospelChecklist) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const selectedOne = getSelectedOne(selectedOneId, ones);
    const selectedOneItems = selectedOne ? [...Array.from(new Set(selectedOne.gospelChecklist))] : []; // Set removes dupes.
    const completedPercentage = calculatePercent(selectedOneItems, gospelChecklistItemsArray.map((item) => item.value));

    const renderItem = ({ item, index }: {
        item: {
            value: GospelChecklistItem, icon: AppIcon,
            title: string, details: string, versesAndQuestions: string
        }, index: number
    }) => {

        const isExpanded = expandedIndices.includes(index);
        const isChecked = selectedOneItems?.includes(item.value);

        const onPress = async () => {
            if (!selectedOne) {
                setAppError(new AppError('Error updating one, invalid state'));
                return;
            }

            const newItems = isChecked ? [...selectedOneItems].filter((value) => value !== item.value) : [...selectedOneItems, item.value];
            const updatedOne = {
                ...selectedOne,
                gospelChecklist: newItems
            };

            try {
                const response = await updateOne(updatedOne);
                if (response.error) {
                    setAppError(new AppError('Error updating one: ', response.error));
                    return;
                }

                refreshData(RefreshSpec.Ones);
            } catch (err: any) {
                setAppError(new AppError('Error updating one: ', err));
            }
        };

        const onExpandedPress = () => {
            setExpandedIndices(isExpanded ? expandedIndices.filter((value) => value !== index) : [...expandedIndices, index]);
        };

        return (
            <TouchableOpacity onPress={onPress}>
                <PageRow style={[gridStyles.itemCard]}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={onPress}
                        color={isChecked ? '#4630EB' : undefined}
                        style={[formStyles.checkbox, { alignSelf: 'center', marginStart: 4, marginEnd: 12 }]}
                    />
                    <PageColumn>
                        <AppText type={TextType.Subtitle}>
                            {item.title}
                        </AppText>
                        <PageRow style={{ flexShrink: 1, width: 250 }}>
                            <AppText type={TextType.Default}>
                                {item.details}
                            </AppText>
                        </PageRow>
                        {
                            isExpanded && (
                                <Animated.View entering={FadeInDown.duration(400)}>
                                    <PageRow style={{ flexShrink: 1, width: 250, marginTop: 12 }}>
                                        <AppText type={TextType.Body}>
                                            {item.versesAndQuestions}
                                        </AppText>
                                    </PageRow>

                                </Animated.View>
                            )
                        }
                    </PageColumn>
                    <SimpleIconButton iconSrc={isExpanded ? AppIcon.ChevronUp : AppIcon.ChevronDown}
                        onClick={onExpandedPress}
                        customStyles={{ container: { right: 8, position: 'absolute', alignSelf: 'center' } }} />
                </PageRow>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <AppText type={TextType.Subtitle} style={styles.title}>Gospel Checklist</AppText>
            <PageRow>
                <DetailsSection iconSrc={AppIcon.Book}
                    title={`${completedPercentage}% Shared`}
                    prefix={'Gospel Shared'} />
            </PageRow>

            <FlatList
                data={gospelChecklistItemsArray}
                keyExtractor={(item, index) => item.title}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2
    },
    pageHeader: {
        marginBottom: 8,
    },
    title: {
        marginBottom: 8,
    },
    actionStepList: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonRow: {
    },
    iconList: {
    },
    icon: {
        width: 28,
        height: 28,
        margin: 2,
        opacity: 0.5
    },
    selected: {
        opacity: 1,
    },
});

const mapStateToProps = (state: any) => {
    return {
        executor: state.users.executor,
        selectedOneId: state.ones.selectedOneId,
        ones: state.ones.ones,
    };
};


const mapDispatchToProps = {
    refreshData,
    setAppError,
};

export default connect(mapStateToProps, mapDispatchToProps)(GospelChecklist);