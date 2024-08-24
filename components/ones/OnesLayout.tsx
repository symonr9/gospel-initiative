
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnimatedPageSection } from '../common/AnimatedPageSection';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import One from '@/models/one';
import { AppIcon } from '@/enums/enums';
import { SimpleIcon } from '../common/SimpleIcon';
import { PageRow } from '../common/PageRow';
import OneFactsList from './OneFactsList';

export type IOnesLayout = ViewProps & {
    ones: One[],
};

function OnesLayout({ ones }: IOnesLayout) {
    const [oneToShow, setOneToShow] = useState(ones.length > 0 ? ones[0] : null);

    if (!oneToShow) {
        return [
            <ThemedText type={ThemedTextType.Subtitle}>
                No One found, add!
            </ThemedText>,
        ]
    }

    const icon = oneToShow ? oneToShow.icon : AppIcon.Man1;


    const itemsToRender = [];

    itemsToRender.push(
        <SimpleIcon iconSrc={icon} title={oneToShow.name} large/>
    );

    return [
        <AnimatedPageSection column
                             itemsToRender={itemsToRender}/>,
        <PageRow spaceBetween>
            <AnimatedPageSection column itemsToRender={[
                <ThemedText type={ThemedTextType.Subtitle}>
                    Action Steps
                </ThemedText>
            ]}/>

            <AnimatedPageSection column itemsToRender={[
                <OneFactsList one={oneToShow}/>
            ]}/>
        </PageRow>
    ];
}

const mapStateToProps = (state: any) => ({
    ones: state.ones.ones,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);