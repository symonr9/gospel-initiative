import { AppIcon, GospelChecklistItem } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewProps, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';

import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import One from '@/models/one';
import { editOne, setAppError, setSelectedOne } from '@/redux/actions';
import { calculatePercent, mapGospelChecklistItemTypeToDetails, mapGospelChecklistItemTypeToIcon, mapGospelChecklistItemTypeToTitle, mapGospelChecklistItemTypeToVersesAndQuestions } from '@/utils/appUtils';
import { formStyles } from '@/styles/Styles';
import { PageColumn } from '../common/PageColumn';
import DetailsSection from '../common/DetailsSection';
import SimpleIconButton from '../common/SimpleIconButton';
import { updateOne } from "@/requests/oneRequests";
import User from '@/models/user';

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
    selectedOne: One;
    editOne: Function;
    setSelectedOne: Function;
    setAppError: Function;
};

const GospelChecklist = ({ executor, selectedOne, editOne, setSelectedOne, setAppError }: IGospelChecklist) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const selectedOneItems = Array.from(new Set(selectedOne.gospelChecklist)); // Set removes dupes.
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
            const newItems = isChecked ? [...selectedOneItems].filter((value) => value !== item.value) : [...selectedOneItems, item.value];
            const updatedOne = {
                ...selectedOne,
                gospelChecklist: newItems
            };

            try {
                const response = await updateOne(updatedOne);
                if (response.error) {                
                    setAppError(new Error('Error updating one: ', response.error));
                    return;
                }

                editOne(response);
                setSelectedOne(response);
            } catch (err: any) {
                setAppError(new Error('Error updating one: ', err));
            }
        };

        const onExpandedPress = () => {
            setExpandedIndices(isExpanded ? expandedIndices.filter((value) => value !== index) : [...expandedIndices, index]);
        };

        return (
            <TouchableOpacity onPress={onPress}>
                <PageRow style={styles.checklistItem}>
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
                        <PageRow style={{ flexShrink: 1, width: 300 }}>
                            <AppText type={TextType.Default}>
                                {item.details}
                            </AppText>
                        </PageRow>
                        {
                            isExpanded && (
                                <PageRow style={{ flexShrink: 1, width: 300, marginTop: 12 }}>
                                    <AppText type={TextType.Body}>
                                        {item.versesAndQuestions}
                                    </AppText>
                                </PageRow>
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
    checklistItem: {
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        padding: 6,
    },
    selectedChecklistItem: {
        backgroundColor: '#bbeccc',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
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
    const selectedOne = state.ones.selectedOne;
    return {
        executor: state.users.executor,
        selectedOne,
    };
};


const mapDispatchToProps = {
    editOne,
    setAppError,
    setSelectedOne
};

export default connect(mapStateToProps, mapDispatchToProps)(GospelChecklist);