import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnimatedHeader } from '../common/AnimatedHeader';
import { PageRow } from '../common/PageRow';
import LocalMinistry from '@/models/localMinistry';
import LocalEvent from '@/models/localEvent';
import MissionsTrip from '@/models/missionsTrip';
import { AnimatedCard } from '../common/AnimatedCard';
import Animated from 'react-native-reanimated';
import { LocalMinistryCard } from './LocalMinistryCard';
import { LocalEventCard } from './LocalEventCard';
import { AppText, TextType } from '../common/AppText';
import { LoveCityDetails } from './LoveCityDetails';
import ScrollLayout from '../common/ScrollLayout';

export type ILoveCityHomeLayout = ViewProps & {
    localMinistries: LocalMinistry[];
    localEvents: LocalEvent[];
};

function LoveCityHomeLayout({ localMinistries, localEvents }: ILoveCityHomeLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    console.log("localMinistries: ", localMinistries);
    console.log("localEvents: ", localEvents);

    return (
        <ScrollLayout>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginEnd: 4,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        padding: 10,
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflow: 'scroll',
        marginBottom: 16
    },
    icon: {
        width: 24,
        height: 24,
        marginEnd: 8,
        alignSelf: 'center',
    },
});

const mapStateToProps = (state: any) => {

    return {
        localMinistries: state.ministries.localMinistries,
        localEvents: state.ministries.localEvents,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCityHomeLayout);