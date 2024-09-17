import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';

import Animated, { FadeInUp, FadeInDown, FadeOutDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { FadeDirection } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import { BeaconWithActivities } from '@/models/beacon';
import { ActiveBeaconsInfoCard } from './ActiveBeaconsInfoCard';
import { PageRow } from '../common/PageRow';
import ScrollLayout from '../common/ScrollLayout';
import { getAppTimeAgoText } from '@/utils/appUtils';

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
                <AppText type={TextType.BodyBold} style={styles.beaconNameText}>
                    {beaconWithActivity.name}
                </AppText>
                {
                    beaconWithActivity.message && (
                        <AppText type={TextType.Body} style={styles.beaconDetailsText}>
                            {beaconWithActivity.message}
                        </AppText>
                    )
                }
                <AppText type={TextType.Italic}>
                    {getAppTimeAgoText(beaconWithActivity.activeUntil, true)}
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
    });

    if (itemsToRender.length === 0) {
        return <></>;
    }

    return (
        <Animated.View entering={FadeInRight.duration(duration).delay(delay)} style={[styles.container, style]}>
            <PageRow>
                <AppText type={TextType.Subtitle}>Beacon Activity</AppText>
            </PageRow>
            <ScrollLayout style={{ maxHeight: 300 }}>
                {itemsToRender.map((item) => item)}
            </ScrollLayout>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    activityView: {
        marginVertical: 8,
        marginHorizontal: 12,
        backgroundColor: 'lightyellow',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        padding: 8,
    },
    beaconNameText: {
        marginTop: 2,
    },
    beaconDetailsText: {
        marginBottom: 4,
    },
    beaconCard: {
        padding: 8,
        gap: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        marginVertical: 8,
    },
});
