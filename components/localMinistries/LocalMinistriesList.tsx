
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import LocalMinistry from '@/models/localMinistry';
import { LocalMinistryCard } from './LocalMinistryCard';

export type ILocalMinistriesList = ViewProps & {
    localMinistries: LocalMinistry[];
};

function LocalMinistriesList({ style, localMinistries, ...otherProps }: ILocalMinistriesList) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: LocalMinistry }) => (
        <LocalMinistryCard localMinistry={item}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocalMinistriesList);