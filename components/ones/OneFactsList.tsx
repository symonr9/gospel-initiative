
import React, { useState, useEffect } from 'react';

import { connect, useSelector } from 'react-redux';
import { FlatList, View, ViewProps, StyleSheet } from 'react-native';

import One from '@/models/one';
import OneFact from '@/models/oneFact';
import { AppText, TextType } from '../common/AppText';
import { selectOneFactsByOneId } from '@/redux/selectors';
import { OneFactCard } from './OneFactCard';
import { AppIcon, ShareChristPageState } from '@/enums/enums';
import { setShareChristPageState } from '@/redux/actions';
import { PageRow } from '../common/PageRow';
import SimpleIconButton from '../common/SimpleIconButton';
import { isEditing } from '@/utils/appUtils';
import { listStyles } from '@/styles/Styles';

export type IOneFactsList = ViewProps & {
    selectedOne: One;
    shareChristPageState: ShareChristPageState;
};

function OneFactsList({ selectedOne, shareChristPageState }: IOneFactsList) {
    const oneFacts = useSelector(selectOneFactsByOneId(selectedOne.id));
    const editing = isEditing(shareChristPageState);

    const renderItem = ({ item }: { item: OneFact }) => (
        <OneFactCard oneFact={item}/>
    );

    return (
        <View style={[listStyles.container, styles.container]}>
            <PageRow spaceBetween>
                <AppText type={TextType.Subtitle}>
                    Fun Facts
                </AppText>
                {
                    editing && (
                        <SimpleIconButton iconSrc={AppIcon.Edit}
                        small
                        onClick={() => setShareChristPageState(ShareChristPageState.EditOneFacts)}/>
                    )
                }
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
        maxHeight: 200,
    },
});

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne,
    shareChristPageState: state.app.shareChristPageState,
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OneFactsList);