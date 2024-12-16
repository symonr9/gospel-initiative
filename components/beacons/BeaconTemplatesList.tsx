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
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';

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
    const [tempSelectedTemplateId, setTempSelectedTemplateId] = useState<string | null>(selectedTemplateId);

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
                    <PageRow center>
                        <SimpleIconButton iconSrc={AppIcon.ArrowNext}
                            title={'Continue'}
                            disabled={selectedTemplate === null}
                            onClick={handleContinue} />
                    </PageRow>
                )
            }

            {selectedTemplate && (
                <PageColumn>
                    <BeaconTemplateDetails template={selectedTemplate} activeLayoutType={activeLayoutType} />
                </PageColumn>
            )}

            {
                showBeaconActions && (
                    <SimpleButton text={'Choose Beacon Type'}
                        onPress={openModal}
                        type={ButtonType.Edit} />
                )
            }

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
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
