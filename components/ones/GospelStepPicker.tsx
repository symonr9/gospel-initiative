import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ViewProps } from 'react-native';
import { refreshData, setAppError } from '@/redux/actions/appActions';
import One from '@/models/one';
import User from '@/models/user';
import GospelStep from '@/models/gospelStep';
import { getSelectedOne } from '@/utils/appUtils';
import { GospelStepCard } from './GospelStepCard';

export type IGospelStepPicker = ViewProps & {
    selectedOneId: string | null;
    ones: One[];
    refreshData: Function;
    setAppError: Function;
};

enum PickerState {
    Normal,
    Editing,
    Completing
}

function GospelStepPicker({ selectedOneId, ones, refreshData, setAppError }: IGospelStepPicker) {

    const [pickerState, setPickerState] = useState<PickerState>(PickerState.Normal);
    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [formGospelStep, setFormGospelStep] = useState<GospelStep>(GospelStep.createDefault(selectedOneId || ""));

    const [modalVisible, setModalVisible] = useState(false);

    const selectedOne = getSelectedOne(selectedOneId, ones);
    const gospelSteps = selectedOne ? [...selectedOne.gospelSteps] : [];
    const selectedGospelStep = selectedStepId ? gospelSteps.find((step) => step.id === selectedStepId) : null;

    useEffect(() => {
        if (!selectedStepId || !selectedGospelStep) {
            return;
        }
        setFormGospelStep(selectedGospelStep);
    }, [selectedStepId]);
    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const renderGospelStep = ({ item }: { item: GospelStep}) => {
        const isSelected = selectedStepId === item.id;

        const handleOnPress = () => {

        };

        return (
            <GospelStepCard gospelStep={item}
                selected={isSelected}
                handleOnPress={handleOnPress}/>
        );
    };

    const onBackClick = () => {
        setSelectedStepId(null);
        setPickerState(PickerState.Normal);
    }

    const onSaveClick = async () => {

    };

    return (
        <></>
    );
}

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        paddingBottom: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2
    },
    pageHeader: {
        marginBottom: 8,
    },
    title: {
        marginBottom: 8,
    },
    actionStepList: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonRow: {
    },
});

const mapStateToProps = (state: any) => ({
    selectedOneId: state.ones.selectedOneId,
    ones: state.ones.ones,
});


const mapDispatchToProps = {
    refreshData,
    setAppError
};

export default connect(mapStateToProps, mapDispatchToProps)(GospelStepPicker);
