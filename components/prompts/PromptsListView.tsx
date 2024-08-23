
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import Prompt from '@/models/prompt';
import { PromptCardView } from './PromptCardView';

export type IPromptsListView = ViewProps & {
    prompts: Prompt[];
};

function PromptsListView({ style, prompts, ...otherProps }: IPromptsListView) {
    const backgroundColor = useBackgroundThemeColor();

    const renderItem = ({ item }: { item: Prompt }) => (
        <PromptCardView prompt={item}/>
    );

    return (
        <View style={[{ backgroundColor }, style]} {...otherProps}>
            <FlatList
                data={prompts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    prompts: state.prompts.prompts
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PromptsListView);