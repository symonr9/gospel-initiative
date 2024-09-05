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
import { LocalMinistryCard } from '../localMinistries/LocalMinistryCard';
import { LocalEventCard } from '../localMinistries/LocalEventCard';

export type ILoveCityHomeLayout = ViewProps & {
    localMinistries: LocalMinistry[];
    localEvents: LocalEvent[];
};

function LoveCityHomeLayout({ localMinistries, localEvents }: ILoveCityHomeLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    
    console.log("localMinistries: ", localMinistries);
    console.log("localEvents: ", localEvents);

    const ministriesToRender = localMinistries ? localMinistries.map((ministry) => {
        return (
            <LocalMinistryCard localMinistry={ministry} 
                               activeItemId={activeItemId} 
                               setActiveItemId={setActiveItemId}/>
        )
    }) : [];

    const eventsToRender = localEvents ? localEvents.map((event) => {
        return (
            <LocalEventCard localEvent={event} 
                            activeItemId={activeItemId} 
                            setActiveItemId={setActiveItemId}/>
        );
    }) : [];

    return (
        <View>
            <AnimatedHeader title='Love City' delay={200} />

            <Animated.View
                style={[styles.itemsContainer]}>
                {ministriesToRender.map((item, index) => item)}
            </Animated.View>

            <Animated.View
                style={[styles.itemsContainer]}>
                {eventsToRender.map((item, index) => item)}
            </Animated.View>
        </View>
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
        gap: 8,
        overflow: 'scroll',
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