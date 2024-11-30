import { AppIcon } from '@/enums/enums';
import StoryChapter from '@/models/storyChapter';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput, ViewProps } from 'react-native';
import { PageChip } from '../common/PageChip';
import { AppText } from '../common/AppText';
import ScrollLayout from '../common/ScrollLayout';
import { PageRow } from '../common/PageRow';
import { formStyles } from '@/styles/Styles';
import SimpleIconButton from '../common/SimpleIconButton';
import { PageColumn } from '../common/PageColumn';
import { Colors } from '@/constants/Colors';

type NamesPickerProps = ViewProps & {
    formChapter: StoryChapter;
    setFormChapter?: (updatedChapter: StoryChapter) => void;
    editing?: Boolean;
    maxToRender?: number | null;
};

export default function NamesPicker({ formChapter, setFormChapter, editing = true, style, maxToRender = null }: NamesPickerProps) {
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

    let names = formChapter.names;
    if (maxToRender !== null) {
        names = names.filter((name, idx) => idx < maxToRender);
    }

    return (
        <PageColumn style={[style]}>
            {
                editing && (
                    <PageColumn style={{ marginTop: 8 }}>
                        <AppText>
                            Related Names:
                        </AppText>
                        <PageRow style={{ width: 100, marginTop: 4, height: 30 }}>
                            <PageChip title={'Edit'}
                                iconSrc={AppIcon.Edit}
                                onClick={() => setModalVisible(true)}
                                small />
                        </PageRow>
                    </PageColumn>
                )
            }

            <PageRow>
                <FlatList
                    data={names}
                    numColumns={3}
                    keyExtractor={(item, index) => item}
                    renderItem={({ item }) => (
                        <PageChip title={item}
                            onClick={() => editing && setModalVisible(true)}
                            style={{ backgroundColor: Colors.info }}
                            small />
                    )} />
            </PageRow>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Names</Text>

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

                        <PageColumn style={{ maxHeight: 300 }}>
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
                        </PageColumn>

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
        backgroundColor: Colors.selected,
        opacity: 1
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: Colors.error,
        borderRadius: 10,
        alignSelf: 'center',
    },
});
