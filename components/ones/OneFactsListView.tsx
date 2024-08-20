
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IOneFactsListView = ViewProps & {
    oneFacts: OneFact[];
    one: One;
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

const mapStateToProps = (state: IOneFactsListView) => ({
    oneFacts: state.oneFacts,
    one: state.one
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OneFactsListView);