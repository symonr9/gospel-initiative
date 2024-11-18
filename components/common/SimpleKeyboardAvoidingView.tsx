import React, { } from 'react';
import { KeyboardAvoidingView, Platform, ViewProps } from 'react-native';

export type ISimpleKeyboardAvoidingView = ViewProps & {
    Element: any;
    verticalOffset?: number;
};

export function SimpleKeyboardAvoidingView({ Element, verticalOffset = 100 }: ISimpleKeyboardAvoidingView) {
    const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
    return (
        <KeyboardAvoidingView behavior={behavior} 
            keyboardVerticalOffset={verticalOffset}>
            {Element}
        </KeyboardAvoidingView>
    );
}