

import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import LocalEvent from '@/models/localEvent';
import { LocalEventCard } from './LocalEventCard';

export type ILocalEventsList = ViewProps & {
    localEvents: LocalEvent[];
};

function LocalEventsList({ style, localEvents, ...otherProps }: ILocalEventsList) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: LocalEvent }) => (
        <LocalEventCard localEvent={item}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocalEventsList);