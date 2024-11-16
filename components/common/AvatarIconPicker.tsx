import { AvatarIcon, AvatarIconArray } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Modal, Text, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { AppText, TextType } from './AppText';
import ScrollLayout from './ScrollLayout';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { modalStyles } from '@/styles/Styles';

export type IAvatarIconPicker = ViewProps & {
    selectedIcon: AvatarIcon;
    setSelectedIcon: (icon: AvatarIcon) => void;
};

const AvatarIconPicker = ({ selectedIcon, setSelectedIcon, style }: IAvatarIconPicker) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleIconPress = (icon: AvatarIcon) => {
        setSelectedIcon(icon);
    };

    const renderIcon = ({ item }: { item: AvatarIcon }) => (
        <TouchableOpacity onPress={() => handleIconPress(item)}>
            <Image source={item} style={[styles.icon, selectedIcon === item && styles.selected]} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, style]}>
            <PageColumn>
                <PageRow style={styles.selectedContainer}>
                    {selectedIcon ? (
                        <PageColumn>
                            <AppText type={TextType.DefaultSemiBold}>Selected Icon:</AppText>
                            <Image source={selectedIcon} style={styles.selectedIcon} />
                        </PageColumn>
                    ) : (
                        <AppText type={TextType.DefaultSemiBold}>None Selected</AppText>
                    )}
                </PageRow>

                <TouchableOpacity onPress={() => setModalVisible(true)}
                    style={modalStyles.editButton}>
                    <AppText>Edit Icon</AppText>
                </TouchableOpacity>
            </PageColumn>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <Text style={modalStyles.modalTitle}>Select an Icon</Text>

                        <ScrollLayout style={{ height: 300 }}>
                            <FlatList
                                data={AvatarIconArray}
                                renderItem={renderIcon}
                                numColumns={4}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </ScrollLayout>

                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={() => setModalVisible(false)}>
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
    icon: {
        width: 64,
        height: 64,
        margin: 4,
        opacity: 0.4,
    },
    selected: {
        opacity: 1,
    },
    selectedContainer: {
        alignItems: 'center',
    },
    selectedIcon: {
        width: 64,
        height: 64,
        alignSelf: 'center'
    },
});

export default AvatarIconPicker;
