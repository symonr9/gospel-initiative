
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { selectOneFactsByOneId } from '@/redux/selectors';
import { OneFactCard } from './OneFactCard';
import { AppIcon, ShareChristPageState } from '@/enums/enums';
import { setShareChristPageState } from '@/redux/actions';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';

export type IOneFactsList = ViewProps & {
    one: One;

    // Redux
};

function OneFactsList({ one }: IOneFactsList) {
    const oneFacts = useSelector(selectOneFactsByOneId(one.id));

    const renderItem = ({ item }: { item: OneFact }) => (
        <OneFactCard oneFact={item}/>
    );

    return (
        <View style={styles.container}>
            <PageRow spaceBetween>
                <ThemedText type={ThemedTextType.Subtitle}>
                    Fun Facts
                </ThemedText>
                <SimpleIconButton iconSrc={AppIcon.Edit}
                                  small
                                  onClick={() => setShareChristPageState(ShareChristPageState.EditOneFacts)}/>
            </PageRow>
            <FlatList
                data={oneFacts}
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
        minHeight: 200,
        overflow: 'scroll',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 4,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
});

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OneFactsList);