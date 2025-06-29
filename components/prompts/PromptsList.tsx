
import React, {  } from 'react';

import { connect } from 'react-redux';
import { FlatList, View, ViewProps } from 'react-native';

import Prompt from '@/models/prompt';
import { PromptCard } from './PromptCard';
import { useThemeColors } from '@/constants/Colors';

export type IPromptsList = ViewProps & {
    prompts: Prompt[];
};

function PromptsList({ style, prompts, ...otherProps }: IPromptsList) {
  const { backgroundColor } = useThemeColors();

    const renderItem = ({ item }: { item: Prompt }) => (
        <PromptCard prompt={item}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PromptsList);