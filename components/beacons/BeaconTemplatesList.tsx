import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Modal, Button, Text, TouchableOpacity } from 'react-native';

import { BeaconTemplateCard } from './BeaconTemplateCard';
import { listStyles, modalStyles } from '@/styles/Styles';
import { setSelectedTemplateId } from '@/redux/actions';
import { BeaconsListHeader } from './BeaconsListHeader';
import BeaconTemplate from '@/models/beaconTemplate';
import BeaconTemplateDetails from './BeaconTemplateDetails';
import { OneLayoutType } from '../ones/OnesLayout';
import ScrollLayout from '../common/ScrollLayout';
import { PageColumn } from '../common/PageColumn';
import { AppText, TextType } from '../common/AppText';
import { PageRow } from '../common/PageRow';
import { ButtonType, SimpleButton } from '../common/SimpleButton';

export type IBeaconTemplatesList = ViewProps & {
    activeLayoutType: OneLayoutType;
    headerLayout?: any;
    selectedTemplateId: string | null;
    beaconTemplates: BeaconTemplate[];
    setSelectedTemplateId: Function;
    setActiveLayoutType: Function;
};

function BeaconTemplatesList({ selectedTemplateId, beaconTemplates,
    headerLayout = <></>, setSelectedTemplateId, activeLayoutType, setActiveLayoutType }: IBeaconTemplatesList) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempSelectedTemplateId, setTempSelectedTemplateId] = useState<string | null>(null);

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
    };

    const handleContinue = () => {
        if (tempSelectedTemplateId) {
            setSelectedTemplateId(tempSelectedTemplateId);
            setActiveLayoutType(OneLayoutType.ConfirmBeacon);
        }
    };

    const showBeaconActions = ![OneLayoutType.ConfirmBeacon, OneLayoutType.SentBeaconResponse].includes(activeLayoutType);
    const selectedTemplate = tempSelectedTemplateId ? beaconTemplates.find(t => t.id === tempSelectedTemplateId) : null;

    return (
        <View style={[listStyles.container, styles.container]}>
            <BeaconsListHeader activeLayoutType={activeLayoutType} selectedTemplateId={selectedTemplateId} />
            {headerLayout}

            {
                showBeaconActions && (
                    <SimpleButton text={'Choose Beacon Type'}
                        onPress={openModal}
                        type={ButtonType.Edit}/>
                )
            }

            {selectedTemplate && (
                <PageColumn style={{ marginTop: 8 }}>
                    <BeaconTemplateDetails template={selectedTemplate} activeLayoutType={activeLayoutType} />
                    {
                        showBeaconActions && (
                            <PageRow style={{ marginTop: 8 }}>
                                <SimpleButton text={'Continue'}
                                    type={ButtonType.Edit} 
                                    onPress={handleContinue} />
                            </PageRow>
                        )
                    }
                </PageColumn>
            )}

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select a Template</Text>
                        <PageColumn style={{ height: 400 }}>
                            <FlatList
                                data={beaconTemplates}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem}
                            />
                        </PageColumn>
                        <PageRow style={{ marginTop: 8 }}>
                            <TouchableOpacity
                                style={modalStyles.closeButton}
                                onPress={closeModal}>
                                <AppText>Close</AppText>
                            </TouchableOpacity>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
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
