
import React, { useState, useEffect } from 'react';

import { View, ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ThemedText, ThemedTextType } from '../common/ThemedText';
import One from '@/models/one';
import { AppIcon } from '@/enums/enums';
import { SimpleIcon } from '../common/SimpleIcon';
import { PageRow } from '../common/PageRow';
import { PageColumn } from '../common/PageColumn';
import { PageTag } from '../common/PageTag';
import { mapStageToText } from '@/utils/appUtils';
import { PageSubHeader } from '../common/PageSubHeader';

export type IOnesLayoutHeader = ViewProps & {
    selectedOne: One,
};

function OnesLayoutHeader({ selectedOne }: IOnesLayoutHeader) {
    const stageTagText = mapStageToText(selectedOne.stage);
    return (
        <PageRow flexStart>
            <SimpleIcon iconSrc={selectedOne.icon} large />
            <PageColumn>
                <PageSubHeader title={selectedOne.name} />
                <PageTag iconSrc={AppIcon.Globe} title={stageTagText} />
            </PageColumn>
        </PageRow>
    );
}

const mapStateToProps = (state: any) => ({
    selectedOne: state.ones.selectedOne
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(OnesLayoutHeader);