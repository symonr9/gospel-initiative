import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';

import Animated, { FadeInUp, FadeInDown, FadeOutDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { FadeDirection } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import { BeaconWithActivities } from '@/models/beacon';
import { ActiveBeaconsInfoCard } from './ActiveBeaconsInfoCard';
import { PageRow } from '../common/PageRow';

type IActiveBeaconsActivityCard = {
    activeBeaconsWithActivities: BeaconWithActivities[];
    style?: any;
};

export function ActiveBeaconsActivityCard({ activeBeaconsWithActivities, style = {} }: IActiveBeaconsActivityCard) {
    const duration = 400;
    const delay = 200;

    const itemsToRender = activeBeaconsWithActivities.map((beaconWithActivity) => {
        const activities = beaconWithActivity.activities;
        return (
            <View style={styles.beaconCard}>
                <AppText type={TextType.DefaultSemiBold} style={styles.beaconNameText}>
                    {beaconWithActivity.name}
                </AppText>
                <AppText type={TextType.Italic} style={styles.beaconDetailsText}>
                    {beaconWithActivity.message}
                </AppText>
                <View>
                    {
                        activities.map((activity) => {
                            const { user } = activity;
                            const username = user ? user.name : "Anonymous Friend";

                            return (
                                <View style={styles.activityView}>
                                    <AppText type={TextType.Body}>{username}</AppText>
                                    <AppText type={TextType.Italic}>{activity.note}</AppText>                                    
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    })

    return (
        <Animated.View entering={FadeInRight.duration(duration).delay(delay)} style={[styles.container, style]}>
            <PageRow>
                <AppText type={TextType.Subtitle}>Beacon Activity</AppText>
            </PageRow>
            {itemsToRender.map((item) => item)}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 300,
        overflow: 'scroll'
    },
    activityView: {
        marginStart: 16,
        marginVertical: 8,
        width: '70%',
        backgroundColor: 'lightyellow',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        padding: 12,
    },
    beaconNameText: {
        marginTop: 2,
    },
    beaconDetailsText: {
        marginBottom: 4,
    },
    beaconCard: {
        padding: 4,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        marginVertical: 8,
        marginHorizontal: 32
    },
});
