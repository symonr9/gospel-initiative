import { OneStage } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Modal, StyleSheet, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { StageArray } from '@/utils/appUtils';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import ScrollLayout from './ScrollLayout';
import { modalStyles } from '@/styles/Styles';

export type IStagePicker = ViewProps & {
    selectedStage: OneStage;
    setSelectedStage: Function;
};

const StagePicker = ({ selectedStage, setSelectedStage, style }: IStagePicker) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleStageSelect = (stage: OneStage) => {
        setSelectedStage(stage);
    };

    const renderIcon = ({ item }: { item: { stage: OneStage, icon: any, label: string } }) => (
        <TouchableOpacity onPress={() => handleStageSelect(item.stage)}>
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

    const selectedStageData = StageArray.find(item => item.stage === selectedStage);

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={toggleModal}>
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
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={modalStyles.editButton}>
                <AppText>Edit Stage</AppText>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <AppText type={TextType.DefaultSemiBold} style={modalStyles.modalTitle}>
                            Select a Stage
                        </AppText>
                        {selectedStageData && (
                            <View style={styles.selectedDetails}>
                                <Image
                                    source={selectedStageData.icon}
                                    style={styles.selectedIconModal}
                                />
                                <AppText type={TextType.DefaultSemiBold}>{selectedStageData.label}</AppText>
                                <AppText type={TextType.Italic} style={{ marginTop: 8 }}>{selectedStageData.details}</AppText>
                            </View>
                        )}
                        <ScrollLayout style={{ maxHeight: 300 }}>
                            <FlatList
                                data={StageArray}
                                renderItem={renderIcon}
                                numColumns={4}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.iconList}
                            />
                        </ScrollLayout>
                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={toggleModal}>
                            <AppText>Close</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4,
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

export default StagePicker;
