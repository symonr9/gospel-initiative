import React from 'react';
import { GestureResponderEvent, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';


import { AppText, TextType } from './AppText';
import { ThemedView } from './ThemedView';
import { AppIcon, AvatarIcon } from '@/enums/enums';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { useGridStyles } from '@/styles/Styles';
import { Colors, useThemeColors } from '@/constants/Colors';
import { StyledImage } from './StyledImage';

export type ISimpleBadge = ViewProps & {
    iconSrc?: AppIcon | AvatarIcon | null;
    title: string;
    subtitle?: string;
    detailsView?: any;
    onClick?: Function;
    useTextTintForIcon?: boolean;
}

export function SimpleBadge({ iconSrc = null, title, subtitle, detailsView = <></>,
    onClick, style, useTextTintForIcon = true,
}: ISimpleBadge) {

    const themeColors = useThemeColors();
    const gridStyles = useGridStyles(themeColors);

    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <PageColumn style={[styles.badge, style]}>
                {
                    iconSrc && (
                        <StyledImage iconSrc={iconSrc} style={[styles.icon]} useTextTint={false}/>
                    )
                }
                <PageColumn center style={{ marginTop: 4 }}>
                    <AppText type={TextType.Subtitle3} style={{}}>{title}</AppText>
                    {
                        subtitle && (
                            <AppText type={TextType.Italic} style={{}}>{subtitle}</AppText>
                        )
                    }
                </PageColumn>
                {detailsView}
            </PageColumn>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    badge: {
        borderRadius: 8, // rounded corners for a modern feel
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
        paddingVertical: 6,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    icon: {
        width: 30,
        height: 30,
        marginEnd: 8,
        alignSelf: 'center'
    },
});