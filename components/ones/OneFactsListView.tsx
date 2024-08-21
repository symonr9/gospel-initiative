
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IOneFactsListView = ViewProps & {
    one: One;

    // Redux
    oneFacts: OneFact[];
};

function OneFactsListView({ style, oneFacts, one, ...otherProps }: IOneFactsListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: OneFact }) => (
        <div>{item.notes}</div>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={oneFacts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    oneFacts: state.ones.facts,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OneFactsListView);