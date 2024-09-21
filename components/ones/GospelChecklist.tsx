import { ActionStepType, AppIcon, GospelChecklistItem } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewProps, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';

import { connect } from 'react-redux';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import ActionStep from '@/models/actionStep';
import One from '@/models/one';
import { editOne, setSelectedOne } from '@/redux/actions';
import { mapGospelChecklistItemTypeToDetails, mapGospelChecklistItemTypeToIcon, mapGospelChecklistItemTypeToTitle } from '@/utils/appUtils';
import ScrollLayout from '../common/ScrollLayout';
import { formStyles } from '@/styles/Styles';
import { PageColumn } from '../common/PageColumn';

const gospelChecklistItemsArray = Object.keys(GospelChecklistItem)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: GospelChecklistItem[key as keyof typeof GospelChecklistItem],
        title: mapGospelChecklistItemTypeToTitle(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        details: mapGospelChecklistItemTypeToDetails(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
        icon: mapGospelChecklistItemTypeToIcon(GospelChecklistItem[key as keyof typeof GospelChecklistItem]),
    }));

export type IGospelChecklist = ViewProps & {
    selectedOne: One;
    editOne: Function;
    setSelectedOne: Function;
};

enum PickerState {
    Normal,
}

const GospelChecklist = ({ selectedOne, editOne, setSelectedOne }: IGospelChecklist) => {
    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);

    const [formSelectedTypeIdx, setFormSelectedTypeIdx] = useState(0);

    const selectedOneItems = selectedOne.gospelChecklist;

    const renderItem = ({ item, index }: { item: { value: GospelChecklistItem, icon: AppIcon, 
        title: string, details: string }, index: number }) => {
        const onPress = () => {
            const newItems = isChecked ? [...selectedOneItems].filter((value) => value !== item.value) : [...selectedOneItems, item.value];
            const newOne = {
                ...selectedOne,
                gospelChecklist: newItems
            };
            setSelectedOne(newOne);
            editOne(newOne);
        };

        const isChecked = selectedOneItems?.includes(item.value);
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
                        <PageRow style={{ flexShrink: 1, width: '95%' }}>
                            <AppText type={TextType.Body}>
                                {item.details}
                            </AppText>
                        </PageRow>
                    </PageColumn>
                </PageRow>
            </TouchableOpacity>
        );
    };

    const onBackClick = () => {
        setPickerState(PickerState.Normal);
    };

    const onSaveClick = () => {
        setPickerState(PickerState.Normal);

        setFormSelectedTypeIdx(0);
    };

    const Body = [];

    if (pickerState === PickerState.Normal) {
        Body.push(
            <ScrollLayout style={{ maxHeight: 300 }}>
                <FlatList
                    data={gospelChecklistItemsArray}
                    keyExtractor={(item, index) => item.value}
                    renderItem={renderItem}
                />
            </ScrollLayout>
        );
    }

    return (
        <View style={styles.container}>
            <AppText type={TextType.Subtitle} style={styles.title}>Gospel Checklist</AppText>
            {Body.map((item) => item)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        flex: 1,
        padding: 8,
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

export default connect(mapStateToProps, mapDispatchToProps)(GospelChecklist);