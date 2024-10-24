import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native'; // Import Alert
import { Image } from 'expo-image';

import Animated, { FadeInRight } from 'react-native-reanimated';
import { AppIcon } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import { BeaconWithActivities } from '@/models/beacon';
import { PageRow } from '../common/PageRow';
import ScrollLayout from '../common/ScrollLayout';
import { getAppTimeAgoText, mapBeaconTypeToAppIcon } from '@/utils/appUtils';
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';
import { PageChip } from '../common/PageChip';
import { deactivateBeacon } from '@/requests/Requests';

type IActiveBeaconsActivityList = {
    activeBeaconsWithActivities: BeaconWithActivities[];
    style?: any;

    setAppError: Function;
};

export function ActiveBeaconsActivityList({ activeBeaconsWithActivities, setAppError, style = {} }: IActiveBeaconsActivityList) {
    const duration = 400;
    const delay = 200;

    const itemsToRender = activeBeaconsWithActivities.map((beaconWithActivity) => {
        const activities = beaconWithActivity.activities;
        const numOfPeoplePrayed = activities.length;

        const [editing, setEditing] = useState(false);

        const numOfPeoplePrayedText = numOfPeoplePrayed === 1 ? '1 person has prayed for this beacon.' : `${numOfPeoplePrayed} people have prayed for this beacon.`;

        const onEditClick = () => {
            setEditing((val) => !val);
        };

        const onRemoveClick = () => {
            Alert.alert(
                'Confirmation',
                'Are you sure you want to remove this beacon?',
                [
                    {
                        text: 'No',
                        onPress: () => setEditing(false),
                        style: 'cancel'
                    },
                    {
                        text: 'Yes',
                        onPress: async () => {
                            const response = await deactivateBeacon(beaconWithActivity);
                            if (response.error) {
                                setAppError(new Error('Error deactivating beacon: ', response.error));
                                return;
                            }
                        }
                    }
                ]
            );
        };

        return (
            <PageRow style={styles.beaconCard}>
                <PageColumn>
                    <PageColumn style={styles.beaconHeader}>
                        <PageRow style={{ paddingBottom: 8, }} spaceBetween>
                            <PageRow style={{ flexShrink: 1, marginEnd: 8 }}>
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

                                    <AppText type={TextType.Body}>
                                        {numOfPeoplePrayedText}
                                    </AppText>
                                </PageColumn>
                            </PageRow>

                            <SimpleIconButton iconSrc={AppIcon.Edit}
                                title={'Edit'}
                                onClick={onEditClick} />
                        </PageRow>
                    </PageColumn>

                    {
                        editing && (
                            <PageRow style={{ marginTop: 12 }}>
                                <SimpleIconButton iconSrc={AppIcon.Trash}
                                    title={'Remove'} 
                                    onClick={onRemoveClick}/>
                            </PageRow>
                        )
                    }

                    {
                        !editing && (
                            <ScrollLayout style={{ maxHeight: 200 }}>
                                <FlatList
                                    data={activities}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <View style={styles.activityView}>
                                            <AppText type={TextType.Body}>{item.username}</AppText>
                                            <AppText type={TextType.Italic}>{item.note}</AppText>
                                        </View>
                                    )}
                                />
                            </ScrollLayout>
                        )
                    }
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
            <ScrollLayout style={{ marginTop: 12, maxHeight: 350 }}>
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
    beaconHeader: {
        paddingBottom: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
    },
    beaconCard: {
        padding: 16,
        backgroundColor: '#f3f3f3',
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
