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
}

export function SimpleGridCard({ iconSrc = null, title, subtitle, detailsView = <></>,
    onClick, style
}: ISimpleGridCard) {

    const onPress = (e: GestureResponderEvent) => {
        if (onClick) {
            onClick();
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <PageRow style={gridStyles.itemCard} spaceBetween>
                <PageRow style={{ gap: 8 }}>
                    <PageColumn>
                        {
                            iconSrc && (
                                <Image source={iconSrc} style={gridStyles.img} />
                            )
                        }
                        {
                            title && (
                                <AppText type={TextType.Subtitle} style={{ textAlign: 'center'}}>
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
            </PageRow>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

});