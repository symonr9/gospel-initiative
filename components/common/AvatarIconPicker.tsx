import { AvatarIcon, AvatarIconArray } from '@/enums/enums';
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Modal, Text, ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { AppText, TextType } from './AppText';
import ScrollLayout from './ScrollLayout';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { gridStyles, modalStyles } from '@/styles/Styles';
import { ButtonType, SimpleButton } from './SimpleButton';

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
        <View style={[gridStyles.itemCard, style]}>
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

                <PageRow center>
                    <SimpleButton type={ButtonType.Edit}
                        onPress={() => setModalVisible(true)}
                        text={'Edit Icon'} />
                </PageRow>
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

                        <PageColumn style={{ height: 300 }}>
                            <FlatList
                                data={AvatarIconArray}
                                renderItem={renderIcon}
                                numColumns={4}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </PageColumn>

                        <TouchableOpacity
                            style={!selectedIcon ? modalStyles.closeButton : modalStyles.saveButton}
                            onPress={() => setModalVisible(false)}>
                            <AppText>{!selectedIcon ? 'Close' : 'Confirm'}</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 64,
        height: 64,
        margin: 4,
        opacity: 0.6,
    },
    selected: {
        opacity: 1,
        borderColor: 'lightgreen',
        borderRadius: 36,
        borderWidth: 4,
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
