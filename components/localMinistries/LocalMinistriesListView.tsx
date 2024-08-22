
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import LocalMinistry from '@/models/localMinistry';
import { LocalMinistryCardView } from './LocalMinistryCardView';

export type IActionStepListView = ViewProps & {
    localMinistries: LocalMinistry[];
};

function LocalMinistriesListView({ style, localMinistries, ...otherProps }: IActionStepListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: LocalMinistry }) => (
        <LocalMinistryCardView localMinistry={item}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={localMinistries}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    missionsTrips: state.localMinistries.localMinistries
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LocalMinistriesListView);