
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
import ActionStepsList from './ActionStepsList';
import { PageColumn } from '../common/PageColumn';
import { PageTag } from '../common/PageTag';
import { mapStageToText } from '@/utils/appUtils';
import { PageSubHeader } from '../common/PageSubHeader';

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

    const stageTagText = mapStageToText(oneToShow.stage);

    return [
        <PageRow flexStart>
            <SimpleIcon iconSrc={oneToShow.icon} large />,
            <PageColumn>
                <PageSubHeader title={oneToShow.name} />
                <PageTag iconSrc={AppIcon.Globe} title={stageTagText} />
            </PageColumn>
        </PageRow>,

        <ActionStepsList one={oneToShow} />,
        <OneFactsList one={oneToShow} />
    ];
}

const mapStateToProps = (state: any) => ({
    ones: state.ones.ones,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayout);