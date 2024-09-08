import { OneStage } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { mapStageToDetailsText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';

// TODO: Map it, refactor!
const stageArray = [
    OneStage.Hostile,
    OneStage.Apathetic,
    OneStage.Friendly,
    OneStage.Curious,
    OneStage.Seeking,
    OneStage.NewBeliever,
    OneStage.Disciple,
].map((value: OneStage) => ({
    stage: value,
    icon: mapStageToIcon(value),
    label: mapStageToText(value),
    details: mapStageToDetailsText(value)
}));

export type IStagePicker = ViewProps & {
    selectedStage: OneStage;
    setSelectedStage: Function;
};

const StagePicker = ({ selectedStage, setSelectedStage }: IStagePicker) => {
    const renderIcon = ({ item }: { item: { stage: OneStage, icon: any, label: string } }) => {
        const handleIconPress = () => {
            setSelectedStage(item.stage);
        };

        return (
            <TouchableOpacity onPress={handleIconPress}>
                <PageRow style={styles.iconCard}>
                    <PageColumn>
                        <Image
                            source={item.icon}
                            style={[styles.icon, selectedStage === item.stage && styles.selected]}
                        />
                        <AppText type={TextType.Italic}>{item.label}</AppText>
                    </PageColumn>
                </PageRow>
            </TouchableOpacity>
        );
    };

    const selectedStageData = stageArray.find(item => item.stage === selectedStage);

    return (
        <View style={styles.container}>
            <View style={styles.selectedContainer}>
                {selectedStage ? (
                    <>
                        <AppText type={TextType.DefaultSemiBold}>Stage:</AppText>
                        <Image
                            source={selectedStageData?.icon}
                            style={styles.selectedIcon}
                        />
                        <AppText type={TextType.DefaultSemiBold}>{selectedStageData?.label}</AppText>
                        <AppText type={TextType.Italic} style={{ marginTop: 8 }}>{selectedStageData?.details}</AppText>
                    </>
                ) : (
                    <AppText type={TextType.DefaultSemiBold}>None Selected</AppText>
                )}
            </View>
            <FlatList
                data={stageArray}
                renderItem={renderIcon}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.iconList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
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
    iconList: {
        display: 'flex',
        flexDirection: 'column',
    },
    iconCard: {
        width: 80,
        margin: 4,
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        opacity: 0.4,
    },
    selected: {
        opacity: 1,
    },
    selectedContainer: {
        alignItems: 'center',
        width: 140,
    },
    selectedText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedIcon: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
});

export default StagePicker;
