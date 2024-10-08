import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import AppTabView from '../common/AppTabView';
import SalvationMomentsList from './SalvationMomentsList';
import BeforeChristList from './BeforeChristList';
import AfterChristList from './AfterChristList';

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
        <View style={styles.container}>
            <AppTabView title={'Stages'}
                renderScene={renderScene}
                routes={routes} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: 1000,
        paddingBottom: 10
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