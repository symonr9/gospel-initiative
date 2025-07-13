import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native'; // Import Alert
import { Image } from 'expo-image';

import Animated, { FadeInRight } from 'react-native-reanimated';
import { AppIcon, RefreshSpec } from '@/enums/enums';
import { AppText, TextType } from '../common/AppText';
import { BeaconWithActivities } from '@/models/beacon';
import { PageRow } from '../common/PageRow';
import ScrollLayout from '../common/ScrollLayout';
import { getAppTimeAgoText } from '@/utils/appUtils';
import { mapBeaconTypeToIcon } from "@/utils/iconUtils";
import { PageColumn } from '../common/PageColumn';
import SimpleIconButton from '../common/SimpleIconButton';
import { PageChip } from '../common/PageChip';
import { deactivateBeacon } from "@/requests/beaconRequests";
import { beaconStyles, useGridStyles } from '@/styles/Styles';
import AppError from '@/models/error';
import { standardPaddedWidth } from '@/constants/Dimensions';
import { useThemeColors } from '@/constants/Colors';

type IActiveBeaconsActivityList = {
    activeBeaconsWithActivities: BeaconWithActivities[];
    style?: any;

    refreshData: Function;
    setAppError: Function;
};

export function ActiveBeaconsActivityList({ activeBeaconsWithActivities,
    refreshData, setAppError, style = {} }: IActiveBeaconsActivityList) {
    const duration = 400;
    const delay = 200;

    const themeColors = useThemeColors();
    const gridStyles = useGridStyles(themeColors);

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
                                setAppError(new AppError('Error deactivating beacon: ', response.error));
                                return;
                            }
                            refreshData(RefreshSpec.Beacons);
                        }
                    }
                ]
            );
        };

        return (
            <TouchableOpacity onPress={onEditClick}>
                <PageRow style={[gridStyles.itemCard, beaconStyles.beaconCard, { flexWrap: 'wrap' }]}>
                    <PageColumn>
                        <PageColumn style={beaconStyles.beaconHeader}>
                            <PageRow>
                                <PageRow>
                                    <PageColumn>
                                        <Image source={mapBeaconTypeToIcon(beaconWithActivity.type)}
                                            style={beaconStyles.icon}
                                            contentFit="contain" />
                                    </PageColumn>
                                    <PageColumn style={{ gap: 4, width: standardPaddedWidth, flexWrap: 'wrap' }}>
                                        <AppText type={TextType.Subtitle3} style={beaconStyles.beaconNameText}>
                                            {beaconWithActivity.name}
                                        </AppText>
                                        {
                                            beaconWithActivity.message && (
                                                <AppText type={TextType.Body} style={beaconStyles.beaconDetailsText}>
                                                    {beaconWithActivity.message}
                                                </AppText>
                                            )
                                        }
                                        <AppText type={TextType.Body}>
                                            {getAppTimeAgoText(beaconWithActivity.activeUntil, true)}
                                        </AppText>

                                        <AppText type={TextType.Body}>
                                            {numOfPeoplePrayedText}
                                        </AppText>
                                    </PageColumn>
                                </PageRow>
                            </PageRow>

                        </PageColumn>

                        {
                            editing && (
                                <PageRow style={{ marginTop: 12 }}>
                                    <SimpleIconButton iconSrc={AppIcon.Trash}
                                        title={'Remove'}
                                        onClick={onRemoveClick} />
                                </PageRow>
                            )
                        }

                        {
                            !editing && (
                                <PageColumn style={{ maxHeight: 200, marginTop: 12 }}>
                                    <FlatList
                                        data={activities}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <View style={beaconStyles.activityView}>
                                                <AppText type={TextType.Body}>{item.username} prayed for you.</AppText>
                                                <AppText type={TextType.Italic}>{item.note}</AppText>
                                            </View>
                                        )}
                                    />
                                </PageColumn>
                            )
                        }
                    </PageColumn>
                </PageRow>
            </TouchableOpacity>
        )
    });

    return (
        <Animated.View entering={FadeInRight.duration(duration).delay(delay)} style={[styles.container, style]}>
            <PageRow>
                <AppText type={TextType.Subtitle}>Beacon Activity</AppText>
            </PageRow>
            <ScrollLayout style={{ marginTop: 12, maxHeight: 350 }}>
                {itemsToRender?.map((item) => item)}
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
});
