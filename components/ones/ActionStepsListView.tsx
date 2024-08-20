
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import One from '@/models/one';
import ActionStep from '@/models/actionStep';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';

export type IActionStepListView = ViewProps & {
    actionSteps: ActionStep[];
    one: One;
};

function ActionStepsListView({ style, actionSteps, one, ...otherProps }: IActionStepListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: ActionStep }) => (
        <div>{item.notes}</div>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={actionSteps}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: IActionStepListView) => ({
    actionSteps: state.actionSteps,
    one: state.one
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ActionStepsListView);