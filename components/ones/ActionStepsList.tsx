
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';
import ActionStep from '@/models/actionStep';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { ActionStepCard } from './ActionStepCard';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { selectActionStepsByOneId } from '@/redux/selectors';
import { PageRow } from '../common/PageRow';
import { AppIcon, Page, ShareChristPageState } from '@/enums/enums';
import { setShareChristPageState } from '@/redux/actions';
import SimpleIconButton from '../common/SimpleIconButton';
import { isEditing } from '@/utils/appUtils';
import { listStyles } from '@/styles/Styles';

export type IActionStepsList = ViewProps & {
    selectedOne: One;
    shareChristPageState: ShareChristPageState;
    
    setShareChristPageState: Function;
};

function ActionStepsList({ selectedOne, shareChristPageState, 
    setShareChristPageState }: IActionStepsList) {
    const actionSteps = useSelector(selectActionStepsByOneId(selectedOne.id));
    const editing = isEditing(shareChristPageState);

    const renderItem = ({ item }: { item: ActionStep }) => (
        <ActionStepCard actionStep={item} />
    );

    return (
        <View style={[listStyles.container, styles.container]}>
            <PageRow spaceBetween>
                <ThemedText type={ThemedTextType.Subtitle}>
                    Action Steps
                </ThemedText>
                {
                    editing && (
                        <SimpleIconButton iconSrc={AppIcon.Edit}
                        small
                        onClick={() => setShareChristPageState(ShareChristPageState.EditActionSteps)}/>
                    )
                }
            </PageRow>
            <FlatList
                data={actionSteps}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 120,
    }
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
});


const mapDispatchToProps = {
    setShareChristPageState
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionStepsList);