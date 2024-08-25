
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { Colors, useBackgroundThemeColor } from '@/constants/Colors';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import { selectOneFactsByOneId } from '@/redux/selectors';
import { OneFactCard } from './OneFactCard';

export type IOneFactsList = ViewProps & {
    one: One;

    // Redux
};

function OneFactsList({ one }: IOneFactsList) {
    const oneFactsForUser = useSelector(selectOneFactsByOneId(one.id));

    console.log("oneFactsForUser: ", oneFactsForUser);

    const renderItem = ({ item }: { item: OneFact }) => (
        <OneFactCard oneFact={item}/>
    );

    return (
        <View style={styles.container}>
            <ThemedText type={ThemedTextType.Subtitle}>
                Fun Facts
            </ThemedText>,
            <FlatList
                data={oneFactsForUser}
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
    },
});

const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OneFactsList);