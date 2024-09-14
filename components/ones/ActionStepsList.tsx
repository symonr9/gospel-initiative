
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';
import ActionStep from '@/models/actionStep';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { ActionStepCard } from './ActionStepCard';
import { AppText, TextType } from '../common/AppText';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { PageRow } from '../common/PageRow';
import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { setShareChristPageState } from '@/redux/actions';
import SimpleIconButton from '../common/SimpleIconButton';
import { isEditing } from '@/utils/appUtils';
import { listStyles } from '@/styles/Styles';
import ScrollLayout from '../common/ScrollLayout';


export type IActionStepsList = ViewProps & {
    actionSteps: ActionStep[];
    shareChristPageState: ShareChristPageState;
    
    setShareChristPageState: Function;
};

function ActionStepsList({ actionSteps, shareChristPageState, 
    setShareChristPageState }: IActionStepsList) {
    const editing = isEditing(shareChristPageState);

    const renderItem = ({ item }: { item: ActionStep }) => (
        <ActionStepCard actionStep={item} />
    );

    return (
        <View style={[listStyles.container, styles.container]}>
            <PageRow spaceBetween>
                <AppText type={TextType.Subtitle}>
                    Action Steps
                </AppText>
            </PageRow>

            <ScrollLayout>
                <FlatList
                    data={actionSteps}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </ScrollLayout>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 300,
        marginBottom: 12,
    }
});

const mapStateToProps = (state: any) => {
    const selectedOne = state.ones.selectedOne;
    const actionSteps = selectedOne ? selectActionStepsByOneId(state, selectedOne.id) : [];
    return {
      actionSteps,
      shareChristPageState: state.app.shareChristPageState
    };
};


const mapDispatchToProps = {
    setShareChristPageState
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionStepsList);