import { OneStage } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { formatDateTime, mapActionStepTypeToText, mapStageToDetailsText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import ActionStep from '@/models/actionStep';
import { ActionStepCard } from '../ones/ActionStepCard';


export type IActionStepPicker = ViewProps & {
    actionSteps: ActionStep[];
    setActionSteps: Function;
};

const ActionStepPicker = ({ actionSteps, setActionSteps }: IActionStepPicker) => {
    const renderActionStep = ({ item }: { item: ActionStep} ) => {
        const handleOnPress = () => {

        };

        return (
            <ActionStepCard actionStep={item} 
                            handleOnPress={handleOnPress}/>
        );
    };

    return (
        <View style={styles.container}>
            <AppText type={TextType.DefaultSemiBold}>Action Steps</AppText>
            <FlatList
                data={actionSteps}
                renderItem={renderActionStep}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.actionStepList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 6,
        padding: 16,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
        width: '99%',
    },
    actionStepList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },

});

export default ActionStepPicker;
