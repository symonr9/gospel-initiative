import React from 'react';
import { View, Text, StyleSheet, ViewProps, Modal, TouchableWithoutFeedback } from 'react-native';

export type ISimpleModal = ViewProps & {
    visible: boolean,
    onRequestClose: any,
};

export function SimpleModal({ visible, onRequestClose, style, children }: ISimpleModal) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                {children}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});