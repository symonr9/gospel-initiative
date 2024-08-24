
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Dimensions } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { ThemedText, ThemedTextType } from './ThemedText';

export type IPageHeader = ViewProps & {
    title: string
};

function PageHeader({ style, title }: IPageHeader) {
    const backgroundColor = useBackgroundThemeColor();

    return (
        <View style={[{ backgroundColor }, styles.container]}>
            <ThemedText type={ThemedTextType.Title}>
                {title}
            </ThemedText>
        </View>
    );
}

const { height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: viewportHeight * 0.05,
        paddingTop: 4,
        paddingStart: 4,
    }
});

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.facts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);