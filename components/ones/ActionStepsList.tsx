
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

export type IActionStepsList = ViewProps & {
    one: One;

    
    setShareChristPageState: Function;
};

function ActionStepsList({ one, setShareChristPageState }: IActionStepsList) {
    const actionSteps = useSelector(selectActionStepsByOneId(one.id));

    const renderItem = ({ item }: { item: ActionStep }) => (
        <ActionStepCard actionStep={item} />
    );

    return (
        <View style={styles.container}>
            <PageRow spaceBetween>
                <ThemedText type={ThemedTextType.Subtitle}>
                    Action Steps
                </ThemedText>
                <SimpleIconButton iconSrc={AppIcon.Edit}
                                  small
                                  onClick={() => setShareChristPageState(ShareChristPageState.EditActionSteps)}/>
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'whitesmoke',
        padding: 8,
        minHeight: 100,
        overflow: 'scroll',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 4,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        marginBottom: 8,
    },
});

const mapStateToProps = (state: any) => ({
});


const mapDispatchToProps = {
    setShareChristPageState
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionStepsList);