import React, { } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import Confetti from 'react-native-reanimated-confetti';
import Svg, { Path } from 'react-native-svg';
import { modalStyles } from '@/styles/Styles';
import { AppText } from './AppText';

export type ISimpleButton = ViewProps & {
    type?: ButtonType;
    text: String;
    disabled?: boolean;
    onPress: Function;
};

export enum ButtonType {
    Edit,
    Open,
    Close,
    Save
};

export function SimpleButton({ style, text, onPress, type = ButtonType.Edit, disabled = false }: ISimpleButton) {
    return (
        <TouchableOpacity onPress={() => onPress()}
            style={[
                type === ButtonType.Edit && modalStyles.editButton,
                type === ButtonType.Open && modalStyles.openButton,
                type === ButtonType.Close && modalStyles.closeButton,
                type === ButtonType.Save && modalStyles.saveButton,
                disabled && { opacity: 0.5 },
                style
            ]} 
            disabled={disabled}>
            <AppText>{text}</AppText>
        </TouchableOpacity>
    );
}