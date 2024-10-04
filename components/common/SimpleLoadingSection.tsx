import React from 'react';
import { ActivityIndicator, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { AppText, TextType } from './AppText';
import { PageColumn } from './PageColumn';
import { Colors } from '@/constants/Colors';

export type ISimpleLoadingSection = ViewProps & {
    title?: string;
    subtitle?: string;
}

export function SimpleLoadingSection({ title, subtitle }: ISimpleLoadingSection) {
    return (
        <PageColumn>
            {
                title && (
                    <AppText type={TextType.BodyBold}>
                        {title}
                    </AppText>
                )
            }

            {
                subtitle && (
                    <AppText type={TextType.Default} style={{ marginVertical: 8 }}>
                        {subtitle}
                    </AppText>
                )
            }

            <ActivityIndicator
                size="large"
                color={Colors.light.primary}
            />
        </PageColumn>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});