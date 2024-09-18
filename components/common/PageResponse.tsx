
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet, Dimensions } from 'react-native';

import { AppText, TextType } from './AppText';

export type IPageHeader = ViewProps & {
    title: string;
    details: string;
};

function PageResponse({ title, details }: IPageHeader) {

    return (
        <View style={[styles.container]}>
            <AppText type={TextType.Title}>
                {title}
            </AppText>
            <AppText type={TextType.Default}>
                {details}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    }
});

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.facts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PageResponse);