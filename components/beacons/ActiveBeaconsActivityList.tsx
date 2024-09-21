import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Easing, Dimensions } from 'react-native';
import { Image } from 'expo-image';

import Animated, { FadeInUp, FadeInDown, FadeOutDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { AppIcon, FadeDirection } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import beacon, { BeaconWithActivities } from '@/models/beacon';
import { ActiveBeaconsInfoCard } from './ActiveBeaconsInfoCard';
import { PageRow } from '../common/PageRow';
import ScrollLayout from '../common/ScrollLayout';
import { getAppTimeAgoText, mapBeaconTypeToAppIcon } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import DetailsSection from '../common/DetailsSection';

type IActiveBeaconsActivityList = {
    activeBeaconsWithActivities: BeaconWithActivities[];
    style?: any;
};

export function ActiveBeaconsActivityList({ activeBeaconsWithActivities, style = {} }: IActiveBeaconsActivityList) {
    const duration = 400;
    const delay = 200;

    const itemsToRender = activeBeaconsWithActivities.map((beaconWithActivity) => {
        const activities = beaconWithActivity.activities;

        return (
            <PageRow style={styles.beaconCard}>
                <PageColumn>
                    <PageRow style={{ width: '100%', borderBottomColor: 'lightgray', borderBottomWidth: 2, paddingBottom: 8,}} spaceBetween>
                        <PageRow style={{ flexShrink: 1, width: '60%', marginEnd: 8 }}>
                            <Image source={mapBeaconTypeToAppIcon(beaconWithActivity.type)}
                                style={styles.icon}
                                contentFit="contain" />
                            <PageColumn style={{ gap: 4 }}>
                                <AppText type={TextType.Subtitle} style={styles.beaconNameText}>
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
                            </PageColumn>
                        </PageRow>
                        <DetailsSection iconSrc={AppIcon.UserGroup} 
                                    style={{ marginEnd: 8 }}
                                    prefix={"Prayed For"} 
                                    title={activities.length} />
                    </PageRow>

                    <PageColumn>
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
                    </PageColumn>
                </PageColumn>
            </PageRow>
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
            <ScrollLayout style={{ maxHeight: 350 }}>
                {itemsToRender.map((item) => item)}
            </ScrollLayout>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,
    },
    activityView: {
        padding: 8,
        marginTop: 8
    },
    beaconNameText: {
    },
    beaconDetailsText: {
        marginBottom: 8,
    },
    beaconCard: {
        padding: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        backgroundColor: '#e3e3e3',
        borderRadius: 4,
        marginBottom: 8
    },
    icon: {
        width: 36,
        height: 36,
        alignSelf: 'center',
        marginEnd: 8
    },
});
