import React from 'react';
import { GestureResponderEvent, type ViewProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';


import { AppText, TextType } from './AppText';
import { AppIcon, AvatarIcon } from '@/enums/enums';
import { PageRow } from './PageRow';
import { PageColumn } from './PageColumn';
import { gridStyles } from '@/styles/Styles';

export type ISimpleGridCard = ViewProps & {
    iconSrc: AppIcon | AvatarIcon | null;
    title: string;
    subtitle?: string;
    detailsView?: any;
    onClick?: Function;
    horizontal?: boolean;
}

export function SimpleGridCard({ iconSrc = null, title, subtitle, detailsView = <></>,
    onClick, style, horizontal = true
}: ISimpleGridCard) {

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
                        <Image source={iconSrc} style={gridStyles.img} />
                    )
                }
                <PageColumn style={{ width: 250, flexShrink: 1 }}>
                    {
                        title && (
                            <AppText type={TextType.Subtitle3} style={{ }}>
                                {title}
                            </AppText>
                        )
                    }

                    {
                        subtitle && (
                            <AppText type={TextType.Body} style={{ }}>
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
                                <Image source={iconSrc} style={gridStyles.img} />
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