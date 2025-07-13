import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, FlatList, StyleSheet, ViewProps } from 'react-native';
import { connect } from 'react-redux';

import { AppText, TextType } from '../common/AppText';
import { AppIcon, BeaconTag, Priority } from '@/enums/enums'; // Import any enums or constants related to tags

import { PageColumn } from '../common/PageColumn';
import { PageChip } from '../common/PageChip';
import BeaconTemplate from '@/models/beaconTemplate';
import { BeaconTemplateCard } from './BeaconTemplateCard';
import { setBeaconForm } from '@/redux/actions';
import BeaconForm from '@/models/beaconForm';
import { mapBeaconTagToTitleText } from "@/utils/textUtils";
import { getShowHideIcon } from "@/utils/iconUtils";
import { useModalStyles } from '@/styles/Styles';
import { OneLayoutType } from '../ones/OnesLayout';
import { Colors, useThemeColors } from '@/constants/Colors';
import { standardModalHeight, standardPaddedWidth } from '@/constants/Dimensions';
import { beaconTagArray } from '@/constants/Constants';

export type IBeaconTemplateDetails = ViewProps & {
    template: BeaconTemplate;
    activeLayoutType: OneLayoutType;
    setBeaconForm: Function;
};

function BeaconTemplateDetails({ template, activeLayoutType, setBeaconForm }: IBeaconTemplateDetails) {
    const [formData, setFormData] = useState(new BeaconForm(true, null, Priority.Normal, []));
    const [modalVisible, setModalVisible] = useState(false);
    
    const themeColors = useThemeColors();
    const modalStyles = useModalStyles(themeColors);

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
        setModalVisible(!modalVisible);
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
        <PageColumn style={[styles.container]}>
            <BeaconTemplateCard template={template} />

            <PageColumn style={{ marginVertical: 4 }}>
                <FlatList
                    data={formData.tags}
                    keyExtractor={(item) => item.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <PageChip
                            title={mapBeaconTagToTitleText(item)}
                            small
                        />
                    )}
                />
            </PageColumn>

            {
                activeLayoutType === OneLayoutType.ConfirmBeacon && (
                    <>
                        <PageColumn style={[styles.section, { width: standardPaddedWidth, flexShrink: 1 }]}>
                            <PageChip iconSrc={AppIcon.Tag}
                                onClick={onChangeTag}
                                title={`Add Tags`}
                                style={{ backgroundColor: Colors.info }}
                                subtitle={'Tags give others more details on how they can be praying for you.'} />
                        </PageColumn>

                        <PageColumn style={styles.section}>
                            <PageChip iconSrc={getShowHideIcon(shareOwnName)}
                                style={{ width: standardPaddedWidth, backgroundColor: Colors.info }}
                                onClick={() => setShareOwnName(!shareOwnName)}
                                title={shareOwnName ? `Your own name will be shared.` : `Your own name will be hidden.`} />
                        </PageColumn>
                    </>
                )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <AppText type={TextType.Subtitle}>Select Tags</AppText>

                        <PageColumn style={{ height: standardModalHeight }}>
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
                        </PageColumn>
                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <AppText>Close</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </PageColumn>
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
    selectedTag: {
        backgroundColor: Colors.selected,
    },
});

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = {
    setBeaconForm
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplateDetails);
