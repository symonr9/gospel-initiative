import React, { useState } from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LocalEvent from '@/models/localEvent';
import Animated from 'react-native-reanimated';
import { LocalEventCard } from './LocalEventCard';
import { AppText, TextType } from '../common/AppText';
import { LoveCityDetails } from './LoveCityDetails';
import { listStyles } from '@/styles/Styles';
import ScrollLayout from '../common/ScrollLayout';

export type ILoveCityEventsLayout = ViewProps & {
    localEvents: LocalEvent[];
};

function LoveCityEventsLayout({ localEvents }: ILoveCityEventsLayout) {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    console.log("localEvents: ", localEvents);

    const eventsToRender = localEvents ? localEvents.map((event) => {
        return (
            <LocalEventCard localEvent={event}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId} />
        );
    }) : [];

    return (
        <ScrollLayout>
            <LoveCityDetails localEvents={localEvents} 
                             activeItemId={activeItemId} 
                             setActiveItemId={setActiveItemId}/>
            {
                activeItemId === null && (
                    <AppText type={TextType.BodyBold}>
                        Local Events
                    </AppText>
                )
            }

            <ScrollLayout style={{ maxHeight: 500 }}>
                <Animated.View
                    style={[listStyles.itemsContainer]}>
                    {eventsToRender.map((item, index) => item)}
                </Animated.View>
            </ScrollLayout>
        </ScrollLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginEnd: 4,
    },
});

const mapStateToProps = (state: any) => {
    return {
        localEvents: state.ministries.localEvents,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoveCityEventsLayout);