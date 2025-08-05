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

export type IAllOnesGrid = ViewProps & {
    ones: One[];
    setActiveLayoutType?: Function;
    setSelectedOneId: Function;
};


function AllOnesGrid({ ones, setSelectedOneId, setActiveLayoutType }: IAllOnesGrid) {
    const themeColors = useThemeColors();
    const gridStyles = useGridStyles(themeColors);

    return (
        <PageColumn>

            <PageColumn style={{ maxHeight: 500 }}>
                {
                    ones.map((one) => (
                        <SimpleGridCard key={one.id}
                            title={one.name}
                            iconSrc={one.icon}
                            onClick={() => {
                                setSelectedOneId(one.id);
                                if (setActiveLayoutType)
                                    setActiveLayoutType(OneLayoutType.Normal);
                            }}
                            useTextTintForIcon={false}
                            detailsView={
                                <>
                                    <DetailsSection iconSrc={mapOneStageToIcon(one.stage)}
                                        prefix={"Stage"}
                                        style={{ marginRight: 16 }}
                                        title={mapOneStageToTitle(one.stage)} />

                                    <DetailsSection iconSrc={mapOneCategoryToIcon(one.category)}
                                        prefix={"Category"}
                                        title={mapOneCategoryToTitle(one.category)} />
                                </>
                            } />
                    ))
                }
            </PageColumn>

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
