import React from 'react';
import { View, type ViewProps, StyleSheet, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import { EnhancedBeacon } from '@/models/beacon';
import ScrollLayout from '../common/ScrollLayout';
import { setSelectedOne } from '@/redux/actions';
import One from '@/models/one';
import { PageColumn } from '../common/PageColumn';

export type IShareChristOnesGrid = ViewProps & {
    ones: One[];
    setSelectedOne: Function;
};


function ShareChristOnesGrid({ ones, setSelectedOne }: IShareChristOnesGrid) {

    const renderItem = ({ item }: { item: One }) => {
        const onPress = () => {
            setSelectedOne(item);
        };

        return (
            <TouchableOpacity onPress={onPress}>
                // TODO: Here
            </TouchableOpacity>
        );
    };

    return (
        <PageColumn>

            <ScrollLayout style={{ maxHeight: 220 }}>
                <FlatList
                    data={ones}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.itemList}
                />
            </ScrollLayout>

        </PageColumn>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column'
    }
});

const mapStateToProps = (state: any) => {
    return {
        ones: state.ones.ones,
    };
};

const mapDispatchToProps = {
    setSelectedOne
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareChristOnesGrid);
