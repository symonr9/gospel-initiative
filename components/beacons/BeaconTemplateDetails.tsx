import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, FlatList, StyleSheet, ViewProps } from 'react-native';
import { connect } from 'react-redux';

import { AppText, TextType } from '../common/AppText';
import { AppIcon, BeaconTag, Priority } from '@/enums/enums'; // Import any enums or constants related to tags
import { ThemedView } from '../common/ThemedView';
import { PageColumn } from '../common/PageColumn';
import { PageChip } from '../common/PageChip';
import BeaconTemplate from '@/models/beaconTemplate';
import { BeaconTemplateCard } from './BeaconTemplateCard';
import One from '@/models/one';
import { setBeaconForm } from '@/redux/actions';
import BeaconForm from '@/models/beaconForm';
import { getShowHideIcon, mapBeaconTagToDetailsText, mapBeaconTagToTitleText } from '@/utils/appUtils';
import ScrollLayout from '../common/ScrollLayout';

const beaconTagArray = Object.keys(BeaconTag)
    .filter(key => isNaN(Number(key)))
    .map((key, index) => ({
        value: BeaconTag[key as keyof typeof BeaconTag],
        title: mapBeaconTagToTitleText(BeaconTag[key as keyof typeof BeaconTag]),
        details: mapBeaconTagToDetailsText(BeaconTag[key as keyof typeof BeaconTag]),
    }));

export type IBeaconTemplateDetails = ViewProps & {
    template: BeaconTemplate;
    selectedOne: One;
    setBeaconForm: Function;
};

function BeaconTemplateDetails({ template, selectedOne, setBeaconForm }: IBeaconTemplateDetails) {
    const [formData, setFormData] = useState(new BeaconForm(true, null, Priority.Normal, []));
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    useEffect(() => {
        setBeaconForm(formData);
    }, [formData]);

    const setShareOwnName = (shareOwnName: boolean) => {
        setFormData((prev) => ({
            ...prev,
            shareOwnName
        }));
    };

    const onChangeTag = () => {
        setModalVisible(!modalVisible); // Toggle modal visibility
    };

    const onTagSelect = (tag: BeaconTag) => {
        const isSelected = formData.tags.includes(tag);
        if (isSelected) {
            setFormData((prev) => ({
                ...prev,
                tags: formData.tags.filter((t) => t !== tag)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                tags: [...formData.tags, tag]
            }));
        }
    };

    const { shareOwnName } = formData;

    return (
        <ThemedView style={[styles.container]}>
            <BeaconTemplateCard template={template}
                selectedTemplateId={template.id} />


            <ScrollLayout style={{ maxHeight: 100, marginVertical: 16 }}>
                <FlatList
                    data={formData.tags}
                    keyExtractor={(item) => item.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <PageChip
                            title={mapBeaconTagToTitleText(item)}
                            small
                        />
                    )}
                />
            </ScrollLayout>


            <PageColumn style={styles.section}>
                <PageChip iconSrc={AppIcon.Tag}
                    onClick={onChangeTag}
                    title={`Add Tags`}
                    subtitle={'Tags give others more details on how they can be praying for you.'} />
            </PageColumn>

            <PageColumn style={styles.section}>
                <PageChip iconSrc={getShowHideIcon(shareOwnName)}
                    style={{ width: 280 }}
                    onClick={() => setShareOwnName(!shareOwnName)}
                    title={shareOwnName ? `Your own name will be shared.` : `Your own name will be hidden.`} />
            </PageColumn>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <AppText type={TextType.Subtitle}>Select Tags</AppText>

                        <ScrollLayout style={{ height: 400 }}>
                            <FlatList
                                data={beaconTagArray}
                                keyExtractor={(item) => item.value.toString()}
                                renderItem={({ item }) => (
                                    <PageChip
                                        title={item.title}
                                        subtitle={item.details}
                                        onClick={() => onTagSelect(item.value)}
                                        style={[{ marginBottom: 12 }, formData.tags.includes(item.value) && styles.selectedTag]}
                                    />
                                )}
                            />
                        </ScrollLayout>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <AppText>Close</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <PageColumn style={styles.section}>
                <AppText type={TextType.Subtitle}>
                    When you send...
                </AppText>
                <AppText type={TextType.Default}>
                    Your beacon will be delivered to friends in your community and will
                    be active for 24 hours.
                </AppText>
            </PageColumn>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 4,
        elevation: 4,
    },
    section: {
        marginBottom: 8
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff6666',
        borderRadius: 5,
        alignSelf: 'center',
    },
    selectedTag: {
        backgroundColor: '#d0e0e3',
    },
});

const mapStateToProps = (state: any) => {
    return {
        selectedOne: state.ones.selectedOne
    };
};

const mapDispatchToProps = {
    setBeaconForm
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplateDetails);
