import React from 'react';
import { View, type ViewProps, StyleSheet, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import { EnhancedBeacon } from '@/models/beacon';
import ScrollLayout from '../common/ScrollLayout';
import { setSelectedOne } from '@/redux/actions';
import One from '@/models/one';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Image } from 'expo-image';
import { AppText, TextType } from '../common/AppText';

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
                <PageColumn style={styles.itemCard}>
                    <Image source={item.icon} style={styles.img}/>
                    <AppText type={TextType.Body}>
                        {item.name}
                    </AppText>
                </PageColumn>
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
    },
    itemCard: {
        margin: 8,
        padding: 16,
        backgroundColor: '#ffffff',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 4, // Shadow for Android
        borderRadius: 4,
        alignItems: 'center'
    },
    img: {
        height: 48,
        width: 48,
        margin: 4,
    },
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
