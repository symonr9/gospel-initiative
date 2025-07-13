import React from 'react';
import { GestureResponderEvent, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';


import { AppText, TextType } from './AppText';
import { AppIcon, AvatarIcon } from '@/enums/enums';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { useGridStyles } from '@/styles/Styles';
import { standardPaddedWidth } from '@/constants/Dimensions';
import { useThemeColors } from '@/constants/Colors';
import { StyledImage } from './StyledImage';

export type ISimpleGridCard = ViewProps & {
    iconSrc: AppIcon | AvatarIcon | null;
    title: string;
    subtitle?: string;
    detailsView?: any;
    onClick?: Function;
    horizontal?: boolean;
    useTextTintForIcon?: boolean;
}

export function SimpleGridCard({ iconSrc = null, title, subtitle, detailsView = <></>,
    onClick, style, horizontal = true, useTextTintForIcon = true,
}: ISimpleGridCard) {

    const themeColors = useThemeColors();
    const gridStyles = useGridStyles(themeColors);

    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            onClick();
        }
    }

    let Layout = <></>;
    if (horizontal) {
        Layout = (
            <PageRow style={{ gap: 8 }}>
                {
                    iconSrc && (
                        <StyledImage iconSrc={iconSrc} style={[gridStyles.img]} useTextTint={useTextTintForIcon} />
                    )
                }
                <PageColumn style={{ width: standardPaddedWidth, flexShrink: 1 }}>
                    {
                        title && (
                            <AppText type={TextType.Subtitle3} style={{}}>
                                {title}
                            </AppText>
                        )
                    }

                    {
                        subtitle && (
                            <AppText type={TextType.Body} style={{}}>
                                {subtitle}
                            </AppText>
                        )
                    }
                </PageColumn>
                {detailsView}
            </PageRow >
        );
    } else {
        Layout = (
            <>
                <PageRow style={{ gap: 8 }}>
                    <PageColumn>
                        {
                            iconSrc && (
                                <StyledImage iconSrc={iconSrc} style={[gridStyles.img]} useTextTint={useTextTintForIcon} />
                            )
                        }
                        {
                            title && (
                                <AppText type={TextType.Subtitle} style={{ textAlign: 'center' }}>
                                    {title}
                                </AppText>
                            )
                        }

                        {
                            subtitle && (
                                <AppText type={TextType.Body} style={{ textAlign: 'center' }}>
                                    {subtitle}
                                </AppText>
                            )
                        }
                    </PageColumn>
                </PageRow>

                {detailsView}
            </>
        );
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <PageRow style={[gridStyles.itemCard, style]} spaceBetween>
                {Layout}
            </PageRow>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

});