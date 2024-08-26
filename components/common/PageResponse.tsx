
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Dimensions } from 'react-native';

import { ThemedText, ThemedTextType } from './ThemedText';

export type IPageHeader = ViewProps & {
    title: string;
    details: string;
};

function PageResponse({ title, details }: IPageHeader) {

    return (
        <View style={[styles.container]}>
            <ThemedText type={ThemedTextType.Title}>
                {title}
            </ThemedText>
            <ThemedText type={ThemedTextType.Default}>
                {details}
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        paddingStart: 4,
    }
});

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.facts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PageResponse);