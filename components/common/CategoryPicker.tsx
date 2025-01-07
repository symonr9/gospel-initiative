import { OneCategory } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Modal, StyleSheet, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { mapOneCategoryToIcon } from "@/utils/iconUtils";
import { mapOneCategoryToDetailsText } from "@/utils/textUtils";
import { mapOneCategoryToTitle } from "@/utils/textUtils";
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import ScrollLayout from './ScrollLayout';
import { gridStyles, modalStyles } from '@/styles/Styles';
import { ButtonType, SimpleButton } from './SimpleButton';
import { halfScreenWidth, standardModalHeight } from '@/constants/Dimensions';

// Map categories to include icon, label, and details
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
    label: mapOneCategoryToTitle(value),
    details: mapOneCategoryToDetailsText(value)
}));

export type ICategoryPicker = ViewProps & {
    title?: string;
    selectedCategory: OneCategory;
    setSelectedCategory: (oneCategory: OneCategory) => void;
};

const CategoryPicker = ({ title = 'Category', selectedCategory, setSelectedCategory, style }: ICategoryPicker) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleCategorySelect = (category: OneCategory) => {
        setSelectedCategory(category);
    };

    const renderIcon = ({ item }: { item: { category: OneCategory, icon: any, label: String } }) => (
        <TouchableOpacity onPress={() => handleCategorySelect(item.category)}>
            <PageRow style={styles.iconCard}>
                <PageColumn>
                    <Image
                        source={item.icon}
                        style={[styles.icon, selectedCategory === item.category && styles.selected]}
                    />
                    <AppText style={{ textAlign: 'center', flexShrink: 1 }} type={TextType.Body}>{item.label}</AppText>
                </PageColumn>
            </PageRow>
        </TouchableOpacity>
    );

    const selectedCategoryData = categoryArray.find(item => item.category === selectedCategory);

    return (
        <View style={[gridStyles.itemCard, style]}>
            <TouchableOpacity onPress={toggleModal}>
                <View style={styles.selectedContainer}>
                    {selectedCategory ? (
                        <>
                            <AppText type={TextType.DefaultSemiBold}>{title}:</AppText>
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
            </TouchableOpacity>

            <PageRow center>
                <SimpleButton type={ButtonType.Edit}
                    onPress={toggleModal}
                    text={'Edit Category'} />
            </PageRow>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={[modalStyles.modalContent]}>
                        <AppText type={TextType.DefaultSemiBold} style={modalStyles.modalTitle}>
                            Select a Category
                        </AppText>
                        {selectedCategoryData && (
                            <View style={styles.selectedDetails}>
                                <Image
                                    source={selectedCategoryData.icon}
                                    style={styles.selectedIconModal}
                                />
                                <AppText type={TextType.DefaultSemiBold}>{selectedCategoryData.label}</AppText>
                                <AppText type={TextType.Italic} style={{ marginTop: 8 }}>{selectedCategoryData.details}</AppText>
                            </View>
                        )}
                        <PageColumn style={{ maxHeight: standardModalHeight - 100 }}>
                            <FlatList
                                data={categoryArray}
                                renderItem={renderIcon}
                                numColumns={3}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.iconList}
                            />
                        </PageColumn>

                        <SimpleButton text={'Close'}
                            onPress={toggleModal}
                            type={ButtonType.Close} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: halfScreenWidth,
    },
    selectedIcon: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    selectedDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    selectedIconModal: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
});

export default CategoryPicker;
