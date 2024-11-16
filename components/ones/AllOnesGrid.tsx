import React from 'react';
import { type ViewProps, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ScrollLayout from '../common/ScrollLayout';
import { setSelectedOneId } from '@/redux/actions';
import One from '@/models/one';
import { PageColumn } from '../common/PageColumn';
import { OneLayoutType } from './OnesLayout';
import { gridStyles } from '@/styles/Styles';
import { mapStageToIcon, mapStageToText, mapOneCategoryToIcon, mapOneCategoryToText } from '@/utils/appUtils';
import DetailsSection from '../common/DetailsSection';
import { SimpleGridCard } from '../common/SimpleGridCard';

export type IAllOnesGrid = ViewProps & {
    ones: One[];
    setActiveLayoutType?: Function;
    setSelectedOneId: Function;
};


function AllOnesGrid({ ones, setSelectedOneId, setActiveLayoutType }: IAllOnesGrid) {
    const renderItem = ({ item }: { item: One }) => {
        const onPress = () => {
            if (setSelectedOneId) {
                setSelectedOneId(item.id);
            }
            if (setActiveLayoutType) {
                setActiveLayoutType(OneLayoutType.Normal);
            }
        };

        const detailsView = (
            <>
                <DetailsSection iconSrc={mapStageToIcon(item.stage)}
                    prefix={"Stage"}
                    style={{ marginRight: 16 }}
                    title={mapStageToText(item.stage)} />

                <DetailsSection iconSrc={mapOneCategoryToIcon(item.category)}
                    prefix={"Category"}
                    title={mapOneCategoryToText(item.category)} />
            </>
        );

        return (
            <SimpleGridCard title={item.name} 
                detailsView={detailsView} 
                horizontal={false}
                onClick={onPress} 
                iconSrc={item.icon}/>
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
    setSelectedOneId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOnesGrid);
