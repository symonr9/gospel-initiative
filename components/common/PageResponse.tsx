
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
        padding: 24,
        backgroundColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 8,
    }
});

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.facts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PageResponse);