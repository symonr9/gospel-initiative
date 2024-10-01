import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import { AnimatedHeader } from '../common/AnimatedHeader';
import ScrollLayout from '../common/ScrollLayout';
import StoryChapter from '@/models/storyChapter';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import { AppIcon } from '@/enums/enums';
import AppTabView from '../common/AppTabView';
import SalvationMomentsList from './SalvationMomentsList';
import BeforeChristList from './BeforeChristList';
import AfterChristList from './AfterChristList';
import { PageColumn } from '../common/PageColumn';

export type IBrowseChaptersList = ViewProps & {
    setActiveLayoutType: Function;
};

export enum StoryLayoutType {
    Normal,
    Editing,
    Adding
};

const renderScene = SceneMap({
    beforeChrist: BeforeChristList,
    salvation: SalvationMomentsList,
    afterChrist: AfterChristList,
});

function BrowseChaptersList({ setActiveLayoutType }: IBrowseChaptersList) {
    const [routes] = React.useState([
        { key: 'beforeChrist', title: 'Before Christ' },
        { key: 'salvation', title: 'Salvation' },
        { key: 'afterChrist', title: 'After Christ' },
    ]);

    return (
        <ScrollLayout>
            <View style={styles.container}>
                <AppTabView title={'Stages'}
                    renderScene={renderScene}
                    routes={routes} />
            </View>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    iconDiv: {
        alignItems: 'center',
    },
    icon: {
        height: 60,
        width: 60,
    },
});

const mapStateToProps = (state: any) => {
    return {
    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseChaptersList);