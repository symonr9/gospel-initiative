import React from 'react';
import { View, type ViewProps, StyleSheet, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import PromptBanner from '../prompts/PromptBanner';
import { EnhancedBeacon } from '@/models/beacon';
import ScrollLayout from '../common/ScrollLayout';
import { setSelectedOne, updateTabIndex } from '@/redux/actions';
import One from '@/models/one';
import { PageColumn } from '../common/PageColumn';
import { PageRow } from '../common/PageRow';
import { Image } from 'expo-image';
import { AppText, TextType } from '../common/AppText';
import { OneLayoutType } from './OnesLayout';
import { gridStyles } from '@/styles/Styles';
import { mapStageToIcon, mapStageToText, mapOneCategoryToIcon, mapOneCategoryToText } from '@/utils/appUtils';
import DetailsSection from '../common/DetailsSection';

export type IAllOnesGrid = ViewProps & {
    ones: One[];
    setSelectedOne: Function;
    setActiveLayoutType?: Function;
    setSelectedOneId?: Function;
    updateTabIndex: Function;
    changeTab?: boolean;
};


function AllOnesGrid({ ones, setSelectedOne, setSelectedOneId, setActiveLayoutType, updateTabIndex, changeTab = false }: IAllOnesGrid) {
    const renderItem = ({ item }: { item: One }) => {
        const onPress = () => {
            setSelectedOne(item);
            if (changeTab) {
                updateTabIndex(0);
            }
            if (setSelectedOneId) {
                setSelectedOneId(item.id);
            }
            if (setActiveLayoutType) {
                setActiveLayoutType(OneLayoutType.Normal);
            }
        };

        return (
            <TouchableOpacity onPress={onPress}>
                <PageRow style={gridStyles.itemCard} spaceEvenly>
                    <PageColumn>
                        <Image source={item.icon} style={gridStyles.img} />
                        <AppText type={TextType.BodyBold} style={{ alignSelf: 'center' }}>
                            {item.name}
                        </AppText>
                    </PageColumn>
                    <DetailsSection iconSrc={mapStageToIcon(item.stage)}
                        prefix={"Stage"}
                        style={{ marginRight: 16 }}
                        title={mapStageToText(item.stage)} />

                    <DetailsSection iconSrc={mapOneCategoryToIcon(item.category)}
                        prefix={"Category"}
                        title={mapOneCategoryToText(item.category)} />
                </PageRow>
            </TouchableOpacity>
        );
    };

    return (
        <PageColumn>

            <ScrollLayout style={{ maxHeight: 500 }}>
                <FlatList
                    data={ones}
                    renderItem={renderItem}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={gridStyles.itemList}
                />
            </ScrollLayout>

        </PageColumn>
    );
}

const mapStateToProps = (state: any) => {
    return {
        ones: state.ones.ones,
    };
};

const mapDispatchToProps = {
    setSelectedOne,
    updateTabIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOnesGrid);
