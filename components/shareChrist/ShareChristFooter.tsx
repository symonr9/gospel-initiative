
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { AnimatedPageRow } from '../common/AnimatedPageRow';
import { AppIcon, Page, PrayerType } from '@/enums/enums';
import NavigateToOnesCard from '../ones/NavigateToOnesCard';
import NavigateToPrayersCard from '../prayers/NavigateToPrayersCard';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import SimpleNavigateToCard from '../common/SimpleNavigateToCard';
import { SimpleIconButton } from '../common/SimpleIconButton';
import SimpleBackIconButton from '../common/SimpleBackIconButton';

export type IShareChristFooter = ViewProps & {
    page: Page,
};

export function ShareChristFooter({ page }: IShareChristFooter) {

    return (
        <AnimatedPageRow itemsToRender={getItemsToRender(page)} />
    );
}

const getItemsToRender = (page: Page) => {
    if (page == Page.OnesList) {
        return [
            <SimpleBackIconButton iconSrc={AppIcon.ArrowBack} 
                                  pageToOpen={Page.ShareChrist}
                                  title={'Back'}/>,
            <NavigateToOnesCard />,
        ];
    } else if (page == Page.PrayersList) {
        return [
            <SimpleBackIconButton iconSrc={AppIcon.ArrowBack} 
                                  pageToOpen={Page.ShareChrist}
                                  title={'Back'}/>,
            <NavigateToPrayersCard typeToOpen={PrayerType.ForOne} />,
        ];
    }

    return [
        <NavigateToPrayersCard typeToOpen={PrayerType.ForOne} />,
        <NavigateToOnesCard />
    ];
}