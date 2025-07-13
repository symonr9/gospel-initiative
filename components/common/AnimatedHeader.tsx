import React, { } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, TextType } from './AppText';
import { PageRow } from './PageRow';
import { standardPaddedWidth } from '@/constants/Dimensions';
import { Colors, useThemeColors } from '@/constants/Colors';

type IAnimatedHeader = {
    title: string;
    titleType?: TextType;
    subtitle?: string | null;
    duration?: number;
    delay?: number;
    key?: string | null;
    overridingTextColor?: string | null;
    useOppositeTextColor?: boolean;
    style?: any;
};

export function AnimatedHeader({ title, key = null, titleType = TextType.Subtitle,
    subtitle = null, duration = 400, delay = 0, style = {}, overridingTextColor = null,
    useOppositeTextColor = false }: IAnimatedHeader) {

    const { textColor: themedTextColor } = useThemeColors();

    const textColor = useOppositeTextColor ? (themedTextColor === Colors.light.text ? Colors.dark.text : Colors.light.text) : themedTextColor;

    return (
        <View style={[styles.container, style]}>
            <PageRow style={{ flexShrink: 1, width: standardPaddedWidth }}>
                <AppText type={titleType} style={{ color: overridingTextColor || textColor }}>
                    {title}
                </AppText>
            </PageRow>
            {
                subtitle && (
                    <PageRow style={{ flexShrink: 1, width: standardPaddedWidth, marginTop: 4 }}>
                        <AppText type={TextType.Body} style={{ color: overridingTextColor || textColor }}>
                            {subtitle}
                        </AppText>
                    </PageRow>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
    },
});
