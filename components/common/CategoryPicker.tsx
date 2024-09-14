import { OneCategory, OneStage } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { mapOneCategoryToIcon, mapOneCategoryToText, mapStageToDetailsText, mapStageToIcon, mapStageToText } from '@/utils/appUtils';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import ScrollLayout from './ScrollLayout';

// TODO: Map it, refactor!
const categoryArray = [
    OneCategory.Family,
    OneCategory.CloseFriend,
    OneCategory.Friend,
    OneCategory.Neighbor,
    OneCategory.Coworker,
    OneCategory.Classmate,
    OneCategory.Roommate,
    OneCategory.Client,
    OneCategory.Cashier,
    OneCategory.Server,
    OneCategory.Barista,
    OneCategory.Tutor,
    OneCategory.Teacher,
    OneCategory.FellowParent,
    OneCategory.ClubMember,
    OneCategory.Teammate,
    OneCategory.HouseholdHelp,
    OneCategory.WorkoutPartner,
    OneCategory.PersonalCareProfessional,
    OneCategory.MedicalProf,
    OneCategory.LongDistanceFriend,    
].map((value: OneCategory) => ({
    category: value,
    icon: mapOneCategoryToIcon(value),
    label: mapOneCategoryToText(value),
}));

export type ICategoryPicker = ViewProps & {
    selectedCategory: OneCategory;
    setSelectedCategory: Function;
};

const CategoryPicker = ({ selectedCategory, setSelectedCategory }: ICategoryPicker) => {
    const renderIcon = ({ item }: { item: { category: OneCategory, icon: any, label: String } }) => {
        const handleIconPress = () => {
            setSelectedCategory(item.category);
        };

        return (
            <TouchableOpacity onPress={handleIconPress}>
                <PageRow style={styles.iconCard}>
                    <PageColumn>
                        <Image
                            source={item.icon}
                            style={[styles.icon, selectedCategory === item.category && styles.selected]}
                        />
                        <AppText type={TextType.Italic}>{item.label}</AppText>
                    </PageColumn>
                </PageRow>
            </TouchableOpacity>
        );
    };

    const selectedCategoryData = categoryArray.find(item => item.category === selectedCategory);

    return (
        <View style={styles.container}>
            <View style={styles.selectedContainer}>
                {selectedCategory ? (
                    <>
                        <AppText type={TextType.DefaultSemiBold}>Category:</AppText>
                        <Image
                            source={selectedCategoryData?.icon}
                            style={styles.selectedIcon}
                        />
                        <AppText type={TextType.DefaultSemiBold}>{selectedCategoryData?.label}</AppText>
                        <AppText type={TextType.Italic} style={{ marginTop: 8 }}>{selectedCategoryData?.details}</AppText>
                    </>
                ) : (
                    <AppText type={TextType.DefaultSemiBold}>None Selected</AppText>
                )}
            </View>
            <ScrollLayout style={{ maxHeight: 220 }}>
                <FlatList
                    data={categoryArray}
                    renderItem={renderIcon}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.iconList}
                />
            </ScrollLayout>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
        padding: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
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
        width: 170,
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

export default CategoryPicker;
