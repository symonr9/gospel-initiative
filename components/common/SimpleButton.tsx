import React, { } from 'react';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { useModalStyles } from '@/styles/Styles';
import { AppText } from './AppText';
import { Colors, useThemeColors } from '@/constants/Colors';

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
    const themeColors = useThemeColors();
    const modalStyles = useModalStyles(themeColors);

    const shouldUseDarkText = [ButtonType.Edit, ButtonType.Open, ButtonType.Close, ButtonType.Save].includes(type);

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
            <AppText style={[
                shouldUseDarkText && { color: Colors.light.text},
            ]}>{text}</AppText>
        </TouchableOpacity>
    );
}