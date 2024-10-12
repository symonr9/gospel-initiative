import { AppIcon } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput } from 'react-native';
import { PageChip } from '../common/PageChip';
import { AppText } from '../common/AppText';
import ScrollLayout from '../common/ScrollLayout';
import { PageRow } from '../common/PageRow';
import { formStyles } from '@/styles/Styles';
import SimpleIconButton from '../common/SimpleIconButton';
import { PageColumn } from '../common/PageColumn';

type NamesPickerProps = {
    formChapter: StoryChapter;
    setFormChapter?: (updatedChapter: StoryChapter) => void;
    editing?: Boolean;
};

export default function NamesPicker({ formChapter, setFormChapter, editing = true }: NamesPickerProps) {
    const [formNames, setFormNames] = useState(formChapter.names);
    const [newName, setNewName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!modalVisible && setFormChapter && formNames !== formChapter.names) {
            setFormChapter({ ...formChapter, names: formNames });
        }
    }, [modalVisible]);

    const toggleFormName = (name: string) => {
        const updatedNames = formNames.includes(name)
            ? formNames.filter((n) => n !== name)
            : [...formNames, name];
        setFormNames(updatedNames);
    };

    const onAddNewNameClick = () => {
        if (!newName || formNames.includes(newName) || !setFormChapter) {
            return;
        }
        setFormNames([...formNames, newName]);
        setNewName("");
    }

    return (
        <PageColumn>
            <PageRow>
                <FlatList
                    data={formChapter.names}
                    numColumns={4}
                    keyExtractor={(item, index) => item}
                    renderItem={({ item }) => (
                        <PageChip title={item}
                            onClick={() => editing && setModalVisible(true)}
                            style={{ backgroundColor: '#d9ead3' }}
                            small />
                    )} />
            </PageRow>

            {
                editing && (
                    <PageRow style={{ width: 100, marginTop: 16 }}>
                        <PageChip title={'Edit'}
                            iconSrc={AppIcon.Edit}
                            onClick={() => setModalVisible(true)}
                            small />
                    </PageRow>
                )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Names</Text>

                        <ScrollLayout style={{ height: 300 }}>
                            <FlatList
                                data={[...new Set([...formChapter.names, ...formNames])]}
                                numColumns={3}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.tagOption,
                                            formNames.includes(item) && styles.selectedTagOption,
                                        ]}
                                        onPress={() => toggleFormName(item)}>
                                        <AppText>
                                            {item}
                                        </AppText>
                                    </TouchableOpacity>
                                )} />

                            <PageRow spaceBetween>
                                <TextInput
                                    style={[formStyles.slimTextInput, { flexGrow: 1 }]}
                                    placeholder="Add a new name"
                                    placeholderTextColor={'gray'}
                                    value={newName}
                                    onChangeText={(text) => setNewName(text)}
                                />

                                <SimpleIconButton
                                    iconSrc={AppIcon.Plus}
                                    customStyles={{ container: { marginStart: 12, marginTop: 8 } }}
                                    small
                                    onClick={onAddNewNameClick}
                                />
                            </PageRow>
                        </ScrollLayout>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <AppText>Close</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    chip: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        margin: 5,
        borderRadius: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagOption: {
        padding: 8,
        backgroundColor: 'lightred',
        marginVertical: 5,
        borderRadius: 4,
        opacity: 0.6,
        marginHorizontal: 4
    },
    selectedTagOption: {
        backgroundColor: '#d0e0e3',
        opacity: 1
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff6666',
        borderRadius: 10,
        alignSelf: 'center',
    },
});
