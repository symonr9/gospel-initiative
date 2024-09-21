import { ActionStepType, AppIcon, GospelChecklistItem } from '@/enums/enums';
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewProps, FlatList, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import ActionStep from '@/models/actionStep';
import One from '@/models/one';
import { editOne, setSelectedOne } from '@/redux/actions';
import { calculatePercent, mapGospelChecklistItemTypeToDetails, mapGospelChecklistItemTypeToIcon, mapGospelChecklistItemTypeToTitle, mapGospelChecklistItemTypeToVersesAndQuestions } from '@/utils/appUtils';
import ScrollLayout from '../common/ScrollLayout';
import { formStyles } from '@/styles/Styles';
import { PageColumn } from '../common/PageColumn';
import { SimpleCard } from '../common/SimpleCard';
import DetailsSection from '../common/DetailsSection';
import SimpleIconButton from '../common/SimpleIconButton';

const gospelChecklistItemsArray = Object.keys(GospelChecklistItem)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: GospelChecklistItem[key as keyof typeof GospelChecklistItem],
        title: mapGospelChecklistItemTypeToTitle(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        details: mapGospelChecklistItemTypeToDetails(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        versesAndQuestions: mapGospelChecklistItemTypeToVersesAndQuestions(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        icon: mapGospelChecklistItemTypeToIcon(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
    }));

export type IDiscoveryQuestions = ViewProps & {
    selectedOne: One;
    editOne: Function;
    setSelectedOne: Function;
};

enum PickerState {
    Launch,
    Expanded,
}

const DiscoveryQuestions = ({ selectedOne, editOne, setSelectedOne }: IDiscoveryQuestions) => {
    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Launch);

    const [formSelectedTypeIdx, setFormSelectedTypeIdx] = useState(0);
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

        const onPress = () => {
            const newItems = isChecked ? [...selectedOneItems].filter((value) => value !== item.value) : [...selectedOneItems, item.value];
            const newOne = {
                ...selectedOne,
                gospelChecklist: newItems
            };
            setSelectedOne(newOne);
            editOne(newOne);
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
                        <AppText type={TextType.DefaultSemiBold}>
                            {item.title}
                        </AppText>
                        <PageRow style={{ flexShrink: 1, width: '80%' }}>
                            <AppText type={TextType.Body}>
                                {item.details}
                            </AppText>
                        </PageRow>
                        {
                            isExpanded && (
                                <PageRow style={{ flexShrink: 1, width: '80%', marginTop: 12 }}>
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

    const Body = [];

    if (pickerState === PickerState.Expanded) {
        Body.push(
            <FlatList
                data={gospelChecklistItemsArray}
                keyExtractor={(item, index) => item.value}
                renderItem={renderItem}
            />
        );
    }

    const onExpandPress = () => {
        setPickerState(pickerState === PickerState.Launch ? PickerState.Expanded : PickerState.Launch);
    }

    return (
        <View style={styles.container}>
            <AppText type={TextType.Subtitle} style={styles.title}>Gospel Checklist</AppText>
            <PageRow spaceEvenly>
                <DetailsSection iconSrc={AppIcon.Atheist}
                    title={`${completedPercentage}% Shared`}
                    prefix={'Gospel Shared'} />

                <SimpleIconButton iconSrc={pickerState === PickerState.Launch ? AppIcon.ChevronDown : AppIcon.ChevronUp} 
                    title={pickerState === PickerState.Launch ? 'Expand' : 'Collapse'}
                    onClick={onExpandPress} />
            </PageRow>

            {Body.map((item) => item)}
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
        selectedOne,
    };
};


const mapDispatchToProps = {
    editOne,
    setSelectedOne
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryQuestions);