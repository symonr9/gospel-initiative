
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import One from '@/models/one';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import Meeting from '@/models/meeting';
import { MeetingCardView } from './MeetingCardView';

export type IMeetingsListView = ViewProps & {
    meetings: Meeting[];
    one: One;
};

function MeetingsListView({ style, meetings, one, ...otherProps }: IMeetingsListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: Meeting }) => (
        <MeetingCardView meeting={item} one={one}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={meetings}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    meetings: state.ones.meetings,
    one: state.ones.one
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingsListView);