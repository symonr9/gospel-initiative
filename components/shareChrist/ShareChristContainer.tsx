
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { Page, ShareChristPageState } from '@/enums/enums';
import { PageContainer } from '../common/PageContainer';
import OnesLayout from '../ones/OnesLayout';

export type IShareChristContainer = ViewProps & {
    page: Page,
    pageState: ShareChristPageState,
};

export function ShareChristContainer({ page, pageState }: IShareChristContainer) {
    return (
        <PageContainer>
            <AnimatedPageSection column 
                                 durationPerEach={800}
                                 itemsToRender={getItemsToRender(page, pageState)}/>
        </PageContainer>
    );
}

const getItemsToRender = (page: Page, pageState: ShareChristPageState) => {
    if (page == Page.OnesList) {
        if (pageState == ShareChristPageState.Edit) {
            return [
                <ThemedText type={ThemedTextType.Subtitle}>
                    Editing for...
                </ThemedText>,
                <AnimatedPageSection itemsToRender={[
                    <ThemedText type={ThemedTextType.Default}>
                        Text Goes here
                    </ThemedText>,
                    <ThemedText type={ThemedTextType.Default}>
                        Text Goes here
                    </ThemedText>
                ]} />,
                <ThemedText type={ThemedTextType.Default}>
                    Text Here
                </ThemedText>,
                <ThemedText type={ThemedTextType.Default}>
                    Text Here
                </ThemedText>,
                <ThemedText type={ThemedTextType.Default}>
                    Text Here
                </ThemedText>,
                <ThemedText type={ThemedTextType.Default}>
                    Text Here
                </ThemedText>,
                <ThemedText type={ThemedTextType.Default}>
                    Text Here
                </ThemedText>,
            ];
        } else if (pageState == ShareChristPageState.PrayerBeacon) {
            return [
                <ThemedText type={ThemedTextType.Subtitle}>
                    Prayer Beacon
                </ThemedText>,
                <AnimatedPageSection itemsToRender={[
                    <ThemedText type={ThemedTextType.Default}>
                        Text Goes here
                    </ThemedText>,
                    <ThemedText type={ThemedTextType.Default}>
                        Text Goes here
                    </ThemedText>
                ]} />
            ];
        }

        return [
            <OnesLayout/>
        ];
    }

    return [
        <ThemedText type={ThemedTextType.Subtitle}>
            Share Christ
        </ThemedText>,
        <AnimatedPageSection itemsToRender={[
            <ThemedText type={ThemedTextType.Default}>
                Text Goes here
            </ThemedText>,
            <ThemedText type={ThemedTextType.Default}>
                Text Goes here
            </ThemedText>
        ]} />
    ];
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristContainer);
