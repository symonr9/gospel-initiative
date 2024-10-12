
import React, {  } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { AppText, TextType } from '../common/AppText';
import { selectOneFactsByOneId } from '@/redux/selectors';
import { OneFactCard } from './OneFactCard';
import { PageRow } from '../common/PageRow';

export type IOneFactsList = ViewProps & {
    selectedOne: One;
};

function OneFactsList({ selectedOne }: IOneFactsList) {
    const oneFacts = useSelector(selectOneFactsByOneId(selectedOne.id));

    const renderItem = ({ item }: { item: OneFact }) => (
        <OneFactCard oneFact={item}/>
    );

    return (
        <View style={[styles.container]}>
            <PageRow spaceBetween>
                <AppText type={TextType.Subtitle}>
                    Fun Facts
                </AppText>
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
        maxHeight: 500,
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OneFactsList);