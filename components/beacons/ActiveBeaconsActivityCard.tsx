import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';

import Animated, { FadeInUp, FadeInDown, FadeOutDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { FadeDirection } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import { BeaconWithActivities } from '@/models/beacon';

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
            <View>
                <AppText type={TextType.DefaultSemiBold}>
                    {beaconWithActivity.name}
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
            <AppText type={TextType.Body}>Beacon Activity</AppText>
            {itemsToRender.map((item) => item)}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        width: 240,
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: 'whitesmoke',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.3,
        // shadowRadius: 6,
        // borderRadius: 4,
        margin: 4,
        maxHeight: 200,
        overflow: 'scroll'
    },
    activityView: {
        marginStart: 16
    },
});
