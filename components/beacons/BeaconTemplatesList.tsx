import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Modal, Button, Text, TouchableOpacity } from 'react-native';

import { BeaconTemplateCard } from './BeaconTemplateCard';
import { listStyles, useModalStyles } from '@/styles/Styles';
import { setSelectedTemplateId } from '@/redux/actions';
import { BeaconsListHeader } from './BeaconsListHeader';
import BeaconTemplate from '@/models/beaconTemplate';
import BeaconTemplateDetails from './BeaconTemplateDetails';
import { OneLayoutType } from '../ones/OnesLayout';
import { PageColumn } from '../common/PageColumn';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { ButtonType, SimpleButton } from '../common/SimpleButton';
import { useThemeColors } from '@/constants/Colors';

export type IBeaconTemplatesList = ViewProps & {
    activeLayoutType: OneLayoutType;
    headerLayout?: any;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
    setActiveLayoutType: Function;
    basicMode?: boolean;
};

function BeaconTemplatesList({ selectedTemplateId, beaconTemplates,
    headerLayout = <></>, setSelectedTemplateId, activeLayoutType, setActiveLayoutType,
    basicMode = false }: IBeaconTemplatesList) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempSelectedTemplateId, setTempSelectedTemplateId] = useState<string | null>(selectedTemplateId);

    const themeColors = useThemeColors();
    const modalStyles = useModalStyles(themeColors);

    const renderItem = ({ item }: { item: BeaconTemplate }) => {
        return (
            <TouchableOpacity onPress={() => setTempSelectedTemplateId(item.id)}>
                <BeaconTemplateCard
                    template={item}
                    isSelected={tempSelectedTemplateId === item.id}
                />
            </TouchableOpacity>
        );
    };

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => {
        setIsModalVisible(false);
        if (tempSelectedTemplateId !== null) {
            setSelectedTemplateId(tempSelectedTemplateId);
            setActiveLayoutType(OneLayoutType.ConfirmBeacon);
        }
    };

    const showBeaconActions = ![OneLayoutType.ConfirmBeacon, OneLayoutType.SentBeaconResponse].includes(activeLayoutType);
    const selectedTemplate = tempSelectedTemplateId ? beaconTemplates.find(t => t.id === tempSelectedTemplateId) : null;

    return (
        <View style={[listStyles.container, styles.container]}>
            {
                !basicMode && (
                    <BeaconsListHeader activeLayoutType={activeLayoutType}
                        selectedTemplateId={selectedTemplateId} />
                )
            }

            {headerLayout}

            {
                showBeaconActions && !selectedTemplate && (
                    <SimpleButton text={'Choose Beacon'}
                        onPress={openModal}
                        type={ButtonType.Edit} />
                )
            }

            {selectedTemplate && (
                <PageColumn>
                    <BeaconTemplateDetails template={selectedTemplate} activeLayoutType={activeLayoutType} />
                </PageColumn>
            )}

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <AppText type={TextType.Subtitle}>Select a Template</AppText>
                        <PageColumn style={{ marginTop: 12, height: 400 }}>
                            <FlatList
                                data={beaconTemplates}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem}
                            />
                        </PageColumn>
                        <PageRow center style={{ marginTop: 8, gap: 64 }}>
                            <SimpleButton type={ButtonType.Close}
                                text={'Close'} onPress={closeModal} />
                            <SimpleButton type={ButtonType.Save}
                                disabled={tempSelectedTemplateId === null}
                                text={'Continue'} onPress={closeModal} />
                        </PageRow>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

const mapStateToProps = (state: any) => ({
    selectedTemplateId: state.beacons.selectedTemplateId,
    beaconTemplates: state.beacons.beaconTemplates,
});

const mapDispatchToProps = {
    setSelectedTemplateId,
};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplatesList);
