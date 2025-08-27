import React from 'react';
import { type ViewProps, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { setSelectedOneId } from '@/redux/actions';
import One from '@/models/one';
import { PageColumn } from '../common/PageColumn';
import { OneLayoutType } from './OnesLayout';
import { useGridStyles } from '@/styles/Styles';
import { mapOneCategoryToIcon } from "@/utils/iconUtils";
import { mapOneCategoryToTitle } from "@/utils/textUtils";
import { mapOneStageToIcon } from "@/utils/iconUtils";
import { mapOneStageToTitle } from "@/utils/textUtils";
import DetailsSection from '../common/DetailsSection';
import { SimpleGridCard } from '../common/SimpleGridCard';
import { useThemeColors } from '@/constants/Colors';
import ScrollLayout from '../common/ScrollLayout';
import { screenHeight } from '@/constants/Dimensions';

export type IAllOnesGrid = ViewProps & {
    ones: One[];
    setActiveLayoutType?: Function;
    setSelectedOneId: Function;
};


function AllOnesGrid({ ones, setSelectedOneId, setActiveLayoutType }: IAllOnesGrid) {
    return (
        <PageColumn> 
            {
                ones.map((one) => {
                    const onClick = () => {
                        setSelectedOneId(one.id);
                        if (setActiveLayoutType)
                            setActiveLayoutType(OneLayoutType.Normal);
                    };

                    return (
                        <SimpleGridCard key={one.id}
                            title={one.name}
                            subtitle={'Your One'}
                            iconSrc={one.icon}
                            onClick={onClick}
                            useTextTintForIcon={false}
                            detailsView={
                                <>
                                    <DetailsSection iconSrc={mapOneCategoryToIcon(one.category)}
                                        prefix={"Category"}
                                        onClick={onClick}
                                        title={mapOneCategoryToTitle(one.category)} />
                                </>
                            } 
                        />
                    );
                })
            }
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
