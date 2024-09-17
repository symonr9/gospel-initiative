import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LocalMinistry from '@/models/localMinistry';
import Animated from 'react-native-reanimated';
import { LocalMinistryCard } from './LocalMinistryCard';
import { AppText, TextType } from '../common/AppText';
import { LoveCityDetails } from './LoveCityDetails';
import { listStyles } from '@/styles/Styles';
import ScrollLayout from '../common/ScrollLayout';

export type ILoveCityMinistriesLayout = ViewProps & {
    localMinistries: LocalMinistry[];
};

function LoveCityMinistriesLayout({ localMinistries }: ILoveCityMinistriesLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    console.log("localMinistries: ", localMinistries);

    const ministriesToRender = localMinistries ? localMinistries.map((ministry) => {
        return (
            <LocalMinistryCard localMinistry={ministry}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId} />
        )
    }) : [];

    return (
        <ScrollLayout>
            <LoveCityDetails localMinistries={localMinistries} 
                             activeItemId={activeItemId} 
                             setActiveItemId={setActiveItemId}/>

            {
                activeItemId === null && (
                    <AppText type={TextType.BodyBold}>
                        Local Ministries
                    </AppText>
                )
            }

            <ScrollLayout style={{ maxHeight: 500 }}>
                <Animated.View
                    style={[listStyles.itemsContainer]}>
                    {ministriesToRender.map((item, index) => item)}
                </Animated.View>
            </ScrollLayout>
        </ScrollLayout>
    );
}

const mapStateToProps = (state: any) => {
    return {
        localMinistries: state.ministries.localMinistries,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCityMinistriesLayout);