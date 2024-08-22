

import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import LocalEvent from '@/models/localEvent';

export type IActionStepListView = ViewProps & {
    localEvents: LocalEvent[];
};

function LocalEventsListView({ style, localEvents, ...otherProps }: IActionStepListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: LocalEvent }) => (
        <div>{item.title}</div>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={localEvents}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    localEvents: state.localEvents.localEvents
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LocalEventsListView);