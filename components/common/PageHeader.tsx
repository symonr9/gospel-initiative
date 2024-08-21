
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { ThemedText, ThemedTextType } from './ThemedText';

export type IPageHeader = ViewProps & {
    title: string
};

function PageHeader({ style, title, ...otherProps }: IPageHeader) {
    const backgroundColor = useBackgroundThemeColor();

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <ThemedText type={ThemedTextType.Title}>
                {title}
            </ThemedText>
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.facts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);