import React, { useState, useEffect } from 'react';
import { View, type ViewProps, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { connect } from 'react-redux';

import { AppText, TextType } from '../common/AppText';
import { AppIcon, ShareChristPageState } from '@/enums/enums';
import { ThemedView } from '../common/ThemedView';
import { PageColumn } from '../common/PageColumn';
import { getShowHideIcon } from '@/utils/appUtils';
import { PageChip } from '../common/PageChip';
import BeaconTemplate from '@/models/beaconTemplate';
import { BeaconTemplateCard } from './BeaconTemplateCard';
import One from '@/models/one';

export type IBeaconTemplateDetails = ViewProps & {
    template: BeaconTemplate;
    shareChristPageState: ShareChristPageState;
    selectedOne: One;
};

function BeaconTemplateDetails({ shareChristPageState, template, selectedOne }: IBeaconTemplateDetails) {
    const [shareOneName, setShareOneName] = useState(false);
    const [shareOwnName, setShareOwnName] = useState(true);

    return (
        <ThemedView style={[styles.container]}>
            <BeaconTemplateCard template={template}
                selectedTemplateId={template.id} />

            <PageColumn style={styles.section}>
                <PageChip iconSrc={getShowHideIcon(shareOneName)}
                    style={{ width: 240 }}
                    onClick={() => setShareOneName(val => !val)}
                    title={shareOneName ? `Show One's name` : `Hide One's name`} />
                <PageChip iconSrc={getShowHideIcon(shareOwnName)}
                    style={{ width: 240 }}                    
                    onClick={() => setShareOwnName(val => !val)}
                    title={shareOwnName ? `Show your name` : `Hide your name`} />
            </PageColumn>

            <PageColumn style={styles.section}>
                <AppText type={TextType.Subtitle}>
                    When you send...
                </AppText>
                <AppText type={TextType.Default}>
                    Your beacon will be delivered to friends in your community and will
                    be active for 24 hours.
                </AppText>
            </PageColumn>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        borderRadius: 4,
        padding: 4,
        marginTop: 12,
        elevation: 4,
        height: 600,
    },
    header: {
        backgroundColor: 'lightgreen',
        marginBottom: 16,
        borderRadius: 4,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Shadow radius for a softer shadow
        elevation: 4,
    },
    section: {
        marginTop: 8,
        marginBottom: 8,
        marginStart: 12,
    },
    icon: {
        margin: 8,
        width: 48,
        height: 48,
        marginEnd: 8,
    },
});

const mapStateToProps = (state: any) => {
    return {
        shareChristPageState: state.app.shareChristPageState,
        selectedOne: state.ones.selectedOne
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BeaconTemplateDetails);